var eventUtil = {
	addHandler : function(element, type, handler) {
		if (type == "input") {
			if (element.addEventListener) {
				element.addEventListener(type, handler, false);
			} else if (element.attachEvent) {
				element.attachEvent('onpropertychange', handler);
			} else {
				element['onpropertychange'] = handler;
			}
			return;
		}

		if (element.addEventListener) {
			element.addEventListener(type, handler, false);
		} else if (element.attachEvent) {
			element.attachEvent('on' + type, handler);
		} else {
			element['on' + type] = handler;
		}
	},
	removeHandler : function(element, type, handler) {
		if (type == "input") {
			if (element.removeEventListener) {
				element.removeEventListener(type, handler, false);
			} else if (element.detachEvent) {
				element.detachEvent('onpropertychange', handler);
			} else {
				element['onpropertychange'] = null;
			}
			return;
		}

		if (element.removeEventListener) {
			element.removeEventListener(type, handler, false);
		} else if (element.detachEvent) {
			element.detachEvent('on' + type, handler);
		} else {
			element['on' + type] = null;
		}
	},
	getEvent : function(event) {
		return event ? event : window.event;
	},
	getType : function(event) {
		return event.type;
	},
	getElement : function(event) {
		return event.target || event.srcElement;
	},
	stopPropagation : function(event) {
		if (event.stopPropagation) {
			event.stopPropagation();
		} else {
			event.cancelBubble = true;
		}
	},
	preventDefault : function(event) {
		if (event.preventDefault) {
			event.preventDefault();
		} else {
			event.returnValue = false;
		}
	}
};