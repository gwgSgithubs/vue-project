import {getRequest, postRequest} from './http'
import {storage} from 'common/js/common'

function setData (data) {
  let reSetData = Object.assign({}, storage('loginData'), data)
  return reSetData
}
// 账号登录
export function login (data, fn) {
  postRequest('/account/post/login', data, (res) => {
    fn(res)
  })
}
// 手机号码登录
export function postPhoneLogin (data, fn) {
  postRequest('/account/terminal/login/phoneCode', data, (res) => {
    fn(res)
  })
}
// 获取验证码
export function getLoginCode (data, fn) {
  const resetData = setData(data)
  getRequest('/system/send/terminal/sendPhoneCode', resetData, (res) => {
    fn(res)
  })
}
// 提交验证码 -- 忘记密码
export function getCheckCode (data, fn) {
  const resetData = setData(data)
  getRequest('/system/check/terminal/phoneCode', resetData, (res) => {
    fn(res)
  })
}
// 提交保存
export function postSavePw (data, fn) {
  postRequest('/account/terminal/retrievePwd', data, (res) => {
    fn(res)
  })
}
