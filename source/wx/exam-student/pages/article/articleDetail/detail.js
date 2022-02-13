// pages/article/articleDetail/detail.js
//index.js
//获取应用实例
const app = getApp()

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

    this.articleLoad()
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

    this.articleLoad()
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