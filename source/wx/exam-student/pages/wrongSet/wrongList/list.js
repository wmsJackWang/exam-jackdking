// pages/record/index/index.js
let app = getApp()
Page({
  data: {
    recordType: 1,
    spinShow: false,
    loadMoreLoad: false,
    loadMoreTip: '暂无数据',
    queryParam: {
      questionId: null,
      recordType: 1,
      pageIndex: 1,
      pageSize: app.globalData.pageSize
    },
    tableData: [],
    total: 1
  },  
  tabChange({
    detail
  }) {
    this.setData({
      spinShow: true
    });
    let size = app.globalData.pageSize
    this.setData({
      recordType: detail.key,
      queryParam: {
        recordType: detail.key,
        pageIndex: 1,
        questionId: detail.key,
        pageSize: app.globalData.pageSize
      }
    });
    this.search(true)
  },
  onLoad: function(options) {
    let questionrId = options.id
    this.data.queryParam.questionId=questionrId
    this.setData({
      spinShow: true
    });
    this.search(true)
  },
  onPullDownRefresh() {
    this.setData({
      spinShow: true
    });
    if (!this.loading) {
      this.setData({
        ['queryParam.pageIndex']: 1
      });
      this.search(true)
    }
  },
  onReachBottom() {
    if (!this.loading && this.data.queryParam.pageIndex < this.data.total) {
      this.setData({
        loadMoreLoad: true,
        loadMoreTip: '正在加载'
      });
      this.setData({
        ['queryParam.pageIndex']: this.data.queryParam.pageIndex + 1
      });
      this.search(false)
    }
  },
  search: function(override) {
    let _this = this
    let recordUrl = '/api/wx/student/question/answer/questionWrongPage'

    console.log('recordType: '+this.data.queryParam.recordType)
    console.log('recordUrl: '+ recordUrl)

    app.formPost(recordUrl, this.data.queryParam)
      .then(res => {
        _this.setData({
          spinShow: false
        });
        wx.stopPullDownRefresh()
        if (res.code === 1) {
          const re = res.response
          console.log(res.response)
          _this.setData({
            ['queryParam.pageIndex']: re.pageNum,
            tableData: override ? re.list : this.data.tableData.concat(re.list),
            total: re.pages
          });
          if (re.pageNum >= re.pages) {
            this.setData({
              loadMoreLoad: false,
              loadMoreTip: '暂无数据'
            });
          }
        }
      }).catch(e => {
        _this.setData({
          spinShow: false
        });
        app.message(e, 'error')
      })
  }
})