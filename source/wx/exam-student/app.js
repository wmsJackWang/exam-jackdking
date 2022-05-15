const {
  $Message
} = require('/component/iView/base/index');
// const mtjwxsdk = require('./utils/mtj-wx-sdk.js');
const mtjwxsdk = require('./utils/bmap-wx.js');

App({
  towxml:require('/towxml/index'),
  globalData: {
    baseAPI: "https://bittechblog.com",
    pageSize: 15
  },
  autoUpdate: function() {
    var self = this
    // 获取小程序更新机制兼容
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      //1. 检查小程序是否有新版本发布
      updateManager.onCheckForUpdate(function(res) {
        // 请求完新版本信息的回调
        if (res.hasUpdate) {
          //检测到新版本，需要更新，给出提示
          wx.showModal({
            title: '更新提示',
            content: '检测到新版本，是否下载新版本并重启小程序？',
            success: function(res) {
              if (res.confirm) {
                //2. 用户确定下载更新小程序，小程序下载及更新静默进行
                self.downLoadAndUpdate(updateManager)
              } else if (res.cancel) {
                //用户点击取消按钮的处理，如果需要强制更新，则给出二次弹窗，如果不需要，则这里的代码都可以删掉了
                wx.showModal({
                  title: '温馨提示~',
                  content: '本次版本更新涉及到新的功能添加，旧版本无法正常访问的哦~',
                  showCancel:false,//隐藏取消按钮
                  confirmText:"确定更新",//只保留确定更新按钮
                  success: function(res) {
                    if (res.confirm) {
                      //下载新版本，并重新应用
                      self.downLoadAndUpdate(updateManager)
                    }
                  }
                })
              }
            }
          })
        }
      })
    } else {
      // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },
  /**
   * 下载小程序新版本并重启应用
   */
  downLoadAndUpdate: function (updateManager){
    var self=this
    wx.showLoading();
    //静默下载更新小程序新版本
    updateManager.onUpdateReady(function () {
      wx.hideLoading()
      //新的版本已经下载好，调用 applyUpdate 应用新版本并重启
      updateManager.applyUpdate()
    })
    updateManager.onUpdateFailed(function () {
      // 新的版本下载失败
      wx.showModal({
        title: '已经有新版本了哟~',
        content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
      })
    })
  },
  onLaunch: function() {
    let _this = this
    //从用户微信本地获取token数据
    let token = wx.getStorageSync('token')
    this.autoUpdate()
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
  send: function(url, method, data, success, fail){
    wx.request({
      url: url,
      header: {
        'content-type': 'application/json',
      },
      method: method,
      data: data,
      success(res) {
        success(res);
      },
      fail(res) {
        fail(res);
      }
    })
  },

  //这个方法是给所有需要登入才能使用的url调用的方法。token放入到url的header中
  formPost: function(url, data) {
    let _this = this
    let flag = null
    //急需优化，每个api请求都需要提前判断下是否处于登录状态
    //一次动作需要两次网络请求。
    //纠正：经过验证，检查是否已经登入的点是：登录token是否存在。
    //因此并不是有两次网络请求
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
  },
  autoUpdate:function(){
    console.log(new Date())
    var self=this
    // 获取小程序更新机制兼容
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      //1. 检查小程序是否有新版本发布
      updateManager.onCheckForUpdate(function (res) {
        // 请求完新版本信息的回调
        if (res.hasUpdate) {
          //2. 小程序有新版本，则静默下载新版本，做好更新准备
          updateManager.onUpdateReady(function () {
            console.log(new Date())
            wx.showModal({
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              success: function (res) {
                if (res.confirm) {
                  //3. 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                  updateManager.applyUpdate()
                } else if (res.cancel) {
                  //如果需要强制更新，则给出二次弹窗，如果不需要，则这里的代码都可以删掉了
                  wx.showModal({
                    title: '温馨提示~',
                    content: '本次版本更新涉及到新的功能添加，旧版本无法正常访问的哦~',
                    success: function (res) {     
                      self.autoUpdate()
                      return;                 
                      //第二次提示后，强制更新                      
                      if (res.confirm) {
                        // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                        updateManager.applyUpdate()
                      } else if (res.cancel) {
                        //重新回到版本更新提示
                        self.autoUpdate()
                      }
                    }
                  })
                }
              }
            })
          })
          updateManager.onUpdateFailed(function () {
            // 新的版本下载失败
            wx.showModal({
              title: '已经有新版本了哟~',
              content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
            })
          })
        }
      })
    } else {
      // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  }
})