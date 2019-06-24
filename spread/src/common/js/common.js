import {formatDateTime} from 'common/js/util'
export function storage (key, value) {
  if (!value) {
    // 获取存储值
    let str = localStorage.getItem(key)
    let result = JSON.parse(str)
    try {
      delete result.avatar
    } catch (err) {}
    return result
  }
  // 存储值
  let str = JSON.stringify(value)
  localStorage.setItem(key, str)
}
export function removeStorage (key) {
  localStorage.removeItem(key)
}

// 重新组合导航数据
export function reSetNavData (nav) {
  nav = nav.map((v) => {
    v.children.map((vi) => {
      vi.href = vi.href.split('.')[0] + `?id=${vi.id}`
      return vi
    })
    return v
  })
  return nav
}
// 重组活动列表数据
export function reSetActiveList (list) {
  // console.log(list)
  list.map((v, i) => {
    v.statusTxt = v.status === 1 ? '暂存' : v.status === 2 ? '发布' : v.status === 3 ? '强制停止' : '全部'
    v.endTime = formatDateTime(v.endTime)
    v.startTime = formatDateTime(v.startTime)
    v.updateTime = formatDateTime(v.updateTime)
    v.publishTime = formatDateTime(v.publishTime)
    v.head = ''
    JSON.parse(v.person).forEach((j) => {
      v.head += j.name
    })
    return v
  })
  return list
}
// 重组活动视频列表数据
export function reSetActiveVideoList (list) {
  list.map((v, i) => {
    v.labels = JSON.parse(v.labels)
    v.isAnswerTxt = v.isAnswer ? '是' : '否'
    v.switchClass = v.isAnswer ? 'active' : 'inactive'
  })
  return list
}
