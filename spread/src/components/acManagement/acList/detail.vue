<template lang="html">
  <div class="">
    <pop-wrap title="活动详情" :isShow="true" height="800px" width="1360px" @closePop="closePop">
      <div class="bak-white act-card">
        <div class="tit-box">
          <div class="tit">
            基础信息
          </div>
        </div>
        <el-row class="">
          <el-col :xl="12" :lg="24">
            <el-row>
              <el-col :xl="6" :lg="6">
                <div class="low-box">
                  <div class="se-box">
                    <span class="f100 lab">覆盖区域:</span>
                    <div class="txt-box">{{distance}}</div>
                  </div>
                </div>
                <div class="low-box">
                  <div class="se-box">
                    <span class="f100 lab">活动网址: </span>
                    <div class="txt-box">{{actUrl}}</div>
                  </div>
                </div>
                <div class="low-box">
                  <div class="se-box">
                    <span class="f100 lab">活动标题: </span>
                    <div class="txt-box">{{actTitle}}</div>
                  </div>
                </div>
                <div class="low-box">
                  <div class="se-box">
                    <span class="f100 lab">活动描述: </span>
                    <div class="txt-box">{{actDesc}}</div>
                  </div>
                </div>
              </el-col>
              <el-col :xl="6" :lg="6">
                <div class="low-box">
                  <div class="se-box">
                    <span class="f100 lab">定位地址:</span>
                    <div class="txt-box">{{positionAddress}}</div>
                  </div>
                </div>
                <div class="low-box">
                  <div class="se-box">
                    <span class="f100 lab">负责人:</span>
                    <div class="txt-box">{{person}}</div>
                  </div>
                </div>
              </el-col>
              <el-col :xl="4" :lg="4">
                <div class="low-box">
                  <div class="se-box block">
                    <span class="lab">编辑封面:</span>
                    <div class="img-box">
                      <img :src="actCover" alt="">
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :xl="4" :lg="4" v-if="status === 2">
                <div class="low-box">
                  <div class="se-box block">
                    <span class="f100 lab">活动二维码:</span>
                    <div class="img-box">
                      <img :src="qrImg" alt="">
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :xl="4" :lg="4" v-if="status === 2">
                <div class="low-box">
                  <div class="se-box">
                    <span class="alisf-start lab">尺寸:</span>
                    <div class="size-box">
                      <el-radio v-model="size" label="0" class="block">小号(个人文件）</el-radio>
                      <el-radio v-model="size" label="1" class="block">中号(PPT）</el-radio>
                      <el-radio v-model="size" label="2" class="block">大号(海报张贴）</el-radio>
                      <button class="r-button primary small" @click="madePoster">定制海报</button>
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>

          </el-col>
        </el-row>
      </div>
      <div class="bak-white act-card pt10">
        <div class="tit-box">
          <div class="tit">
            活动规则
          </div>
        </div>
        <el-row class="">
          <el-col :xl="12" :lg="24">
            <el-row>
              <el-col :xl="12" :lg="12">
                <div class="low-box">
                  <div class="se-box">
                    <span class="f100 lab">开始时间:</span>
                    <div class="txt-box">{{startTime}}</div>
                  </div>
                  <div class="se-box">
                    <span class="f100 lab">无效时段1:</span>
                    <div class="txt-box">{{nightMaintenanceTime1}}</div>
                  </div>
                </div>
                <div class="low-box">
                  <div class="se-box">
                    <span class="f100 lab">结束时间:</span>
                    <div class="txt-box">{{endTime}}</div>
                  </div>
                  <div class="se-box">
                    <span class="f100 lab">无效时段2:</span>
                    <div class="txt-box">{{nightMaintenanceTime2}}</div>
                  </div>
                </div>
                <div class="low-box">
                  <div class="se-box">
                    <span class="f100 lab">额外奖励:</span>
                    <div class="txt-box">{{extraCondition}} - {{extraAmount}}</div>
                  </div>
                  <div class="se-box">
                    <span class="f100 lab">无效时段3:</span>
                    <div class="txt-box">{{nightMaintenanceTime3}}</div>
                  </div>
                </div>
              </el-col>
              <el-col :xl="12" :lg="12">
                <div class="low-box">
                  <div class="se-box">
                    <span class="f180 lab">用户任务存留期限:</span>
                    <div class="txt-box">{{mandate}}</div>
                  </div>
                  <div class="se-box">
                    <span class="f180 lab">额外视频佣金统一定价:</span>
                    <div class="txt-box">{{extraCommmissionTxt}}</div>
                  </div>
                </div>
                <div class="low-box">
                  <div class="se-box">
                    <span class="f180 lab">用户默认任务数量:</span>
                    <div class="txt-box">{{taskCount}}</div>
                  </div>
                  <div class="se-box">
                    <span class="f180 lab">限时内完成奖励:</span>
                    <div class="txt-box">{{limitHour}} - {{limitAmount}}</div>
                  </div>
                </div>
                <div class="low-box">
                  <div class="se-box">
                    <span class="f180 lab">用户额外任务数量:</span>
                    <div class="txt-box">{{taskExtra}}</div>
                  </div>
                  <div class="se-box">
                    <span class="f180 lab">支持其他服务器发现:</span>
                    <div class="txt-box">{{isFound}}</div>
                  </div>
                </div>
                <div class="low-box">
                  <div class="se-box"></div>
                  <div class="se-box">
                    <span class="f180 lab">活动总金额:</span>
                    <div class="txt-box">{{amount}}</div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
      <div class="bak-white act-card pt10">
        <el-row :gutter="50" class="input-h28">
          <el-col :xl="24" :lg="24">
            <div class="tab-box">
              <div class="tab-item">
                <ul>
                  <li :class="{'active': isAll === 'All'}" @click="getVidelList('All')">全部视频</li>
                  <li :class="{'active': isAll === 'def'}" @click="getVidelList('def')">默认推送</li>
                </ul>
              </div>
              <div class="low-box js-end pb0">
                <div class="se-box" v-if="isAll === 'All'">
                  <span class="f100 lab">标签分类:</span>
                  <div class="ipt-box">
                    <el-select v-model="labelId" placeholder="请选择" @change="changeLabel">
                      <el-option
                        v-for="item in labelsList"
                        :key="item.id"
                        :label="item.labelName"
                        :value="item.id">
                      </el-option>
                    </el-select>
                  </div>
                </div>
                <div class="se-box">
                  <div class="ipt-box" v-if="isAll === 'All'">
                    <el-input placeholder="请输入内容" v-model="title" class="input-with-select">
                      <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                  </div>
                </div>
              </div>
            </div>
            <div class="table-box">
              <el-table
                ref="tabList"
                :data="activeVideoList"
                border
                stripe
                tooltip-effect="dark"
                style="width: 100%">
                <el-table-column
                  prop="actCode"
                  align="center"
                  label="视频">
                  <template slot-scope="scope">
                    <div class="table-sub">
                      <div class="table-sub-avatar">
                        <img :src="scope.row.coverUrl" alt="">
                      </div>
                      <div class="table-sub-content">
                        <div class="table-subtit-box">
                          <div class="table-sub-tit">
                            {{scope.row.title}}
                          </div>
                          <div class="table-sub-btn">
                            <button class="r-button table-btn-tab" v-for="(item, index) in scope.row.labels" :key="index" v-if="index < 3">{{item.labelName}}</button>
                          </div>
                        </div>
                        <div class="table-sub-intro">
                          简介：{{scope.row.info}}
                        </div>
                        <div class="table-sub-viewed">
                          <i class="el-icon-time"></i>
                          <span>{{scope.row.readCount}}</span>
                        </div>
                      </div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  v-if="isAll === 'def'"
                  prop="actName"
                  align="center"
                  width="80"
                  label="佣金">
                  <template slot-scope="scope">
                    <span class="color-red">￥{{scope.row.commission}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="status"
                  align="center"
                  label="操作"
                  show-overflow-tooltip>
                  <template slot-scope="scope">
                    <div class="status-box">
                      <button class="r-button table-btn-op table-btn-info" @click="previewVideo(scope.row)"><i class="icon iconfont icon-hexingyulan"></i><span>视频预览</span></button>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="paginater-box txt-right">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                prev-text="上一页"
                next-text="下一页"
                :current-page="currentPage"
                :page-sizes="pageSizes"
                :page-size="sizeNum"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalElements">
              </el-pagination>
            </div>
          </el-col>
        </el-row>
      </div>
    </pop-wrap>
    <m-poster :isShow="isPoster" :imgUrl="imgUrl" :qrUrl="qrImg" @changePictrue="changePictrue" @savePictrue="savePictrue"></m-poster>
    <m-loading :isShow="isloading" :loadingTxt="loadingTxt"></m-loading>
    <preview-video :isShow="isPreview" :videoItem="videoItem" @closePreview="closePreview"></preview-video>
  </div>
</template>

<script>
import popWrap from 'base/pop-wrap/pop-wrap'
import MPoster from 'base/poster/poster'
import {ERR_OK, baseUrl} from 'api/config'
import {activeCofg} from 'common/js/config'
import {reSetActiveVideoList, storage} from 'common/js/common'
import {formatDateTime, formatTime} from 'common/js/util'
import {tableAndPaginater, loadingMixin, previewVideoMixin} from 'common/js/mixin'
import {getActiveVideoList, getLabelsList, getEditActiveData, getActiveCharge, getVideoData, getPoster} from 'api/active'
export default {
  mixins: [tableAndPaginater, loadingMixin, previewVideoMixin],
  data () {
    return {
      isPoster: false,
      imgUrl: '',
      seq: 0,
      size: '1',
      qrImg: '',
      status: null,
      // 默认全部
      isAll: 'All',
      // 2 全部 1 默认
      type: 2,
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
      extraCommmissionTxt: null,
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
      // 标签分类
      labelsList: null
    }
  },
  created () {
    // 获取负责人
    this._getActiveCharge()
    // 获取数据
    this._getEditActiveData(this.$route.params.id)
  },
  methods: {
    // 保存图片
    savePictrue () {
      this.showLoading('保存中...')
      let requestData = storage('requestData')
      let savePosterUrl = ''
      for (let key in requestData) {
        savePosterUrl += `&${key}=${requestData[key]}`
      }
      window.location.href = `${baseUrl}/activity/generatingPoster?id=${this.activityId}&size=${this.size}&index=${this.seq}+ ${savePosterUrl}`
      this.hideLoading()
    },
    // 换一张
    changePictrue () {
      this.showLoading('更换中...')
      getPoster({seq: this.seq}, res => {
        this.hideLoading()
        if (res.code === ERR_OK) {
          // 初始化数据
          console.log(res.data.path)
          this.imgUrl = res.data.path
          this.seq = res.data.seq
        } else {
          this.showAlert(res.msg)
        }
      })
    },
    // 定制海报
    madePoster () {
      this.isPoster = true
      this.showLoading('生成中...')
      getPoster({seq: this.seq}, res => {
        this.hideLoading()
        if (res.code === ERR_OK) {
          // 初始化数据
          console.log(res.data.path)
          this.imgUrl = res.data.path
          this.seq = res.data.seq
        } else {
          this.showAlert(res.msg)
        }
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
    handleCurrentChange (val) {
      this.page = val
      this.currentPage = val
      this._getActiveVideoList()
    },
    handleSizeChange (val) {
      this.sizeNum = val
      this._getActiveVideoList()
    },
    // 标签分类
    changeLabel () {
      // this.getVidelList()
      this._getActiveVideoList()
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
    // 获取初始数据
    _getEditActiveData (activityId) {
      this.showLoading()
      getEditActiveData(activityId, {}, res => {
        this.hideLoading()
        if (res.code === ERR_OK) {
          // 初始化数据
          this.initData(res.data)
        } else {
          this.showAlert(res.msg)
        }
      })
    },
    initData (data) {
      this.qrImg = `${baseUrl}/activity/${data.id}/qrcode?`
      let requestData = storage('requestData')
      for (let key in requestData) {
        this.qrImg += `${key}=${requestData[key]}&`
      }
      this.qrImg = this.qrImg.slice(0, this.qrImg.length - 1)
      this.status = data.status
      this.activityId = data.id
      // 模板ID
      this.actCover = data.actCover
      this.distance = activeCofg.distanceList.filter((v, i) => {
        return data.distance === v.value
      })[0].label
      this.positionAddress = data.positionAddress.length > 12 ? data.positionAddress.slice(0, 10) + '...' : data.positionAddress
      this.longitude = data.longitude
      this.latitude = data.latitude
      this.startTime = formatDateTime(data.startTime)
      this.endTime = formatDateTime(data.endTime)
      this.amount = data.amount + '元'
      this.actUrl = data.actUrl || '无'
      data.person.forEach((v) => {
        this.person.push(v.nickName)
      })
      this.person = this.person.join(',')
      this.actTitle = data.actTitle
      this.actDesc = data.actDesc
      this.limitAmount = data.limitAmount + '元'
      let extraConditionArr = []
      data.extraCondition.split(',').forEach((v, i) => {
        activeCofg.extraConditionList.forEach((iv, i) => {
          if (v === iv.value) {
            extraConditionArr.push(iv.name)
          }
        })
      })
      this.extraCondition = extraConditionArr.join(',')
      this.extraAmount = data.extraAmount + '元'
      this.extraCommmissionTxt = data.extraCommmission + '元'
      this.extraCommmission = data.extraCommmission
      this.mandate = data.mandate + '天'
      this.taskExtra = data.taskExtra + '个'
      this.taskCount = data.taskCount + '个'
      data.nightMaintenanceTime.forEach((v, i) => {
        if (i === 0) {
          this.nightMaintenanceTime1 = v.startTime ? [formatTime(new Date(v.startTime)), formatTime(new Date(v.endTime))].join(' - ') : '无'
        }
        if (i === 1) {
          this.nightMaintenanceTime2 = v.startTime ? [formatTime(new Date(v.startTime)), formatTime(new Date(v.endTime))].join(' - ') : '无'
        }
        if (i === 2) {
          this.nightMaintenanceTime3 = v.startTime ? [formatTime(new Date(v.startTime)), formatTime(new Date(v.endTime))].join(' - ') : '无'
        }
      })
      this.isFound = data.isFound ? '是' : '否'

      // 限时内完成奖励
      this.limitHour = data.limitHour + '小时'
      // 获取标签列表
      this._getLabelsList()
      // 获取视频列表
      this._getActiveVideoList()
    },
    // 获取标签列表
    _getLabelsList () {
      getLabelsList({
        activityId: this.activityId
      }, res => {
        if (res.code === ERR_OK) {
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
    // 关闭弹框
    closePop () {
      this.$router.push({
        path: '/acList'
      })
    }
  },
  components: {
    popWrap,
    MPoster
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/theme'
.act-card
  padding: 20px 35px 0
.search
  margin: 0 0 0 12px
//
.table-sub
  display: flex
  align-items: center
  overflow: hidden
  .table-sub-content
    width: calc(100% - 137px)
    text-align: left
  .table-sub-avatar
    width: 106px
    height: 68px
    flex: 0 0 122px
    border-radius: 4px
    overflow: hidden
    background-color: #E5E5E5
    margin-right: 15px
    img
      width: 100%
      height: 100%
  .table-subtit-box
    display: flex
    align-items: center
  .table-sub-tit
    font-size: 18px
    color: #333
    font-weight: bolder
    margin-right: 10px
    white-space: nowrap
  .table-sub-intro
    width: 100%
    overflow: hidden
    text-overflow: ellipsis
    white-space: nowrap
    font-size: 16px
    color: #666
  .table-sub-viewed
     font-size: 14px
     color: #999
   .table-sub-btn
     display: flex
.se-box
  flex: 1
.tab-box
  padding-top: 0
.act-card .low-box
  padding-bottom: 5px
.table-box
  height: 255px
  overflow-y: auto
.act-card .low-box .se-box .txt-box
  color: $light
.img-box
  width: 120px
  height: 120px
  border: 1px solid $disabled
  margin-left: 30px
  margin-top: 10px
  img
    width: 120px
    height: 120px
.size-box
  margin-top: 26px
  margin-left: -20px
  .block
    margin-bottom: 15px
.status-box
  display: flex
  justify-content: center
</style>
