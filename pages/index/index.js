//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    list: [
      {
        id: "timer",
        name: "计时器",
        open: false,
        pages: [
          { key: "alarm", name: "9分钟", url: "/pages/alarm/alarm" },
          { key: "alarm", name: "6分钟", url: "/pages/alarm/alarm" }
        ]
      },
      {
        id: "widget",
        name: "SNG分配",
        open: false,
        pages: [
          { name: "4-6人局", url: "/pages/" },
          { name: "7人局", url: "/pages/" },
          { name: "8-9人局", url: "/pages/" }
        ]
      },
      {
        id: "feedback",
        name: "概率",
        open: false,
        pages: [{ name: "成牌概率", url: "/pages/" }]
      },
      {
        id: "nav",
        name: "教学文章",
        open: false,
        pages: [{ name: "教学文章", url: "/pages/" }]
      },
      {
        id: "search",
        name: "牌局统计",
        open: false,
        pages: [{ name: "收入统计", url: "/pages/" }]
      }
    ]
  },
  kindToggle: function(e) {
    var id = e.currentTarget.id,
      list = this.data.list;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open;
      } else {
        list[i].open = false;
      }
    }
    this.setData({
      list: list
    });
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: "../logs/logs"
    });
  },
  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      });
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        });
      };
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo;
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          });
        }
      });
    }
  },
  showTopTips: function(e) {
    var that = this;
    this.setData({
      showTips: true
    });
  },
  formSubmit: function(e) {
    var formData = e.detail.value;
    var password = formData.password;
    var email = formData.username;
    var vcode = formData.vcode;

    var msgContent = "";

    var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    var isEmail = reg.test(email);

    var isShowTips = false;

    if (!isEmail) {
      isShowTips = true;
      msgContent = "用户名不符合规范";
    }

    var isPassword = false;
    if (password.length >= 6 && password.length <= 20) {
      isPassword = true;
    }

    if (!isPassword) {
      isShowTips = true;
      msgContent += "密码不符合规范";
    }

    var isVCode = false;
    if (vcode.length > 0) {
      isVCode = true;
    }

    if (!isVCode) {
      isShowTips = true;
      msgContent += "验证码不能为空";
    }

    console.log(isShowTips);

    this.setData({
      showTips: isShowTips,
      msgContent: msgContent
    });
    if (!isShowTips) {
      wx.showToast({
        title: "登录成功",
        icon: "success",
        duration: 3000
      });
    }
  },

  checkUsername: function(e) {
    var email = e.detail.value;
    var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    var isEmail = reg.test(email);
    this.setData({
      showTips: !isEmail,
      msgContent: "密码不符合规范"
    });
  },
  getUserInfo: function(e) {
    console.log(e);
    app.globalData.userInfo = e.detail.userInfo;
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    });
  }
});
