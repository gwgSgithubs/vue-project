import {getRequest, postRequest} from './http'
import {storage} from 'common/js/common'

function setData (data) {
  let reSetData = Object.assign({}, storage('loginData'), data)
  return reSetData
}
// 获取我的任务数据
export function getUserData (data, fn) {
  const resetData = setData(data)
  getRequest('/follow/user/details', resetData, (res) => {
    fn(res)
  })
}
// 获取我的移交数据
export function getMoveAccountInfo (data, fn) {
  const resetData = setData(data)
  getRequest('/terminal/user/moveAccountInfo', resetData, (res) => {
    fn(res)
  })
}
// 获得所有
export function getAllFollowJobs (data, fn) {
  const resetData = setData(data)
  getRequest('/followManager/getAllFollowJobs', resetData, (res) => {
    fn(res)
  })
}
// 是否已推送二维码
export function isPush (data, fn) {
  const resetData = setData(data)
  getRequest('/follow/push/isPush', resetData, (res) => {
    fn(res)
  })
}
// 推送个人二维码
export function pushQrcode (data, fn) {
  const resetData = setData(data)
  postRequest('/follow/push/qrcode', resetData, (res) => {
    fn(res)
  })
}

// 移交申请
export function moveApply (data, fn) {
  const resetData = setData(data)
  postRequest('/follow/user/move', resetData, (res) => {
    fn(res)
  })
}
// 确定修改
export function updateUser (data, fn) {
  const resetData = setData(data)
  postRequest('/terminal/user/update', resetData, (res) => {
    fn(res)
  })
}
// 驳回申请\同意接收
export function revokeAndReceive (data, fn) {
  const resetData = setData(data)
  postRequest('/follow/audit/move', resetData, (res) => {
    fn(res)
  })
}
// 撤回申请
export function postRevoke (data, fn) {
  const resetData = setData(data)
  postRequest('/follow/move/revoke', resetData, (res) => {
    fn(res)
  })
}
