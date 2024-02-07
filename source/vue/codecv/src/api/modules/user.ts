import { IUser, IUserInfo } from '@@types/type'
import { post } from '../config'

export function login(data: IUser) {
  return post('/api/codecv/user/login', data)
}

export function registerUser(data: IUser) {
  return post('/api/codecv/user/register', data)
}

export function updateUserInfo(data: IUserInfo) {
  return post('/api/codecv/user/update', data)
}

export function logout(data: { username: string }) {
  return post('/api/codecv/user/logout', data)
}

export function verify(data: { token: string; username: string }) {
  return post('/api/codecv/user/verify', data)
}

export function queryUserInfoById(data: { uid: number }) {
  return post('/api/codecv/user/queryUserById', data)
}

export function pwdUpdate(data: { nPassword: string; oPassword: string; username: string }) {
  return post('/api/codecv/user/pwdUpdate', data)
}
