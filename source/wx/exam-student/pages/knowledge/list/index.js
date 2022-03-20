// pages/exam/index/index.js
let app = getApp()
let question_id = null
Page({
  data: {
    isshow: false,
    paperType: 3,
    spinShow: false,
    loadMoreLoad: false,
    loadMoreTip: '暂无数据',
    queryParam: {
      questionId: null,
      pageIndex: 1,
      content: null,
      pageSize: app.globalData.pageSize
    },
    tableData: [],
    total: 1
  }, 
  /**
   * 展开、折叠效果
  */
  show: function () {
    this.setData({
      isshow: !this.data.isshow
    })
  },
  onLoad: function(options) {
    question_id = options.id
    console.log('question_id:', question_id)
    this.setData({
      spinShow: true,
      queryParam: {
        questionId: question_id,
        pageIndex: 1,
        pageSize: app.globalData.pageSize
      }
    });
    this.search(true)
  },
  tabChange({
    detail
  }) {
    this.setData({
      spinShow: true
    });
    let size = app.globalData.pageSize
    this.setData({
      queryParam: {
        questionId: question_id,
        pageIndex: 1,
        pageSize: app.globalData.pageSize
      }
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
  bindFormSubmit:  function(e) {
    console.log(e.detail.value.textarea)
    let _this = this
    this.setData({
      queryParam: {
        questionId: question_id,
        pageIndex: 1,
        content: e.detail.value.textarea,
        pageSize: app.globalData.pageSize
      }
    });
    app.formPost('/api/wx/student/konwledge/add', this.data.queryParam).then(res => {
      _this.setData({
        spinShow: false
      });
      this.search(true)

    }).catch(e => {
      _this.setData({
        spinShow: false
      });
      app.message(e, 'error')
    })

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
    app.formPost('/api/wx/student/konwledge/pageList?questionId='+question_id, this.data.queryParam).then(res => {
      _this.setData({
        spinShow: false
      });
      wx.stopPullDownRefresh()
      if (res.code === 1) {
        const re = res.response
        _this.setData({
          ['queryParam.pageIndex']: re.pageNum,
          tableData: override ? re.list : this.data.tableData.concat(re.list),
          total: re.pages
        });
        console.log('pageNum: '+re.pageNum + "pages: " + re.pages)
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