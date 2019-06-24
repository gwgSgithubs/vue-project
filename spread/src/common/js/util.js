// 验证手机号码
export function phoneReg (arg) {
  const phone = parseInt(arg)
  const reg = /^(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[0-9]|16[0-9])[0-9]{8}$/
  let res = reg.test(phone)
  return res
}
// 格式化时间
export function formatDateTime (str) {
  if (!str) {
    return ''
  }
  let d = new Date(str)
  let y = d.getFullYear()
  let m = d.getMonth() + 1
  let dy = d.getDate()
  let h = d.getHours()
  let mi = d.getMinutes()
  let s = d.getSeconds()
  function dd (d) {
    if (d < 10) {
      d = '0' + d
    }
    return d
  }
  return y + '-' + dd(m) + '-' + dd(dy) + ' ' + dd(h) + ':' + dd(mi) + ':' + dd(s)
}
export function formatTime (str) {
  if (!str) {
    return ''
  }
  let d = new Date(str)
  let h = d.getHours()
  let mi = d.getMinutes()
  let s = d.getSeconds()
  function dd (d) {
    if (d < 10) {
      d = '0' + d
    }
    return d
  }
  return dd(h) + ':' + dd(mi) + ':' + dd(s)
}
// 去掉收尾空格
export function trim (str) {
  return str.replace(/(^\s*)|(\s*$)/g, '')
}
