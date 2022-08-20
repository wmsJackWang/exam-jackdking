//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    spinShow: false,
    article: {},
    fixedPaper: [],
    pushPaper: [],
    timeLimitPaper: [],
    taskList: []
  },
  onLoad: function() {
    this.setData({
      spinShow: true
    });
    this.articleLoad()
    this.indexLoad()

    wx.startGyroscope({
      interval: "normal",
      success(){
        wx.onGyroscopeChange((result) => {
          // console.log('tuoluoyi' + result.x + ' ' + result.y + ' ' +  result.z);
        })
      }
    })

    wx.startAccelerometer({
      interval: "normal",
      success(){
        wx.onAccelerometerChange((result) => {
          console.log('jiasuduji' + result.x + ' ' + result.y + ' ' +  result.z);
        })
      }
    })

  },
  articleLoad(){
    app.send('https://www.vvadd.com/wxml_demo/demo.txt?v=2', 'GET' , null, res => {
      
      let obj = app.towxml(res.data,'markdown',{
        theme:'light', //主题 dark 黑色，light白色，不填默认是light
        base:"www.xxx.com",
        events:{      //为元素绑定的事件方法
          tap:e => {
            console.log('tap',e);
          },
          change:e => {
            console.log('todo',e);
          }
        }
      });
      console.log(obj)
      //更新解析数据
      this.setData({
        article:obj,
      });
    }, res => {
      return false;
    });

  },
  onPullDownRefresh() {
    this.setData({
      spinShow: true
    });
    this.articleLoad()
    if (!this.loading) {
      this.indexLoad()
    }
  },
  indexLoad: function() {
    let _this = this
    app.formPost('/api/wx/student/dashboard/index', null).then(res => {
      _this.setData({
        spinShow: false
      });
      wx.stopPullDownRefresh()
      if (res.code === 1) {
        _this.setData({
          fixedPaper: res.response.fixedPaper,
          timeLimitPaper: res.response.timeLimitPaper,
          pushPaper: res.response.pushPaper
        });
      }
    }).catch(e => {
      _this.setData({
        spinShow: false
      });
      app.message(e, 'error')
    })

    app.formPost('/api/wx/student/dashboard/task', null).then(res => {
      _this.setData({
        spinShow: false
      });
      wx.stopPullDownRefresh()
      if (res.code === 1) {
        _this.setData({
          taskList: res.response,
        });
      }
    }).catch(e => {
      _this.setData({
        spinShow: false
      });
      app.message(e, 'error')
    })
  }
})