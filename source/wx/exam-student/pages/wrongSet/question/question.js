import {
  formatSeconds,
} from '../../../utils/util.js'

let app = getApp()
Page({
    /**
   * 页面的初始数据
   */
  data: {
    questionrId: null,
    questionVM: {},
    questionAnswerVM: {},
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let questionrId = options.id
    console.log('question: onload')
    let _this = this
    _this.setData({
      spinShow: true
    });
    app.formPost('/api/wx/student/question/answer/select/' + questionrId, null)
      .then(res => {
        _this.setData({
          spinShow: true
        });
        if (res.code === 1) {

          console.log('response: ' +res)
          console.log('response: ' +res.response.questionAnswerVM.correct)
          _this.setData({
            questionItem: res.response.questionVM,
            answer: res.response.questionAnswerVM,
            questionrId: questionrId,
          });
        }
      }).catch(e => {
        _this.setData({
          spinShow: false
        });
        app.message(e, 'error')
      })
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