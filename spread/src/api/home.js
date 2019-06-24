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
export function getCostStatus (data, fn) {
  const resetData = setData(data)
  getRequest('/index/main', resetData, (res) => {
    fn(res)
  })
}
export function getStatiscActivity (data, fn) {
  const resetData = setData(data)
  getRequest('/index/statiscActivity', resetData, (res) => {
    fn(res)
  })
}
export function getChurch (data, fn) {
  const resetData = setData(data)
  getRequest('/index/church/get', resetData, (res) => {
    fn(res)
  })
}
