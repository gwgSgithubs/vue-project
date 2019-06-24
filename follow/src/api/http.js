import axios from 'axios'
import qs from 'qs'
import _this from '@/router/index'
import {removeStorage} from 'common/js/common'
// axios  默认配置
axios.defaults.timeout = 10000
// 测试
axios.defaults.baseURL = '*********'
// 开发
// axios.defaults.baseURL = '*********'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'

// export default axios
export function postRequest (url, data, fn) {
  axios.post(url, qs.stringify(data)).then((res) => {
    fn(res.data)
  }).catch((err) => {
    fn(err)
  })
}
export function getRequest (url, data, fn) {
  axios.get(url, {params: data}).then((res) => {
    if (res.data.code === 457) {
      console.log(_this)
      console.log(res.data.code === 457)
      removeStorage('loginData')
      document.title = '用户登录'
      _this.push({
        path: '/login'
      })
    }
    fn(res.data)
  }).catch((err) => {
    fn(err)
  })
}
