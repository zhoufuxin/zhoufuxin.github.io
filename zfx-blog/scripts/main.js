
;$(function(){
    // 页面滚动
    var $sideBarTrigger = $("#side-bar-trigger"),
        $mask = $(".page-mask"),
        $sideBar = $(".side-bar"),
        $backTop = $(".back-to-top"),
        $homePageMore = $("#home-page-more");

    function ShowSideBar() {
        console.log($sideBar);
        $mask.fadeIn();
        $sideBar.css("transform", "translate(0, 0)");
    }

    function HideSideBar() {
        $mask.fadeOut();
        $sideBar.css("transform", "translate(" + $sideBar.width() + "px" + ", 0)");
    }

    $sideBarTrigger.on("click", ShowSideBar);
    $mask.on("click", HideSideBar);

    $backTop.on("click", function(){
        if ($(window).scrollTop() != 0) {
            $("html, body").animate({
                scrollTop: 0
            }, 300);
        }
    });

    $(window).on("scroll", function(){
        if ($(window).scrollTop() >= $(window).height()) {
            $backTop.fadeIn();
        } else {
            $backTop.fadeOut();
        }
    });

    $homePageMore.on("click", function(){
        $("html, body").animate({
            scrollTop: $(window).height()
        }, 300);
    });

    // 图片缩略banner
    var mainBannerObj = document.getElementById("mainBanner"),
        imgObjs = mainBannerObj.getElementsByTagName("div"),

        showWidth = 160,
        imgWidth = imgObjs[0].offsetWidth,
        moveOffsetX = imgWidth - showWidth;
        
    bannerWidth = imgWidth + (imgObjs.length - 1) * showWidth;

    mainBannerObj.style.width = bannerWidth + 'px';

    function resetImgPos() {
        for (var i = 1, len = imgObjs.length; i < len; i++) {
            imgObjs[i].style.left = imgWidth + (i - 1) * showWidth + 'px';
        }
    }

    resetImgPos();

    for (var i = 0, len = imgObjs.length; i < len; i++) {
        (function(i) {
            imgObjs[i].onmouseover = function() {
                resetImgPos();
                for (var j = 1; j <= i; j++) {
                    imgObjs[j].style.left = parseInt(imgObjs[j].style.left, 10) - moveOffsetX + 'px';
                }
            };
        })(i);
    }
});


(function(win, doc, $){
    // 自定义滚动条
    function CusScrollBar(options) {
        this._init(options);
    }

    $.extend(CusScrollBar.prototype, {
        _init : function(options) {
            var self = this;
            self.options = {
                scrollDir      : "y",   // 滚动的方向
                contSelector   : "",    // 滚动内容区选择器
                barSelector    : "",    // 滚动条选择器
                sliderSelector : "",    // 滚动滑块选择器
                wheelStep      : 100    // 每次滚动距离
            }

            $.extend(true, self.options, options || {});

            self._initDOMAndEvent();

            //console.log('初始化:' + self.options);
        },
        /**
         * 初始化DOM引用
         * @method _initDOMAndEvent
         * @return {[object]} [this]
         */
        _initDOMAndEvent : function() {
            var opts        = this.options;
            this.$cont      = $(opts.contSelector);
            this.$slider    = $(opts.sliderSelector);
            this.$bar       = opts.barSelector ? $(opts.barSelector) : this.$slider.parent();
            this.$doc       = $(doc);

            //this.$slider[0].style.height = (this.$cont[0].offsetHeight / this.$cont[0].scrollHeight) * this.$bar[0].offsetHeight + "px";
            this.$slider[0].style.height = (this.$cont[0].offsetHeight / this.$cont[0].scrollHeight) * 100 + '%';

            this._initSliderDragEvent();
        },
        /**
         * 初始化滑块拖动功能
         * @method _initSliderDragEvent
         * @return {[object]} [this]
         */
        _initSliderDragEvent : function() {
            var self = this,
                $slider = self.$slider,
                $cont = self.$cont,
                $bar = self.$bar,
                sliderEle = $slider[0];

            function scrollTo(pos) {
                $cont.scrollTop(pos);
                $slider.css({top: $cont.scrollTop() / $cont[0].scrollHeight * 100 + '%'});
            }

            if (sliderEle) {
                var $doc = self.$doc,
                    dragStartPagePosition,      // 拖动滑块起始位置(鼠标按下时在页面位置)
                    dragStartScrollPosition,    // 拖动页面起始位置
                    dragContBarRate;            // 内容高度/内容可视高度
                $slider.on("mousedown", function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    //console.log("mousedown");

                    dragStartPagePosition = e.pageY;
                    dragStartScrollPosition = $cont.scrollTop();
                    dragContBarRate = $cont[0].scrollHeight / $cont[0].offsetHeight;

                    $doc.on("mousemove.scroll", function(e) {
                        e.preventDefault();
                        //console.log("mousemove");

                        scrollTo(dragStartScrollPosition + dragContBarRate * (e.pageY - dragStartPagePosition));

                    }).on("mouseup.scroll", function(e) {
                        //console.log("mouseup");
                        $doc.off(".scroll");
                    });
                });

                $bar.on("mousedown", function(e) {
                    e.preventDefault();
                    //console.log("mousedown-bar");

                    scrollTo($cont[0].scrollHeight / $cont[0].offsetHeight * e.offsetY - $cont[0].offsetHeight / 2);

                    var mousedownEvent = $.Event("mousedown");
                    $.extend(true, mousedownEvent, {
                        pageY: e.pageY
                    })
                    $slider.trigger(mousedownEvent);
                });

                $cont.on("mousewheel DOMMouseScroll", function(e) {
                    //console.log("mousewheel DOMMouseScroll");

                    var event = e.originalEvent,
                        scrollCount = event.wheelDelta ? -event.wheelDelta / 120 : (event.detail || 0) / 3;
                        //console.log($cont.scrollTop() + self.options.wheelStep * scrollCount);

                    if ( $cont.scrollTop() == 0 && scrollCount > 0
                      || $cont.scrollTop() == ($cont[0].scrollHeight - $cont[0].offsetHeight) && scrollCount < 0
                      || 0 < $cont.scrollTop() && $cont.scrollTop() < ($cont[0].scrollHeight - $cont[0].offsetHeight) ) {

                        e.preventDefault();
                    };

                    scrollTo($cont.scrollTop() + self.options.wheelStep * scrollCount);
                });
            };
        }
    });

    win.CusScrollBar = CusScrollBar;
})(window, document, jQuery);

window.onload = function() {
    var tabScrollBar = new CusScrollBar({
        contSelector   : ".box-group .content",
        barSelector    : ".box-group .scroll-bar",
        sliderSelector : ".box-group .scroll-slider",
    });
};