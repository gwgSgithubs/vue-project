import * as iconData from './iconData'
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
// 文字截断
export function ellis (str, nu) {
  let res = str.length > nu ? str.substr(0, nu) + '...' : str
  return res
}
// 历史记录数据重组
export function historyFormate (data) {
  let arr = []
  let moveObj = []
  data.forEach((v, i) => {
    let obj = [
      {
        sche: '第一阶段',
        title: '首次跟进',
        content: '无',
        styleClass: ''
      },
      {
        sche: '第二阶段',
        title: '邀约跟进',
        content: '无',
        styleClass: ''
      },
      {
        sche: '第三阶段',
        title: '决志初信',
        content: '无',
        styleClass: ''
      },
      {
        sche: '第四阶段',
        title: '成长洗礼',
        content: '无',
        styleClass: ''
      },
      {
        title: '跟进备注',
        sche: '',
        content: '无',
        styleClass: ''
      }
    ]
    if (v.remark) {
      obj[4].content = v.remark
      obj[4].styleClass = 'active'
    }
    v.followRecordInfo.forEach((vi, ii) => {
      obj[ii].content = vi.content
      obj[ii].styleClass = 'active'
    })
    if (v.move) { // 判断是否为 null
      v.move.creatTime = timeFormate(v.move.creatTime)
    } else {
      v.move = {}
    }
    moveObj.push(v.move)
    arr.push(obj)
    return v
  })
  // console.log(moveObj)
  return {arr, moveObj}
}
// 时间格式化
export function timeFormate (str, g = '/') {
  if (!str) {
    return
  }
  let d = new Date(str)
  let y = d.getFullYear()
  let m = d.getMonth() + 1
  let dy = d.getDate()
  let res = y + g + dd(m) + g + dd(dy)
  function dd (n) {
    if (n < 10) {
      return '0' + n
    }
    return n
  }
  return res
}
// 视频小图标格式化
export function tipIconFormateVideo (data) {
  let tipIcon = ''
  let statusText = ''
  let pushText = ''
  data.map((v, i, arr) => {
    statusText = ''
    pushText = ''
    switch (v.isdefault) {
      case '0': tipIcon = iconData.news
        break
      case '1': tipIcon = iconData.mo
        break
      case '2': tipIcon = iconData.tui
        break
    }
    if (v.isgetmoney === '1' || v.isanswer === '1') {
      statusText = '已完成'
    } else if (v.isanswer === '0' && v.isfinish === '1') {
      statusText = '待答题'
    } else if (v.isfinish === '0') {
      statusText = '未观看'
    }
    if (v.videocount > 1) {
      statusText = '多次观看'
    }
    if (v.isdefault === '2') {
      pushText = '推送成功'
    }
    v.pushText = pushText
    v.statusText = statusText
    v.tipIcon = tipIcon
    return v
  })
  return data
}
// 小图标格式化
export function tipIconFormate (data) {
  let tipIcon = ''
  data.map((v, i, arr) => {
    switch (v.status) {
      case 0: tipIcon = iconData.news
        break
      case 1: tipIcon = iconData.dai
        break
      case 2: tipIcon = iconData.mu
        break
      case 3: tipIcon = iconData.yao
        break
      case 4: tipIcon = iconData.xin
        break
      case 5: tipIcon = iconData.xi
        break
      // case 6: tipIcon = iconData.wan
      //   break
    }
    v.tipIcon = tipIcon
    return v
  })
  return data
}
export function tipIconFormateMove (data) {
  let tipIcon = ''
  let mstatusText = ''
  let classStyle = ''
  data.map((v, i, arr) => {
    if (v.mstatus === 1) { // 已接收
      mstatusText = '已接受'
      classStyle = 'disa'
    } else if (v.mstatus === 0) { // 未处理
      mstatusText = '未处理'
      classStyle = 'defa'
    } else if (v.mstatus === 2) { // 未处理
      mstatusText = '已撤回'
      classStyle = 'warn'
    } else if (v.mstatus === -1) { // 未处理
      if (v.sof === 'f') {
        mstatusText = '被驳回'
        classStyle = 'warn'
      } else {
        mstatusText = '已驳回'
        classStyle = 'warn'
      }
    }
    if (v.mstatus === 0) { // 未处理
      if (v.sof === 's') {
        tipIcon = iconData.shou
      } else {
        tipIcon = iconData.fa
      }
    } else { // 已接受 \ 被驳回
      if (v.sof === 's') {
        tipIcon = iconData.shoug
      } else {
        tipIcon = iconData.fag
      }
    }
    v.mstatusText = mstatusText
    v.classStyle = classStyle
    v.tipIcon = tipIcon
    return v
  })
  return data
}
// nav
const navlist = [
  {
    num: 0,
    status: '',
    step: '全部'
  },
  {
    num: 0,
    status: 1,
    step: '待跟进'
  },
  {
    num: 0,
    status: 2,
    step: '首次跟进'
  },
  {
    num: 0,
    status: 3,
    step: '邀约跟进'
  },
  {
    num: 0,
    status: 4,
    step: '决志跟进'
  },
  {
    num: 0,
    status: 5,
    step: '成长洗礼'
  }
]
export function navFormate (data) {
  for (let key in data) {
    switch (key) {
      case 'total': navlist[0].num = data[key]
        break
      case 'a': navlist[1].num = data[key]
        break
      case 'b': navlist[2].num = data[key]
        break
      case 'c': navlist[3].num = data[key]
        break
      case 'd': navlist[4].num = data[key]
        break
      case 'e': navlist[5].num = data[key]
        break
    }
  }
  return navlist
}
// 去掉空格
export function removeGap (str) {
  let res = str.replace(/(^\s*)|(\s*$)/g, '')
  return res
}
