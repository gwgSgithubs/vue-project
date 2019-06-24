import {getRequest} from './http'
import {storage} from 'common/js/common'

function setData (data) {
  let reSetData = Object.assign({}, storage('requestData'), data)
  return reSetData
}

export function getNavData (data, fn) {
  const resetData = setData(data)
  getRequest('/menu/menuPermission', resetData, (res) => {
    fn(res)
  })
}
