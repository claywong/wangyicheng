var sliderWidth = 96;

Page({
    data: {
        tabs: ['已发布', '全部'],
        activeIndex: 0,
        siliderOffset: 0,
        sliderLeft: 0,
        brief: null,
        list: null,
        sp: 0,
        qr_hidden: true,
        qr_url: '',
    },


    onLoad: function () {
        var that = this;
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
                    sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex,
                });
            }
        });
        getList(this);
    },

    nextPage: function () {
        console.log('nextPage');
        console.log(this.data.sp);
        getList(this, this.data.sp);
    },

    getList: function () {
        getList(this);
    },

    defaultTap: function (e) {
        console.log(e)
        this.setData({
            qr_hidden: false,
            qr_url: this.data.brief.qrUrl,
        });
    },

    confirm:function (e) {
        this.setData({
            qr_hidden: true,
            qr_url: ''
        });
    },


    tabClick: function (e) {
        this.setData({
            sliderOffset: e.currentTarget.offsetLeft,
            activeIndex: e.currentTarget.id
        });
    }
})

function getList(obj, sp = 0) {
    wx.request({
        url: 'https://toolchain.camera360.com/apollo/getModuleDetail?module=Camera360-iOS-Community&count=5&tab=0&_=1513751545142',
        data: {
            sp: sp,
        },
        header: {
            'Cookie': "Hm_lvt_30a8b487d0295145accb5b0973a5f4cf=1512441220; __utma=2311970.1055633690.1512441221.1512441221.1512441221.1; __utmz=2311970.1512441221.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); email=wangzhong%40camera360.com; c360_oa_user_info=MmlNRGFrcWxMVXVoNGs0N3RoMUdOSysxLyswQm1tQTZoTVd5WjB3THUwV3RxQUhpNjZTY28xbVpPSlJtcTJSdlgwU0IyUlJPS2pRZ1d5MlZ1QWlJTGpmU0lqQTJ6bTNoak83azIrMmRoSUlxajJMNzRHQUhCQ3FxNkMyaTRPVnpvMlhKengya1NzRm5XWlUyb1A3bm1kd2NMcXR1eEJoVQ%3D%3D; name=%E6%B1%AA%E4%B8%AD",
        },
        success: function (res) {
            console.log(res.data.data)
            console.log(sp)
            var listData = obj.data.list;
            if (sp > 0) {
                listData = listData.concat(res.data.data.list);
            } else {
                listData = res.data.data.list;
            }
            obj.setData({
                brief: res.data.data.brief,
                list: listData,
                sp: res.data.data.sp,
            })
        }
    });
}