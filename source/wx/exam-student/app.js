const {
  $Message
} = require('/component/iView/base/index');
// const mtjwxsdk = require('./utils/mtj-wx-sdk.js');
const mtjwxsdk = require('./utils/bmap-wx.js');

App({
  globalData: {
    baseAPI: "https://exam.bittechblog.com",
    pageSize: 10
  },
  onLaunch: function() {
    let _this = this
    //从用户微信本地获取token数据
    let token = wx.getStorageSync('token')
    //如果token数据为空，表示用户未登入
    if (null == token || token == '') {
      console.log("token",token)
      //微信登入
      wx.login({
        success(wxres) {
          if (wxres.code) {
            _this.formPost('/api/wx/student/auth/checkBindV2', {
              "code": wxres.code
            }).then(res => {
              if (res.code == 1) {
                
                console.log("返回成功，token",token)
                wx.setStorageSync('token', res.response)
                wx.reLaunch({
                  url: '/pages/index/index',
                });
              } else if (res.code == 2) {
                console.log("返回失败，回到bind界面，token",token)
                wx.reLaunch({
                  url: '/pages/user/bind/index',
                });
              } else {
                _this.message(res.message, 'error')
              }
            }).catch(e => {
              _this.message(e, 'error')
            })
          } else {
            _this.message(res.errMsg, 'error')
          }
        }
      })
    }
  },
  message: function(content, type) {
    $Message({
      content: content,
      type: type
    });
  },
  //这个方法是给所有需要登入才能使用的url调用的方法。token放入到url的header中
  formPost: function(url, data) {
    let _this = this
    var token = wx.getStorageSync('token')
    console.log("是否存在token",token)
    if(token==null||token==''){

      //微信登入
      wx.login({
        success(res) {
          wx.request({
            url: _this.globalData.baseAPI+'/api/wx/student/auth/checkBindV2', 
            method: "POST",
            data: {
              code: res.code
            },
            dataType: 'json',
            header: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            success (res) {
              console.log("res",res.data.response)
              
              if (res.data.code == 1) {
                    
                console.log("返回成功，token",token)
                wx.setStorageSync('token', res.data.response)
                //登入成功，不做跳转
                // wx.reLaunch({
                //   url: '/pages/index/index',
                // });
              } else if (res.data.code == 2) {
                console.log("返回失败，回到bind界面，token",token)
                wx.reLaunch({
                  url: '/pages/user/bind/index',
                });
              } else {
                _this.message(res.message, 'error')
              }

            },
          })
        }
      })
    }

    return new Promise(function(resolve, reject) {
      wx.showNavigationBarLoading();
      wx.request({
        url: _this.globalData.baseAPI + url,
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'token': wx.getStorageSync('token')
        },
        method: 'POST',
        data,
        success(res) {
          console.log("url",url)
          
          if (res.statusCode !== 200 || typeof res.data !== 'object') {
            reject('网络出错')
            return false;
          }

          //后台切面逻辑判断token是否失效，失效则更新token值并返回400
          if (res.data.code === 400) {
            let token = res.data.response
            wx.setStorageSync('token', token)
            wx.request({
              url: _this.globalData.baseAPI + url,
              header: {
                'content-type': 'application/x-www-form-urlencoded',
                'token': wx.getStorageSync('token')
              },
              method: 'POST',
              data,
              success(result) {
                resolve(result.data);
                return true;
              }
            })
          } else if (res.data.code === 401) {
            wx.reLaunch({
              url: '/pages/user/bind/index',
            });
            return false;
          } else if (res.data.code === 500) {
            reject(res.data.message)
            return false;
          } else if (res.data.code === 501) {
            reject(res.data.message)
            return false;
          } else {
            resolve(res.data);
            return true;
          }
        },
        fail(res) {
          reject(res.errMsg)
          return false;
        },
        complete(res) {
          wx.hideNavigationBarLoading();
        }
      })
    })
  }
})