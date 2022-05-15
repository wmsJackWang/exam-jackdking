// pages/exam/index/index.js
let app = getApp()
let question_id = null
let parentKonwledgeId = null
Page({
  data: {
    isshow: false,
    thinkKonwledge: {},
    questionItem: {},
    answer: {},
    titleType: 0,
    isEdit: false,
    spinShow: false,
    loadMoreLoad: false,
    loadMoreTip: '暂无数据',
    queryParam: {
      questionId: '',
      knowledgeType: 'A',
      parentKonwledgeId: '',
      pageIndex: 1,
      content: '',
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
    tmp = detail.key
    console.log(tmp)
    this.setData({
      queryParam: {
        knowledgeType: detail.key,
        pageIndex: 1,
        pageSize: app.globalData.pageSize
      }
    });
    this.search(true)
  },
  /**
   * 展开、折叠效果
  */
  show: function () {
    this.setData({
      isshow: !this.data.isshow
    })
  }, 
  /**
    * 修改内容
  */
  edit: function () {
    this.setData({
      isEdit: !this.data.isEdit
    })
  }, 
  /**
   * 提交修改内容
  */
  editSubmit: function () {
    this.setData({
      isEdit: !this.data.isEdit
      
    })
  },
  onLoad: function(options) {
    console.log('options.id:', options.id)
    question_id = options.id
    parentKonwledgeId = options.parentKonwledgeId
    console.log('question_id:', question_id);
    console.log('parentKonwledgeId:', parentKonwledgeId);
  
    if (question_id != undefined) {
      console.log('question_id:', question_id)    
      this.setData({
        spinShow: true,
        ['queryParam.questionId']: question_id
      });
    } 
    if (parentKonwledgeId != undefined) {
      console.log('parentKonwledgeId:', parentKonwledgeId)    
      this.setData({
        spinShow: true,
        ['queryParam.parentKonwledgeId']: parentKonwledgeId
      });
    }
    // if () {
    //   console.log('question_id:', question_id)
    //   this.setData({
    //     spinShow: true,
    //     queryParam: {
    //       questionId: question_id,
    //       pageIndex: 1,
    //       pageSize: app.globalData.pageSize
    //     }
    //   });
    // }
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

    if (e.detail.value.textarea.length == 0) {
      wx.showToast({
        title: '内容不能为空',
        // icon: 'success',
        duration: 2000
       })
       return
    }

    if (question_id != undefined) {
      console.log('question_id:', question_id)    
      this.setData({
        spinShow: true,
        ['queryParam.questionId']: question_id
      });
    } 
    if (parentKonwledgeId != undefined) {
      console.log('parentKonwledgeId:', parentKonwledgeId)    
      this.setData({
        spinShow: true,
        ['queryParam.parentKonwledgeId']: parentKonwledgeId
      });
    }
    this.setData({
      spinShow: true,
      ['queryParam.pageIndex']: 1,
      ['queryParam.pageSize']: app.globalData.pageSize,
      ['queryParam.content']: e.detail.value.textarea
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
    app.formPost('/api/wx/student/konwledge/pageListV2', this.data.queryParam).then(res => {
      _this.setData({
        spinShow: false
      });
      wx.stopPullDownRefresh()
      if (res.code === 1) {
        const re = res.response
        if (re.titleType == 0 || re.titleType == 1) {
          //内容是文本
          _this.setData({
            ['queryParam.pageIndex']: re.page.pageNum,
            tableData: override ? re.page.list : this.data.tableData.concat(re.page.list),
            total: re.page.pages,
            thinkKonwledge: re.parentKonwledge,
            titleType: re.titleType
          });
        } else if (re.titleType == 2){
          //内容是问题
          _this.setData({
            ['queryParam.pageIndex']: re.page.pageNum,
            tableData: override ? re.page.list : this.data.tableData.concat(re.page.list),
            total: re.page.pages,
            thinkKonwledge: re.parentKonwledge,
            titleType: re.titleType,
            questionItem: re.questionItem.questionVM,
            answer: re.questionItem.questionAnswerVM
          });
        }

        console.log('pageNum: '+re.pageNum + "pages: " + re.pages)
        if (re.page.pageNum >= re.page.pages) {
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