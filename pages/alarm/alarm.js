// pages/alarm/alarm.js


Page({
  data: {
    wxTimerList: {},
    array: ["美国", "中国", "巴西", "日本"],
    index: 0,
    date: "2016-09-01",
    time: "12:01"
  },

  onShow: function() {
    var timer = require("../../utils/wxTimer.js");

    var wxTimer = new timer({
      beginTime: "00:09:00",
      complete: function() {
        console.log("完成了");
      }
    });
    wxTimer.start(this);
  },
  bindPickerChange: function(e) {
    console.log("picker发送选择改变，携带值为", e.detail.value);
    this.setData({
      index: e.detail.value
    });
  },
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    });
  },
  bindTimeChange: function(e) {
    this.setData({
      time: e.detail.value
    });
  }
});