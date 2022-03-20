import {
  formatSeconds,
} from '../../../utils/util.js'

let app = getApp()
Page({
  data: {
    spinShow: false,
    paperId: null,
    paper: {},
    answer: {},
    timer: null,
    doTime: 0,
    remainTime: 0,
    remainTimeStr: '',
    modalShow: false,
    result: 0,
    timeOutShow: false
  },
  gotoMorePage: function(event){
    const number = event.target.id;//1或者2得到点击了按钮1或者按钮2 
    console.log('navigateTo more page')
    const url = "/pages/knowledge/list/index?id="+number;//得到页面url 
    wx.navigateTo({
    url: url,   
    success: function(res) {
      // 通过eventChannel向被打开页面传送数据
      res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' })
      console.log('navigateTo more page success')
    }
    }) 
  },
  onLoad: function(options) {
    let paperId = options.id
    let _this = this
    _this.setData({
      spinShow: true
    });
    app.formPost('/api/wx/student/exampaper/answer/read/' + paperId, null)
      .then(res => {
        _this.setData({
          spinShow: false
        });
        if (res.code === 1) {
          _this.setData({
            paper: res.response.paper,
            answer: res.response.answer,
            paperId: paperId,
          });
        }
      }).catch(e => {
        _this.setData({
          spinShow: false
        });
        app.message(e, 'error')
      })
  },
  onUnload() {
    clearInterval(this.data.timer)
  },
  returnRecord() {
    wx.reLaunch({
      url: '/pages/record/index',
    });
  },
  timeOut() {
    clearInterval(this.data.timer)
    this.setData({
      timeOutShow: true
    });
  }
})