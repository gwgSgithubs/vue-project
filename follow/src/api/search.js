import {getRequest} from './http'
import {storage} from 'common/js/common'
function setData (data) {
  let reSetData = Object.assign({}, storage('loginData'), data)
  return reSetData
}
// 获取我的任务数据
export function getSearchData (url, data, fn) {
  const resetData = setData(data)
  getRequest(`/terminal/me/${url}`, resetData, (res) => {
    fn(res)
  })
}
