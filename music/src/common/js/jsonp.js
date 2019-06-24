import originJsonp from 'jsonp'

export default function jsonp (url, data, option) {
  url += url.indexOf('?') < 0 ? '?' : '&' + param(data)
  return new Promise((resolve, reject) => {
    // url 需为已经拼接好的, 不能通过data自动传参
    originJsonp(url, option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

function param (data) {
  let url = ''
  for (let k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    url += `&${k}=${encodeURIComponent(value)}`
  }
  url = url ? url.substring(1) : ''
  return url
}
