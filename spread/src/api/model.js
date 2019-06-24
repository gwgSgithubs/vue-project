import {getRequest, postRequest} from './http'
import {storage} from 'common/js/common'

function setData (data) {
  let reSetData = Object.assign({}, storage('requestData'), data)
  return reSetData
}
// 获取模板列表数据
export function getModelList (data, fn) {
  const resetData = setData(data)
  getRequest('/templet/listPagination', resetData, (res) => {
    fn(res)
  })
}
// 删除活动
export function deleteModelData (data, fn) {
  const resetData = setData(data)
  postRequest('/templet/remove', resetData, (res) => {
    fn(res)
  })
}
// 获取添加初始化数据
export function getModelAddInit (data, fn) {
  const resetData = setData(data)
  postRequest('/templet/init', resetData, (res) => {
    fn(res)
  })
}
// 获取负责人
export function getModelCharge (data, fn) {
  const resetData = setData(data)
  getRequest('/user/getSeniorAdmin', resetData, (res) => {
    fn(res)
  })
}
// 获取计算结果
export function getCountUserNum (data, fn) {
  const resetData = setData(data)
  getRequest('/templet/countUserNum', resetData, (res) => {
    fn(res)
  })
}
// 获取活动视频列表
export function getModelVideoList (data, fn) {
  const resetData = setData(data)
  getRequest('/templet/pagination/findByAll', resetData, (res) => {
    fn(res)
  })
}
// 获取标签列表
export function getLabelsList (data, fn) {
  const resetData = setData(data)
  getRequest('/templet/labels', resetData, (res) => {
    fn(res)
  })
}
// 是否答题
export function changeIsAnswer (data, fn) {
  const resetData = setData(data)
  postRequest('/templet/isAnswer', resetData, (res) => {
    fn(res)
  })
}
// 设置为默认
export function changeDefault (data, fn) {
  const resetData = setData(data)
  postRequest('/templet/default', resetData, (res) => {
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
export function removeModelData (data, fn) {
  const resetData = setData(data)
  postRequest('/templet/moveActivity', resetData, (res) => {
    fn(res)
  })
}
// 发布活动 保存到未发布
export function saveModelData (data, fn) {
  const resetData = setData(data)
  postRequest('/templet/save', resetData, (res) => {
    fn(res)
  })
}
// 修改佣金
export function updateCommision (data, fn) {
  const resetData = setData(data)
  postRequest('/templet/updateCommision', resetData, (res) => {
    fn(res)
  })
}
// 获取活动编辑的数据
export function getEditModelData (templetId, data, fn) {
  const resetData = setData(data)
  getRequest(`/templet/${templetId}/get`, resetData, (res) => {
    fn(res)
  })
}
// 保存到未发布
export function saveToNotPublish (data, fn) {
  const resetData = setData(data)
  postRequest('/activity/saveToNotPublish', resetData, (res) => {
    fn(res)
  })
}
// 复制模板
export function getCopyModelData (data, fn) {
  const resetData = setData(data)
  postRequest('/templet/copy', resetData, (res) => {
    fn(res)
  })
}
// 置顶
export function setTop (data, fn) {
  const resetData = setData(data)
  postRequest('/templet/top', resetData, (res) => {
    fn(res)
  })
}
// 向上 向下
export function setUpDown (data, fn) {
  const resetData = setData(data)
  postRequest('/templet/upOrDown', resetData, (res) => {
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
