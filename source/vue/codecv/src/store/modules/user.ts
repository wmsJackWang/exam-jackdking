import { defineStore } from 'pinia'
import VerificationCode, { createCode } from 'picture-verification-code'
import pinia from '@/store'
import { setLocalStorage, getLocalStorage, removeLocalStorage } from '@/common/localstorage'
import { errorMessage, successMessage } from '@/common/message'
import { Tip } from '@/common/tip'
import { login, logout, registerUser, verify } from '@/api/modules/user'
import { userForm } from '@/layout/header/hook'
import { IUser, IUserInfo } from '@@types/type'

const codeInstance = new VerificationCode()
export const TOKEN = 'TOKEN',
  CODE_SERVICE_TOKEN = 'CODE_SERVICE_TOKEN',
  USERNAME = 'USERNAME',
  SET_TOKEN = 'SET_TOKEN',
  SET_USERNAME = 'SET_USERNAME'

export const initialInfo = {
  uid: 0,
  nickName: '',
  username: '',
  sex: '',
  professional: '',
  graduation: '',
  school: '',
  avatar: '',
  origin: ''
}
type SessionStorageValue<T> = { value: T; expires: number }
function setSessionStorage(
  CODE_SERVICE_TOKEN: string,
  value: unknown,
  expires: number = 1000 * 60 * 60 * 3
) {
  const result: SessionStorageValue<typeof value> = {
    value,
    expires: Date.now() + expires
  }
  sessionStorage.setItem(CODE_SERVICE_TOKEN, JSON.stringify(result))
  return true
}

const useUserStore = defineStore('userStore', {
  state: () => ({
    userInfo: initialInfo,
    loginState: {
      logined: false, // 登录态
      loginModel: false,
      verify: '', // 验证码
      verifyImg: '' // 验证码图片
    },
    token: getLocalStorage(TOKEN) || ''
  }),
  actions: {
    login(user: IUser, isLogin: boolean) {
      if (!user.username || !user.password) {
        errorMessage(Tip.BE_INCOMPLATE)
        return
      }
      if (this.loginState.verify.toLowerCase() != user.verify.toLowerCase()) {
        errorMessage(Tip.VERIFY_CODE_INVAILED)
        return
      }
      const cb = isLogin ? login : registerUser
      cb(user).then((res: any) => {
        console.log(JSON.stringify(res))
        if (res.code === 200) {
          this.loginState.logined = true
          this.loginModelToggle()
          console.log('res:' + JSON.stringify(res))
          console.log('msg:' + res.msg)
          console.log('data:' + res.data)
          console.log('username:' + res.data.username)
          // 更新用户信息
          this.setUserInfo(this.userInfo, res.data)
          this.setUserInfo(userForm, res.data)
          // 缓存重要信息
          setLocalStorage(TOKEN, res.token)
          setLocalStorage(USERNAME, res.data.username)
          setSessionStorage(CODE_SERVICE_TOKEN, res.token) // 保存会话
          successMessage(res.msg)
        } else {
          errorMessage(res.msg)
        }
      })
    },
    logout() {
      logout({ username: getLocalStorage(USERNAME) as string }).then((res: any) => {
        if (res.code != 200) {
          errorMessage(res.msg)
          return
        }
        removeLocalStorage(TOKEN)
        removeLocalStorage(USERNAME)
        location.reload()
      })
    },
    verifyLoginState(token: string, username: string) {
      verify({ token, username }).then((res: any) => {
        if (res.code === 200) {
          this.loginState.logined = true
          this.setUserInfo(this.userInfo, res.data)
          this.setUserInfo(userForm, res.data)
        } else {
          errorMessage(res.msg)
        }
      })
    },
    loginModelToggle() {
      console.log('loginModelToggle')
      console.log(this.loginState.loginModel)
      this.loginState.loginModel = !this.loginState.loginModel
      console.log(this.loginState.loginModel)
      console.log('before loginState:' + JSON.stringify(this.loginState))
      this.genVerify()
      console.log('after loginState:' + JSON.stringify(this.loginState))
    },
    genVerify() {
      this.loginState.verify = createCode()
      this.loginState.verifyImg = codeInstance.render(this.loginState.verify)
    },
    setUserInfo(target: IUserInfo, userInfo: IUserInfo) {
      target.uid = userInfo.uid
      target.nickName = userInfo.nickName
      target.username = userInfo.username
      target.sex = userInfo.sex
      target.professional = userInfo.professional
      target.graduation = userInfo.graduation
      target.school = userInfo.school
      target.avatar = userInfo.avatar
      target.origin = userInfo.origin
    }
  }
})

export default () => useUserStore(pinia)
