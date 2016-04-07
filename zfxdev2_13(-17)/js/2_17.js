/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {

  var chartObj = document.getElementsByClassName("aqi-chart-wrap")[0];

  if (chartObj == null) {

    console.log("not load page!!!");
    return;

  } else {

    var ulObj = chartObj.getElementsByTagName("ul")[0];

    // 重置图表
    while(ulObj.lastChild) {
      ulObj.removeChild(ulObj.lastChild);
    }

    for (date in chartData.data) {
      var itemObj       = document.createElement("li");
          itemProgress  = document.createElement("div");

      ulObj.appendChild(itemObj);

      itemObj.appendChild(itemProgress);
      itemObj.style.width = 100/chartData.count + "%";
      itemObj.setAttribute("title", date + "的空气质量: " + chartData.data[date]);

      itemProgress.style.height = chartData.data[date]/5 + "%";

      var colorIndex = Math.floor( chartData.data[date] / ( 500 / getObjectLength(colorGroup) ) );
      itemProgress.style.backgroundColor = colorGroup[colorIndex];
    }
  }
}

/**
 * 颜色
 */
var colorGroup = [
  "#00cf00",
  "#007f00",
  "#0000fd",
  "#00007d",
  "#f00000",
  "#7f007f",
  "#700000",
  "#000000"
]

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化 
  console.log(this.value);
  
  // 设置对应数据
  var citySelectObj = document.getElementById("city-select");
  var city = citySelectObj.value

  pageState.nowGraTime = this.value;

  setChartDataByPageState(pageState.nowGraTime, city);

  // 调用图表渲染函数
  renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化
  console.log(this.value);

  // 设置对应数据
  var city = this.value;
  setChartDataByPageState(pageState.nowGraTime, city);

  // 调用图表渲染函数
  renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {

  var graTimeObj = document.getElementById("form-gra-time");
  var radioObjs = graTimeObj.getElementsByTagName("input");

  for (var i = 0; i < radioObjs.length; i++) {
    eventUtil.addHandler(radioObjs[i], "change", graTimeChange);
  }

}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {

  var citySelectObj = document.getElementById("city-select");

  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  while(citySelectObj.lastChild) {
    citySelectObj.removeChild(citySelectObj.lastChild);
  }

  for (city in aqiSourceData) {
    var optionObj = document.createElement("option");
    var optionContent = document.createTextNode(city);

    optionObj.appendChild(optionContent);
    citySelectObj.appendChild(optionObj);
  }

  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  eventUtil.addHandler(citySelectObj, "change", citySelectChange);

}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  var citySelectObj = document.getElementById("city-select");

  var city = citySelectObj.value;

  setChartDataByPageState(pageState.nowGraTime, city);

  renderChart();
}


/**
 * 获取对象长度
 */
function getObjectLength(obj) {

  var count = 0;

  for (iter in obj) {

    count ++;
  }

  return count;
}

/**
 * 初始化函数
 */
function setChartDataByPageState(graTime, city) {

  chartData.data = {};

  var allData = aqiSourceData[city];

  var dat = new Date("2016-01-01");

  if (pageState.nowGraTime == "day") {

    chartData.data = allData;

  } else if (pageState.nowGraTime == "week") {

    var daysIndex   = 1;
    var weeksIndex  = 1;
    var daysInWeek  = 1;
    var isFullWeek  = false;
    var sumOfWeek   = 0; 

    for(date in allData) {

      sumOfWeek += allData[date];

      var week = new Date(date).getDay();

      if ( week == 0 || daysIndex == 91) {

        isFullWeek = true;

      } else {

        isFullWeek = false;

      }

      if (isFullWeek) {
        console.log(daysInWeek + "天内aqi总量：" + sumOfWeek);
        chartData.data["第" + weeksIndex + "周"] = Math.floor(sumOfWeek / daysInWeek);
        
        sumOfWeek = 0;
        daysInWeek = 0;
        weeksIndex++;
      }

      daysIndex++;
      daysInWeek++;
    }


  } else if (pageState.nowGraTime == "month") {

    var daysIndex   = 1;
    var monthsIndex  = 1;
    var daysInMonth  = 1;
    var isFullMonth  = false;
    var sumOfMonth   = 0; 

    for(date in allData) {

      sumOfMonth += allData[date];

      var today = new Date(date);
      var nextDate = new Date(date);
      nextDate.setDate(nextDate.getDate() + 1);

      if ( nextDate.getDate() == 1 || daysIndex == 91) {

        isFullMonth = true;

      } else {

        isFullMonth = false;

      }

      if (isFullMonth) {
        console.log(daysInMonth + "天内aqi总量：" + sumOfMonth);
        chartData.data["第" + monthsIndex + "月"] = Math.floor(sumOfMonth / daysInMonth);

        sumOfMonth = 0;
        daysInMonth = 0;
        monthsIndex++;
      }


      daysIndex++;
      daysInMonth++;
    }

  } else {
    console.log("get chartData data error");
  }

  chartData.count = getObjectLength(chartData.data);
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
}

window.onload = init;