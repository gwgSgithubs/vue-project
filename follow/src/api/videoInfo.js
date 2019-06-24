import {getRequest, postRequest} from './http'
import {storage} from 'common/js/common'

function setData (data) {
  let reSetData = Object.assign({}, storage('loginData'), data)
  return reSetData
}
// 获取视频数据
export function getVideoInfo (data, fn) {
  const resetData = setData(data)
  getRequest('/terminal/user/videoInfoes', resetData, (res) => {
    fn(res)
  })
}
// 获取推送视频数据
export function getPushVideo (data, fn) {
  const resetData = setData(data)
  getRequest('/follow/push/pagination/findByAll', resetData, (res) => {
    fn(res)
  })
}
// 视频类别
export function getVideoType (data, fn) {
  const resetData = setData(data)
  getRequest('/dictionary/dic/list', resetData, (res) => {
    fn(res)
  })
}
// 视频标签
export function getVideoLabel (data, fn) {
  const resetData = setData(data)
  getRequest('/label/list/findByAll', resetData, (res) => {
    fn(res)
  })
}
// 取消\推送视频
export function postPushVideo (data, fn) {
  const resetData = setData(data)
  postRequest('/follow/push/post', resetData, (res) => {
    fn(res)
  })
}
