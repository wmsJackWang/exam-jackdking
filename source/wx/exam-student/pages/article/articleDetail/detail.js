// pages/article/articleDetail/detail.js
//index.js
//获取应用实例
const app = getApp()
let articleId
Page({

  /**
   * 页面的初始数据
   */
  data: {
    article: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let id = options.id
    articleId = options.id
    console.log("文章id: ", id)
    this.articleLoad(id)
  },
  articleLoad: function(id){

    app.formPost('/api/wx/student/article/detail?articleId='+id, null)
    .then(res => {
      console.log('res', res);
      let obj = app.towxml(res.response.payload.article.content,'markdown',{
        theme:'light', //主题 dark 黑色，light白色，不填默认是light
        base:"http://bittechblog.com",
        events:{      //为元素绑定的事件方法
          tap:event => {
            console.log('tap',event);
            // console.log(event, "towxml event")
            // 只处理图片的点击事件
            if (event.currentTarget.dataset.data && event.currentTarget.dataset.data.attrs && (event.currentTarget.dataset.data.attrs.class == "h2w__img")) {
              console.log("chain deal img");
              // 传入图片地址，调用微信图片预览 API
              var imgUrls = [event.currentTarget.dataset.data.attrs.src];
              wx.previewImage({
                current: event.currentTarget.dataset.data.attrs.src, // 当前显示图片的http链接
                urls: imgUrls
              })
            } else{
              console.log("not image");
            }
          },
          change:event => {
            console.log('todo',event);
          }
        }
      });
      console.log(obj)
      //更新解析数据
      this.setData({
        article:obj,
      });
    }).catch(e => {
      return false;
    });


    // app.send('https://bittechblog.com/api/wx/student/article/detail?articleId=192', 'POST' , null, res => {
      
    //   let obj = app.towxml(res.payload.article.content,'markdown',{
    //     theme:'light', //主题 dark 黑色，light白色，不填默认是light
    //     base:"www.xxx.com",
    //     events:{      //为元素绑定的事件方法
    //       tap:e => {POST
    //         console.log('tap',e);
    //       },
    //       change:e => {
    //         console.log('todo',e);
    //       }
    //     }
    //   });
    //   console.log(obj)
    //   //更新解析数据
    //   this.setData({
    //     article:obj,
    //   });
    // }, res => {
    //   return false;
    // });

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

    this.articleLoad(articleId)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})