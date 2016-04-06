/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {

  var cityInput = document.getElementById("aqi-city-input"),
      aqiInput  = document.getElementById("aqi-value-input");

  var cityName = cityInput.value.trim(),
      aqiValue = aqiInput.value.trim();

  // 输入检测
  if (  /^[\u4e00-\u9fa5a-zA-Z]+$/.test(cityName) == true 
    &&                    /^\d+$/.test(aqiValue) == true 
    ) {

    aqiData[cityName] = aqiValue;

  } else {

    alert("input error!");
  }
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
  console.log(aqiData);

  var tableObj = document.getElementById("aqi-table");
  var rows     = tableObj.getElementsByTagName("tr");

  // 清除列表内容
  if (tableObj != null) {

    for (var i = rows.length-1; i > 0; i--) {
      tableObj.removeChild(rows[i]);
    }

  } else {

    return;
  }

  // 根据相应数据生成列表项
  for (city in aqiData) {

    var trObj = document.createElement("tr");
    trObj.innerHTML = "<td>" + city + "</td><td>" + aqiData[city] + "</td><td><button>删除</button></td>";
    tableObj.appendChild(trObj);
  }
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(event) {
  // do sth.
  var event = eventUtil.getEvent(event);
  var ele = eventUtil.getElement(event);

  var tableObj = document.getElementById("aqi-table");

  if (ele.nodeName.toUpperCase() == "BUTTON") {

    // 找到按钮所在行,并删除对象中该行数据
    var trObj = ele.parentNode.parentNode || ele.parentElement.parentElement;

    if (trObj != null) {

      var cityObj = trObj.getElementsByTagName("td")[0];
      delete aqiData[cityObj.innerHTML];
      tableObj.removeChild(trObj);

    } else {

      return;
    }
  }

  renderAqiList();
}

function init() {

  var addBtnObj = document.getElementById("add-btn"),
      tableObj  = document.getElementById("aqi-table");

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  if (addBtnObj) {
    eventUtil.addHandler(addBtnObj, "click", addBtnHandle);
  }

  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  if (tableObj) {
    eventUtil.addHandler(tableObj, "click", delBtnHandle);
  }

}

window.onload = init;