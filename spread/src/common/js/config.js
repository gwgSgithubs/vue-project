export const menuArr = [
  {
    href: '/home',
    title: '系统首页'
  },
  {
    href: '/acList',
    title: '活动列表'
  }
]

export const activeStatusListCofg = [
  {
    label: '全部',
    value: ''
  },
  {
    label: '暂存',
    value: 1
  },
  {
    label: '发布',
    value: 2
  },
  {
    label: '强制停止',
    value: 3
  }
]
export const activeCofg = {
  // 覆盖区域
  distanceList: [
    {
      value: '0',
      label: '全国范围'
    },
    {
      value: '0.5',
      label: '500m'
    },
    {
      value: '1',
      label: '1km'
    },
    {
      value: '5',
      label: '5km'
    }
  ],
  // 举报提醒方式
  remindingList: [
    {
      name: 'sys',
      value: 0,
      label: '系统提示'
    },
    {
      name: 'sms',
      value: 0,
      label: '短信'
    },
    {
      name: 'sms',
      value: 0,
      label: '短信'
    }
  ],
  // 限时内完成奖励
  limitHourList: [
    {
      value: 2,
      label: '2小时'
    },
    {
      value: 3,
      label: '3小时'
    },
    {
      value: 4,
      label: '4小时'
    },
    {
      value: 12,
      label: '12小时'
    },
    {
      value: 24,
      label: '24小时'
    }
  ],
  // 限时内完成奖励 - 金额
  limitAmountList: [
    {
      value: 1,
      label: '1元'
    },
    {
      value: 2,
      label: '2元'
    },
    {
      value: 3,
      label: '3元'
    },
    {
      value: 5,
      label: '5元'
    },
    {
      value: 7,
      label: '7元'
    }
  ],
  // 额外奖励 - 金额
  extraAmountList: [
    {
      value: 1,
      label: '1元'
    },
    {
      value: 2,
      label: '2元'
    },
    {
      value: 3,
      label: '3元'
    },
    {
      value: 5,
      label: '5元'
    },
    {
      value: 7,
      label: '7元'
    }
  ],
  // 支持其他服务器发现
  isFoundList: [
    {
      value: true,
      label: '是'
    },
    {
      value: false,
      label: '否'
    }
  ],
  // 活动总金额
  amountList: [
    {
      value: 500,
      label: '500 元'
    },
    {
      value: 1000,
      label: '1000 元'
    },
    {
      value: 2000,
      label: '2000 元'
    },
    {
      value: 5000,
      label: '5000 元'
    },
    {
      value: 10000,
      label: '10000 元'
    }
  ],
  // 额外视频佣金统一定价
  extraCommmissionList: [
    {
      value: 1,
      label: '1元'
    },
    {
      value: 2,
      label: '2元'
    },
    {
      value: 3,
      label: '3元'
    },
    {
      value: 5,
      label: '5元'
    }
  ],
  // 用户任务存留期限
  mandateList: [
    {
      value: 1,
      label: '1 天'
    },
    {
      value: 3,
      label: '3 天'
    },
    {
      value: 5,
      label: '5 天'
    },
    {
      value: 7,
      label: '7 天'
    }
  ],
  // 默认任务数量
  taskCountList: [
    {
      value: 3,
      label: '3'
    },
    {
      value: 4,
      label: '4'
    },
    {
      value: 5,
      label: '5'
    }
  ],
  // 用户额外任务数量
  taskExtraList: [
    {
      value: 1,
      label: '1'
    },
    {
      value: 2,
      label: '2'
    },
    {
      value: 5,
      label: '5'
    }
  ],
  // 无效时段
  nightMaintenanceTime: [
    {
      endTime: null,
      startTime: null
    },
    {
      endTime: null,
      startTime: null
    },
    {
      endTime: null,
      startTime: null
    }
  ],
  // 额外奖励
  extraConditionList: [
    {
      value: '0',
      name: '看完所有视频'
    },
    {
      value: '1',
      name: '提交问卷'
    }
  ]
}
