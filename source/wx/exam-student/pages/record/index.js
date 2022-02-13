// pages/exam/index/index.js
let app = getApp()
let tmp = 1
Page({
  data: {
    spinShow: false,
    loadMoreLoad: false,
    loadMoreTip: '暂无数据',
    queryParam: {
      pageIndex: 1,
      tabType: 1,
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
  tabChange({
    detail
  }) {
    this.setData({
      spinShow: true
    });
    let size = app.globalData.pageSize
    tmp = detail.key
    console.log(tmp)
    this.setData({
      queryParam: {
        tabType: detail.key,
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

      console.log(tmp)
      this.setData({
        ['queryParam.pageIndex']: 1 ,
        viewType: tmp
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
    //默认的url
    let requireUrl = "/api/wx/student/exampaper/answer/pageList" 
    switch (tmp) {
      case "1":
        requireUrl = "/api/wx/student/exampaper/answer/pageList"
        break;
      case "2":
        
        requireUrl = "/api/wx/student/question/answer/page"
        break;
    
      case "3":
        
        requireUrl = "/api/wx/student/question/answer/rankPage"
        break;
      default:
        break;
    }

    app.formPost(requireUrl, this.data.queryParam)
      .then(res => {
        _this.setData({
          spinShow: false
        });
        wx.stopPullDownRefresh()
        if (res.code === 1) {
          const re = res.response
          _this.setData({
            ['queryParam.pageIndex']: re.pageNum,
            viewType: tmp,
            tableData: override ? re.list : this.data.tableData.concat(re.list),
            total: re.pages
          });
          console.log("pageNum "+re.pageNum)
          console.log("pages "+ re.pages)
          console.log("viewType "+ tmp)
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