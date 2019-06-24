import {getRequest, postRequest} from './http'
import {storage} from 'common/js/common'

function setData (data) {
  let reSetData = Object.assign({}, storage('loginData'), data)
  return reSetData
}
// 获取跟进信息数据 type: 2 \ 跟进历史 type: 3
export function getFollData (data, fn) {
  const resetData = setData(data)
  getRequest('/follow/pagination', resetData, (res) => {
    fn(res)
  })
}
// 保存跟进信息
export function savefollData (data, fn) {
  const resetData = setData(data)
  postRequest('/follow/user/follow', resetData, (res) => {
    fn(res)
  })
}
// 保存编辑信息
export function savefollRemark (data, fn) {
  const resetData = setData(data)
  postRequest('/follow/user/remark', resetData, (res) => {
    fn(res)
  })
}
