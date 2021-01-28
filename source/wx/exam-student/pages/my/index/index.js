const app = getApp()
Page({
  data: {
    spinShow: false,
    info: {}
  },

  onLoad: function(options) {
    this.loadUserInfo()
  },
  loadUserInfo() {
    let _this = this
    _this.setData({
      spinShow: true
    });
    app.formPost('/api/wx/student/user/current', null).then(res => {
      if (res.code == 1) {
        _this.setData({
          info: res.response
        });
      }
      _this.setData({
        spinShow: false
      });
    }).catch(e => {
      _this.setData({
        spinShow: false
      });
      app.message(e, 'error')
    })
  },
  logOut() {
    let _this = this
    _this.setData({
      spinShow: true
    });
    app.formPost('/api/wx/student/auth/unBind', null).then(res => {
      if (res.code == 1) {
        wx.setStorageSync('token', '')
        wx.reLaunch({
          url: '/pages/user/bind/index',
        });
      }
      _this.setData({
        spinShow: false
      });
    }).catch(e => {
      _this.setData({
        spinShow: false
      });
      app.message(e, 'error')
    })
  },
  scan(){
    var that = this
    wx.scanCode({
      onlyFromCamera: true,//仅仅相机
      success: (res) => {
        console.log(res)
      },
      //错误返回
      fail: (res) => {
        wx.showToast({
          title: 'fail',
          icon: 'none',
          duration: 1000
        })
      },
      complete: function (res) { 
        wx.showToast({
          title: res.result,
          icon: 'none',
          duration: 1000
        })
       },
    })
  }
})