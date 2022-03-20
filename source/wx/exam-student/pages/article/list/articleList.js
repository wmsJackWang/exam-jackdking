let app = getApp()
Page({
  data: {
    spinShow: false,
    loadMoreLoad: false,
    loadMoreTip: '暂无数据',
    queryParam: {
      pageIndex: 1,
      pageSize: app.globalData.pageSize
    },
    tableData: [],
    total: 1
  },
  onLoad: function(options) {
    this.setData({
      spinShow: true
    });
    this.search(true)
  },

  onPullDownRefresh() {
    this.setData({
      spinShow: true
    });
    console.log('文章列表')
    if (!this.loading) {
      this.setData({
        ['queryParam.pageIndex']: 1
      });
      this.search(true)
    }
  },
  onReachBottom() {
    if (!this.loading && this.data.queryParam.pageIndex < this.data.total) {
      console.log("到达底部")
      this.setData({
        loadMoreLoad: true,
        loadMoreTip: '正在加载'
      });
      console.log("到达底部pageIndex "+this.data.queryParam.pageIndex)
      this.setData({
        ['queryParam.pageIndex']: this.data.queryParam.pageIndex + 1
      });
      console.log("到达底部加1后pageIndex "+this.data.queryParam.pageIndex)
      this.search(false)
    }
  },
  search: function(override) {
    let _this = this
    app.formPost('/api/wx/student/article/list', this.data.queryParam).then(res => {
      _this.setData({
        spinShow: false
      });
      wx.stopPullDownRefresh()
      if (res.code === 1) {
        const re = res.response.articles
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
      console.log(e, 'error')
    })
  }
})