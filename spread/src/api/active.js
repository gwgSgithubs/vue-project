import {getRequest, postRequest} from './http'
import {storage} from 'common/js/common'

function setData (data) {
  let reSetData = Object.assign({}, storage('requestData'), data)
  return reSetData
}
// 获取活动列表
export function getActiveList (data, fn) {
  const resetData = setData(data)
  getRequest('/activity/listPagination', resetData, (res) => {
    fn(res)
  })
}
// 删除活动
export function deleteActiveData (data, fn) {
  const resetData = setData(data)
  postRequest('/activity/remove', resetData, (res) => {
    fn(res)
  })
}
// 获取添加初始化数据
export function getActiveAddInit (data, fn) {
  const resetData = setData(data)
  postRequest('/activity/init', resetData, (res) => {
    fn(res)
  })
}
// 获取负责人
export function getActiveCharge (data, fn) {
  const resetData = setData(data)
  getRequest('/user/getSeniorAdmin', resetData, (res) => {
    fn(res)
  })
}
// 获取计算结果
export function getCountUserNum (data, fn) {
  const resetData = setData(data)
  getRequest('/activity/countUserNum', resetData, (res) => {
    fn(res)
  })
}
// 获取活动视频列表
export function getActiveVideoList (data, fn) {
  const resetData = setData(data)
  getRequest('/activity/pagination/findByAll', resetData, (res) => {
    fn(res)
  })
}
// 获取标签列表
export function getLabelsList (data, fn) {
  const resetData = setData(data)
  getRequest('/activity/labels', resetData, (res) => {
    fn(res)
  })
}
// 是否答题
export function changeIsAnswer (data, fn) {
  const resetData = setData(data)
  postRequest('/activity/isAnswer', resetData, (res) => {
    fn(res)
  })
}
// 设置为默认
export function changeDefault (data, fn) {
  const resetData = setData(data)
  postRequest('/activity/default', resetData, (res) => {
    fn(res)
  })
}
// 视频数据
export function getVideoData (id, data, fn) {
  const resetData = setData(data)
  getRequest(`/download/${id}/get`, resetData, (res) => {
    fn(res)
  })
}
// 移除活动
export function removeActiveData (data, fn) {
  const resetData = setData(data)
  postRequest('/activity/moveActivity', resetData, (res) => {
    fn(res)
  })
}
// 发布活动 保存到未发布
export function publishActiveAndSave (data, fn) {
  const resetData = setData(data)
  postRequest('/activity/save', resetData, (res) => {
    fn(res)
  })
}
// 修改佣金
export function updateCommision (data, fn) {
  const resetData = setData(data)
  postRequest('/activity/updateCommision', resetData, (res) => {
    fn(res)
  })
}
// 获取活动编辑的数据
export function getEditActiveData (activityId, data, fn) {
  const resetData = setData(data)
  getRequest(`/activity/${activityId}/get`, resetData, (res) => {
    fn(res)
  })
}
// 置顶
export function setTop (data, fn) {
  const resetData = setData(data)
  postRequest('/activity/top', resetData, (res) => {
    fn(res)
  })
}
// 向上 向下
export function setUpDown (data, fn) {
  const resetData = setData(data)
  postRequest('/activity/upOrDown', resetData, (res) => {
    fn(res)
  })
}
// 定制海报
export function getPoster (data, fn) {
  const resetData = setData(data)
  getRequest('/config/pic/getPath', resetData, (res) => {
    fn(res)
  })
}
