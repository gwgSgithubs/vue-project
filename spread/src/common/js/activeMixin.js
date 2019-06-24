import {ERR_OK, baseUrl} from 'api/config'
import {
  getActiveCharge,
  getCountUserNum,
  getActiveVideoList,
  getLabelsList,
  changeIsAnswer,
  changeDefault,
  getVideoData,
  removeActiveData,
  publishActiveAndSave,
  updateCommision,
  setTop,
  setUpDown
} from 'api/active'
import {storage, reSetActiveVideoList} from 'common/js/common'
import {activeCofg} from 'common/js/config'
// ACTIVE
export const activeMixin = {
  inject: ['reload'],
  data () {
    return {
      // 默认全部
      isAll: 'All',
      // 2 全部 1 默认
      type: 2,
      updateData: storage('requestData'),
      updateCoverUrl: `${baseUrl}/templet/updateCoverUrl`,
      // isMapShow: false,
      activeVideoList: null,

      // 视频数据id
      videoId: null,
      // 活动id
      activityId: null,
      // 活动可支持看视频的人数
      num: null,
      // 每位用户最多可领的金额
      totalCommission: null,
      // 覆盖区域
      distance: null,
      // 纬度
      latitude: null,
      // 经度
      longitude: null,
      // 地址
      positionAddress: null,
      // 活动封面
      actCover: '',
      // 负责人
      person: [],
      // 开始时间
      startTime: null,
      // 结束时间
      endTime: null,
      // 活动总额
      amount: null,
      // 活动网址
      actUrl: null,
      // 活动标题
      actTitle: null,
      // 活动描述
      actDesc: null,
      // 限时内完成奖励
      limitHour: null,
      // 限时内完成奖励 - 金额
      limitAmount: null,
      // 额外奖励
      extraCondition: [],
      // 额外奖励 - 金额
      extraAmount: null,
      // 额外视频佣金统一定价
      extraCommmission: null,
      // 用户任务存留期限
      mandate: null,
      // 默认任务数量
      taskCount: null,
      // 用户额外任务数量
      taskExtra: null,
      // 无效时段
      nightMaintenanceTime1: null,
      nightMaintenanceTime2: null,
      nightMaintenanceTime3: null,
      // 支持其他服务器发现
      isFound: true,

      // 标签分类
      labelId: null,
      // 搜索内容
      title: null,

      // 覆盖区域
      distanceList: null,
      // 举报提醒方式
      remindingList: null,
      // 限时内完成奖励
      limitHourList: null,
      // 限时内完成奖励 - 金额
      limitAmountList: null,
      // 额外奖励
      extraConditionList: null,
      // 额外奖励 - 金额
      extraAmountList: null,
      // 支持其他服务器发现
      isFoundList: null,
      // 活动总金额
      amountList: null,
      // 额外视频佣金统一定价
      extraCommmissionList: null,
      // 用户任务存留期限
      mandateList: null,
      // 默认任务数量
      taskCountList: null,
      // 用户额外任务数量
      taskExtraList: null,
      // 标签分类
      labelsList: null,
      // id责人
      personList: null
    }
  },
  created () {
    // 覆盖区域
    this.distanceList = activeCofg.distanceList
    // 举报提醒方式
    this.remindingList = activeCofg.remindingList
    // 限时内完成奖励
    this.limitHourList = activeCofg.limitHourList
    // 限时内完成奖励 - 金额
    this.limitAmountList = activeCofg.limitAmountList
    // 额外奖励
    this.extraConditionList = activeCofg.extraConditionList
    // 额外奖励 - 金额
    this.extraAmountList = activeCofg.extraAmountList
    // 活动总金额
    this.amountList = activeCofg.amountList
    // 额外视频佣金统一定价
    this.extraCommmissionList = activeCofg.extraCommmissionList
    // 用户任务存留期限
    this.mandateList = activeCofg.mandateList
    // 默认任务数量
    this.taskCountList = activeCofg.taskCountList
    // 获取负责人
    this._getActiveCharge()
  },
  methods: {
    // 向上 向下
    setToUpDown (item, action) {
      this.item = item
      this.showLoading()
      setUpDown({
        videoId: this.item.id,
        activityId: this.activityId,
        action
      }, res => {
        this.hideLoading()
        if (res.code === ERR_OK) {
          this._getActiveVideoList()
        }
        this.showMsg(res.msg)
      })
    },
    // 置顶
    setToTop (item) {
      this.item = item
      this.showLoading()
      setTop({
        videoId: this.item.id,
        activityId: this.activityId
      }, res => {
        this.hideLoading()
        if (res.code === ERR_OK) {
          this._getActiveVideoList()
        }
        this.showMsg(res.msg)
      })
    },
    initData (data) {
      this.activityId = data.id
      this.actCover = data.actCover
      // 覆盖区域
      this.distance = data.distance
      // 定位地址
      this.positionAddress = data.positionAddress
      this.longitude = data.longitude
      this.latitude = data.latitude
      this.startTime = data.startTime ? new Date(data.startTime) : null
      this.endTime = data.endTime ? new Date(data.endTime) : null
      this.amount = data.amount
      this.actUrl = data.actUrl

      data.person.forEach((v) => {
        this.person.push(v.id)
      })
      this.actTitle = data.actTitle
      this.actDesc = data.actDesc
      this.limitHour = data.limitHour
      this.limitAmount = data.limitAmount
      this.extraCondition = data.extraCondition.split(',')
      this.extraAmount = data.extraAmount
      this.extraCommmission = data.extraCommmission
      this.mandate = data.mandate
      this.taskExtra = data.taskExtra
      this.taskCount = data.taskCount
      data.nightMaintenanceTime.forEach((v, i) => {
        if (i === 0) {
          this.nightMaintenanceTime1 = v.startTime ? [new Date(v.startTime), new Date(v.endTime)] : null
        }
        if (i === 1) {
          this.nightMaintenanceTime2 = v.startTime ? [new Date(v.startTime), new Date(v.endTime)] : null
        }
        if (i === 2) {
          this.nightMaintenanceTime3 = v.startTime ? [new Date(v.startTime), new Date(v.endTime)] : null
        }
      })
      this.isFound = data.isFound
      //
      // 获取计算结果
      this._getCountUserNum()
      // 获取标签列表
      this._getLabelsList()
      // 获取视频列表
      this._getActiveVideoList()
    },
    getEndTime (time) {
      console.log(time)
      if (this.startTime) {
        if (this.startTime >= time) {
          this.showMsg('开始时间不能大于结束时间')
          this.endTime = null
        }
      }
    },
    getStartTime (time) {
      if (this.endTime) {
        if (time >= this.endTime) {
          this.showMsg('开始时间不能大于结束时间')
          this.startTime = null
        }
      }
    },
    // 确定
    promptSure (val) {
      updateCommision({
        videoId: this.item.id,
        activityId: this.activityId,
        commission: val
      }, res => {
        this.hidePrompt()
        this.hideLoading()
        if (res.code === ERR_OK) {
          this._getActiveVideoList()
          this._getCountUserNum()
        }
        this.showMsg(res.msg)
      })
    },
    // 修改佣金
    changeCommission (item) {
      this.showPrompt()
      this.item = item
    },
    // 统一佣金定价
    changeExtraCommmission () {
      this._getCountUserNum()
      this._getActiveVideoList()
    },
    // 判断
    filterData (status) {
      if (!this.distance) {
        this.showAlert('请选择覆盖区域')
        return
      }
      if (!this.positionAddress) {
        this.showAlert('请选择定位地址')
        return
      }
      if (!this.startTime) {
        this.showAlert('请选择活动开始时间')
        return
      }
      if (!this.endTime) {
        this.showAlert('请选择活动结束时间')
        return
      }
      if (this.startTime >= this.endTime) {
        this.showAlert('活动开始时间必须小于活动结束时间')
        return
      }
      if (!this.amount) {
        this.showAlert('请选择活动总额')
        return
      }
      if (!this.actUrl) {
        this.showAlert('请填写活动网址')
        return
      }
      if (this.person.length === 0) {
        this.showAlert('请选择负责人')
        return
      }
      if (!this.actTitle) {
        this.showAlert('请填写活动标题')
        return
      }
      if (!this.actDesc) {
        this.showAlert('请填写活动描述')
        return
      }
      if (!this.limitHour) {
        this.showAlert('请选择限时内完成奖励时间')
        return
      }
      if (!this.limitAmount) {
        this.showAlert('请选择限时内完成奖励金额')
        return
      }
      if (this.extraCondition.length === 0) {
        this.showAlert('请选择额外奖励')
        return
      }
      if (!this.extraAmount) {
        this.showAlert('请选择额外奖励金额')
        return
      }
      if (!this.extraCommmission) {
        this.showAlert('请选择额外视频佣金统一定价')
        return
      }
      if (!this.mandate) {
        this.showAlert('请选择用户任务存留期限')
        return
      }
      if (!this.taskCount) {
        this.showAlert('请选择用户默认任务数量')
        return
      }
      if (!this.taskExtra) {
        this.showAlert('请选择用户额外任务数量')
        return
      }
      if (!this.actCover) {
        this.showAlert('请选择编辑封面')
        return
      }
      if (!this.nightMaintenanceTime1 && !this.nightMaintenanceTime2 && !this.nightMaintenanceTime3) {
        this.showAlert('至少选择一个无效时段')
        return
      }
      let timeArr = []
      if (!this.nightMaintenanceTime1) {
        timeArr.push({
          startTime: '',
          endTime: ''
        })
      } else {
        timeArr.push({
          startTime: new Date(this.nightMaintenanceTime1[0]).getTime(),
          endTime: new Date(this.nightMaintenanceTime1[1]).getTime()
        })
      }
      if (!this.nightMaintenanceTime2) {
        timeArr.push({
          startTime: '',
          endTime: ''
        })
      } else {
        timeArr.push({
          startTime: new Date(this.nightMaintenanceTime2[0]).getTime(),
          endTime: new Date(this.nightMaintenanceTime2[1]).getTime()
        })
      }
      if (!this.nightMaintenanceTime3) {
        timeArr.push({
          startTime: '',
          endTime: ''
        })
      } else {
        timeArr.push({
          startTime: new Date(this.nightMaintenanceTime3[0]).getTime(),
          endTime: new Date(this.nightMaintenanceTime3[1]).getTime()
        })
      }
      this.id = this.activityId
      let arr = []
      this.person.forEach((v, i) => {
        for (let j = 0; j < this.personList.length; j++) {
          if (v === this.personList[j].id) {
            arr.push(this.personList[j])
            break
          }
        }
      })
      let data = {
        id: this.activityId,
        status: status,
        distance: this.distance,
        positionAddress: this.positionAddress,
        startTime: new Date(this.startTime).getTime(),
        endTime: new Date(this.endTime).getTime(),
        amount: this.amount,
        person: JSON.stringify(arr),
        actUrl: this.actUrl,
        actTitle: this.actTitle,
        actDesc: this.actDesc,
        limitHour: this.limitHour,
        limitAmount: this.limitAmount,
        extraCondition: this.extraCondition.join(','),
        extraAmount: this.extraAmount,
        extraCommmission: this.extraCommmission,
        mandate: this.mandate,
        taskCount: this.taskCount,
        taskExtra: this.taskExtra,
        actCover: this.actCover,
        isFound: this.isFound,
        latitude: this.latitude,
        longitude: this.longitude,
        nightMaintenanceTime: JSON.stringify(timeArr)
      }
      this._publishActiveAndSave(data)
    },
    _publishActiveAndSave (data) {
      this.showLoading()
      publishActiveAndSave(data, res => {
        this.hideLoading()
        if (res.code === ERR_OK) {
          this.$router.go(-1)
          this.reload()
        }
        this.showMsg(res.msg)
      })
    },
    // 发布活动
    publishActive () {
      this.filterData(2)
    },
    // 保存到未发布
    saveInPublish () {
      this.filterData(1)
    },
    // 取消
    cancelActive () {
      this.$router.push({
        path: '/acList'
      })
    },
    //
    changeCountUserNum () {
      this._getCountUserNum()
    },
    // 移除活动
    removeActive (item) {
      this.showLoading()
      removeActiveData({
        videoId: item.id,
        activityId: this.activityId
      }, res => {
        this.hideLoading()
        if (res.code === ERR_OK) {
          this._getActiveVideoList()
          this._getCountUserNum()
        }
        this.showMsg(res.msg)
      })
    },
    // 视频预览
    previewVideo (item) {
      getVideoData(item.id, {}, res => {
        if (res.code === ERR_OK) {
          this.videoItem = res.data
        }
      })
      this.isPreview = true
    },
    // 设置是否为默认
    setDefault (item, action) {
      // console.log(item)
      this.item = item
      this.showLoading()
      changeDefault({
        activityId: this.activityId,
        videoId: this.item.id,
        taskCount: this.taskCount,
        commission: this.extraCommmission,
        action
      }, res => {
        this.hideLoading()
        if (res.code === ERR_OK) {
          this._getActiveVideoList()
          this._getCountUserNum()
        }
        this.showMsg(res.msg)
      })
    },
    // 确认修改答题
    confirmSure () {
      this.closeConfirm()
      this.showLoading()
      changeIsAnswer({
        isNeedAnswer: !this.item.isAnswer,
        videoId: this.item.id,
        activityId: this.activityId
      }, res => {
        this.hideLoading()
        if (res.code === ERR_OK) {
          this._getActiveVideoList()
        }
        this.showMsg(res.msg)
      })
    },
    // 是否答题
    changeAnswer (item) {
      this.item = item
      let noticeTxt = item.isAnswer ? '不' : '需要'
      this.showConfirm(`确定设置为${noticeTxt}答题吗？`)
    },
    // 标签分类
    changeLabel () {
      // this.getVidelList()
      this._getActiveVideoList()
    },
    //
    getVidelList (arg) {
      console.log(arg)
      this.isAll = arg
      if (arg === 'All') {
        this.type = 2
        // 全部视频
      } else if (arg === 'def') {
        // 默认视频
        this.type = 1
        this.labelId = null
        this.title = null
      }
      this._getActiveVideoList()
      this.isAll = arg
    },
    // 获取地址
    getAddress (val) {
      console.log(val)
      this.latitude = val.latitude
      this.longitude = val.longitude
      this.positionAddress = val.positionAddress
      this.isMapShow = false
    },
    // 搜索地址
    searchAddress () {
      this.isMapShow = true
    },
    // 获取负责人
    _getActiveCharge () {
      getActiveCharge({}, res => {
        console.log(res.data)
        if (res.code === ERR_OK) {
          this.personList = res.data
        }
      })
    },
    // 获取标签列表
    _getLabelsList () {
      getLabelsList({
        activityId: this.activityId
      }, res => {
        if (res.code === ERR_OK) {
          console.log(res)
          this.labelsList = res.data
          this.totalElements = res.data.totalElements
        }
      })
    },
    // 获取视频列表
    _getActiveVideoList () {
      this.showLoading()
      getActiveVideoList({
        page: this.page,
        size: this.size,
        commission: this.extraCommmission,
        activityId: this.activityId,
        labelId: this.labelId,
        title: this.title,
        type: this.type
      }, res => {
        this.hideLoading()
        if (res.code === ERR_OK) {
          this.activeVideoList = reSetActiveVideoList(res.data.content)
          this.totalElements = res.data.totalElements
        }
      })
    },
    // 获取计算结果
    _getCountUserNum () {
      getCountUserNum({
        activityId: this.activityId,
        amount: this.amount,
        taskCount: this.taskCount,
        taskExtra: this.taskExtra,
        extraCommmission: this.extraCommmission,
        extraAmount: this.extraAmount,
        extraCondition: this.extraCondition.join(','),
        limitAmount: this.limitAmount
      }, res => {
        if (res.code === ERR_OK) {
          console.log(res)
          this.num = res.data.num
          this.totalCommission = res.data.totalCommission
        }
      })
    },
    handleCurrentChange (val) {
      this.page = val
      this.currentPage = val
      this._getActiveVideoList()
    },
    handleSizeChange (val) {
      this.size = val
      this._getActiveVideoList()
    },
    // 上传失败
    handleActCoverError () {
      this.hideLoading()
      this.showMsg('图片上传失败')
    },
    // 上传成功
    handleActCoverSuccess (res, file) {
      this.hideLoading()
      if (res.code === ERR_OK) {
        this.actCover = res.data
        this.showMsg('图片上传成功')
      } else {
        this.showAlert(res.msg)
      }
    },
    // 上传图片之前
    beforeActCoverUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG && !isPNG) {
        this.showAlert('上传头像图片只能是 JPG或PNG 格式!')
        return false
      }
      if (!isLt2M) {
        this.showAlert('上传头像图片大小不能超过 2MB!')
        return false
      }
      this.showLoading('图片上传中...')
      return isLt2M
    }
  }
}
