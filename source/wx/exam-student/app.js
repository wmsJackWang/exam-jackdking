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
    // if (null == token || token == '') {
    //   console.log("onLaunch:token",token)
    //   //微信登入
    //   wx.login({
    //     success(res) {
    //       if (res.code) {
    //         _this.formPost('/api/wx/student/auth/checkBindV2', {
    //           "code": res.code
    //         }).then(res => {
    //           if (res.data.code == 1) {
                
    //             console.log("onLaunch:返回成功，token",token)
    //             wx.setStorageSync('token', res.data.response)
    //             wx.reLaunch({
    //               url: '/pages/index/index',
    //             });
    //           } else if (res.data.code == 2) {
    //             console.log("返回失败，回到bind界面，token",token)
    //             wx.reLaunch({
    //               url: '/pages/user/bind/index',
    //             });
    //           } else {
    //             _this.message(res.data.message, 'error')
    //           }
    //         }).catch(e => {
    //           _this.message(e, 'error')
    //         })
    //       } else {
    //         _this.message(res.errMsg, 'error')
    //       }
    //     }
    //   })
    // }
  },
  message: function(content, type) {
    $Message({
      content: content,
      type: type
    });
  },
  checkLogin: function(flag){
    let _this = this
    var token = wx.getStorageSync('token')
    console.log("formPost:是否存在token",token)
    return new Promise(
      (resolve,reject) => {
        if(token==null||token==''||flag!=null){
          //微信登入
          
          console.log("token为空，进行wx登入",token)
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
                //这里虽然判断了 如果没有token就登入，但是后续的代码跟此处的success方法不是串行执行，因此后续的
                //url请求还是没有token，因此需要将此处的代码跟后续的代码进行promise先后串行起来。
                success (res) {
                  console.log("formPost:返回值res",res.data.response)
                  
                  if (res.data.code == 1) {
                        
                    console.log("formPost:返回成功，token",token)
                    wx.setStorageSync('token', res.data.response)
                    resolve('login success')
                    //登入成功，不做跳转
                    // wx.reLaunch({
                    //   url: '/pages/index/index',
                    // });
                  } else if (res.data.code == 2) {
                    console.log("formPost:返回失败，回到bind界面，token",token)
                    
                    reject('login failed')
                    wx.reLaunch({
                      url: '/pages/user/bind/index',
                    });
                  } else {
                    _this.message(res.message, 'error')
                    reject('login failed')
                  }
    
                },
              })
            },
            fail: function () {
              wx.showToast({
                title: '登陆异常'
              })
              reject('login failed')
            },
          })
        }else{
          //token不为空，是否验证token是否是过期的token，如果不是过期token，还是需要去通过checkBindV2来更新token的。
          resolve('login success')
          console.log("token不为空",token)
        }
       

      }
    )
  },  

  //这个方法是给所有需要登入才能使用的url调用的方法。token放入到url的header中
  formPost: function(url, data) {
    
    let _this = this
    let flag = null
    let p1 = _this.checkLogin(flag);
    return p1.then(() => {
      return _this.jdkRequest(url, data)
    })
  },
  jdkRequest: function(url, data){
    let _this = this
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
          //更新token后，再重新访问url
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
            //因为promise是异步执行的，这里的代码不会等待前面checkbindV2执行完后再执行的。
            
            // console.log("跳转界，跳转到绑定页面面","")
            // wx.reLaunch({
            //   url: '/pages/user/bind/index',
            // });



            console.log("重新调用checkbindV2接口，更新token","")

            let flag = "true"
            let p1 = _this.checkLogin(flag);

            return p1.then(() => {
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
            })
            return true

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