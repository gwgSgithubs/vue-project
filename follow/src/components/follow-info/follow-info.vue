<template lang="html">
  <div class="follow-info">
    <div class="" v-show="methodName !== 'm'">
      <div class="top">
        <span @click="follHistory">跟进历史</span>
      </div>
      <scroll class="bottom" :class="{'set-bot': setBot}">
        <div>
          <div class="card" v-for="(item, index) in followData" :key="index">
            <div class="card-title" :class="{'disabled': index > currentIndex}">
              <div class="card-name">
                <span>{{item.sch}}</span>
                <span>{{item.title}}</span>
              </div>
              <div class="card-op" v-show="status !== 6">
                <i class="iconfont icon-baocun" v-show="isSave && currentIndex === index" @click="save(index)"></i>
                <i class="iconfont icon-wancheng" :class="{'grey': item.isFinish && !(isSave && currentIndex === index)}" v-show="item.isFinish !== null" @click="finish(index)"></i>
                <i class="iconfont icon-bianji" v-show="!item.isFinish && currentIndex === index" @click="edit(index)"></i>
              </div>
            </div>
            <div class="card-ipt">
              <textarea class="txt" placeholder="请输入内容(250)字以内" :disabled="item.disabled" v-model="item.content" maxlength="250"></textarea>
            </div>
          </div>

          <div class="card">
            <div class="card-title">
              <div class="card-name">
                跟进编辑
              </div>
              <div class="card-op">
                <i class="iconfont icon-baocun" v-show="!isRemark" @click="remarkSave"></i>
                <!-- <i class="iconfont icon-wancheng"></i> -->
                <i class="iconfont icon-bianji" v-show="isRemark" @click="remarkEdit"></i>
              </div>
            </div>
            <div class="card-ipt">
              <textarea class="txt" :disabled="isRemark" v-model="remark" placeholder="请输入内容(250)字以内" maxlength="250"></textarea>
            </div>
          </div>
          <div class="tip">
            <span>最新编辑时间：{{latestTime}}</span>
            <span>申请人：{{applyName}}</span>
          </div>
        </div>
      </scroll>
    </div>
    <!-- 移交历史记录 -->
    <scroll class="history" v-show="methodName === 'm'">
      <div class="">
        <div class="content">
          <div class="tab">
            <ul>
              <li :class="{'active': index === tabIndexDis}" v-for="(item, index) in tabDis" :key="index" v-show="index <= tabLenDis" @click="changeTab(index)">{{item}}</li>
            </ul>
          </div>
          <div class="container">
            <div class="tab-main" v-for="(list, listIndex) in historyListDis" :key="listIndex" v-show="listIndex === contentIndexDis">
              <div class="tab-wrap" v-for="(item, index) in list" :key="index">
                <div class="name" :class="{'active': item.styleClass}">
                  <span>{{item.sche}}</span>
                  <span>{{item.title}}</span>
                </div>
                <p class="remark">{{item.content}}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="tip" v-for="(item, index) in moveListDis" :key="index" v-show="moveIndexDis === index">
        <span>移交时间：{{item.creatTime || '无'}}</span>
        <span>申请人：{{item.nickName || '无'}}</span>
      </div>
      </div>
    </scroll>
    <follow-history
      @close="close"
      :show="showHistory"
      :historyList="historyList"
      :moveList="moveList"
      :tabLen="historyLen"
    ></follow-history>
    <msg :show="msgShow" :msg="msgTit"></msg>
    <loading :show="loadingShow" :title="loadingTit"></loading>
  </div>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import FollowHistory from 'components/follow-history/follow-history'
import {storage, timeFormate, historyFormate} from 'common/js/common'
import {ERR_OK, TIME_LIMIT} from 'api/config'
import {getFollData, savefollData, savefollRemark} from 'api/followInfo'
import Msg from 'base/msg/msg'
import Loading from 'base/loading/loading'
export default {
  data () {
    return {
      status: null,
      historyListDis: [], // 移交历史记录列表
      moveListDis: [], // 移交历史记录申请人
      tabLenDis: 3, // 移交历史记录tab
      tabIndexDis: 0,
      tabDis: ['当前', '历史1', '历史2', '历史3'],
      contentIndexDis: 0,
      moveIndexDis: 0,
      setBot: false,
      methodName: null,
      loadingTit: '', // 加载文本
      loadingShow: false,
      msgTit: '', //
      msgShow: false,
      showHistory: false,
      historyLen: 0,
      historyList: [],
      moveList: [],
      openid: null,
      isSave: false,
      isEdit: false,
      isRemark: true,
      applyName: null,
      remark: null,
      currentIndex: 0,
      latestTime: '',
      followId: null,
      followData: [
        {
          sch: '第一阶段',
          title: '***',
          disabled: true,
          content: '',
          isFinish: null
        },
        {
          sch: '第二阶段',
          title: '***',
          disabled: true,
          content: '',
          isFinish: null
        },
        {
          sch: '第三阶段',
          title: '***',
          disabled: true,
          content: '',
          isFinish: null
        },
        {
          sch: '第四阶段',
          title: '***',
          disabled: true,
          content: '',
          isFinish: null
        }
      ]
    }
  },
  created () {
    this.status = storage('status')
    this.openid = storage('openid')
    this.methodName = storage('methodName')
    this.applyName = storage('loginData').username
    if (this.methodName === 'm') { // 我的移动
      this.setBot = true
    } else {
      this.setBot = false
    }
    // 获取跟进数据
    this._getFollData()
    // 获取跟进数据
    this._getFollHistoryData()
  },
  methods: {
    changeTab (index) {
      this.tabIndexDis = index
      this.contentIndexDis = index
      this.moveIndexDis = index
    },
    // 关闭历史记录
    close () {
      this.showHistory = false
    },
    // 跟进历史
    follHistory () {
      if (!this.historyLen) {
        this.msgShow = true
        this.msgTit = '历史记录为空'
        this.msgTimerFn()
        return
      }
      this.showHistory = true
    },
    msgTimerFn () {
      let timer = setTimeout(() => {
        clearTimeout(timer)
        this.msgShow = false
      }, TIME_LIMIT)
    },
    // 保存编辑
    remarkSave () {
      savefollRemark({followId: this.followId, remark: this.remark}, (res) => {
        if (res.code === ERR_OK) {
          this.isRemark = true
          this._getFollData()
        }
      })
    },
    // 编辑备注
    remarkEdit () {
      this.isRemark = false
    },
    // 保存
    save (index) {
      let content = this.followData[index].content
      let res = content.replace(/(^\s*)|(\s*$)/g, '')
      // let isFinish = this.followData[index].isFinish
      if (!res) {
        this.msgShow = true // 提示框显示
        this.msgTit = '内容不能为空'
        let timer = setTimeout(() => {
          this.msgShow = false
          clearTimeout(timer)
        }, TIME_LIMIT)
        return
      }
      // console.log(content)
      savefollData({status: 0, content: content, followId: this.followId}, (res) => {
        if (res.code === ERR_OK) {
          this.isSave = false
          this.isEdit = false
          this.followData[index].disabled = true
          this._getFollData()
        } else {
          this.msgShow = true // 提示框显示
          this.msgTit = res.msg
          let timer = setTimeout(() => {
            this.msgShow = false
            clearTimeout(timer)
          }, TIME_LIMIT)
        }
      })
    },
    // 完成
    finish (index) {
      let content = this.followData[index].content
      let res = content.replace(/(^\s*)|(\s*$)/g, '')
      // let isFinish = this.followData[index].isFinish
      if (!res) {
        this.msgShow = true // 提示框显示
        this.msgTit = '内容不能为空'
        let timer = setTimeout(() => {
          this.msgShow = false
          clearTimeout(timer)
        }, TIME_LIMIT)
        return
      }
      if (!this.isEdit) {
        console.log('Finish')
        return
      }
      savefollData({status: 1, content: content, followId: this.followId}, (res) => {
        if (res.code === ERR_OK) {
          this.isSave = false
          this.isEdit = false
          this.followData[index].disabled = true
          this._getFollData()
        } else {
          this.msgShow = true // 提示框显示
          this.msgTit = res.msg
          let timer = setTimeout(() => {
            this.msgShow = false
            clearTimeout(timer)
          }, TIME_LIMIT)
        }
      })
    },
    // 编辑
    edit (index) {
      this.isSave = true
      this.isEdit = true
      this.followData[index].disabled = false
      this.followData[index].isFinish = true
    },
    // 跟进记录
    _getFollData () {
      getFollData({openid: this.openid, type: 2}, (res) => {
        if (res.code === ERR_OK) {
          // console.log(res)
          let resDt = res.data
          let arr = []
          let setHisData = null
          let setHisMoveObj = null
          arr.push(resDt)
          let resetData = historyFormate(arr)
          setHisData = resetData.arr
          setHisMoveObj = resetData.moveObj
          this.moveListDis = [...setHisMoveObj, ...this.moveListDis]
          this.historyListDis = [...setHisData, ...this.historyListDis]
          let lenDis = this.moveListDis.length
          this.tabLenDis = (lenDis === 0 ? -1 : lenDis - 1)
          this.latestTime = timeFormate(resDt.latestTime, '/')
          this.followId = resDt.followId
          this.remark = resDt.remark
          let len = resDt.followRecordInfo.length
          if (len === 0) {
            return false
          }
          if (resDt.followRecordInfo[len - 1].isFinish) {
            this.currentIndex = len
          } else {
            this.currentIndex = len - 1
            this.isEdit = true
          }
          this.mergeData(resDt.followRecordInfo)
        } else {}
      })
    },
    // 跟进历史数据
    _getFollHistoryData () {
      getFollData({openid: this.openid, type: 3}, (res) => {
        if (res.code === ERR_OK) {
          let resDt = res.data
          let len = resDt.length
          let resetData = historyFormate(resDt)
          // this.historyLen = (len === 0 ? -1 : len - 1)
          this.historyLen = len
          this.historyList = resetData.arr
          this.moveList = resetData.moveObj
          // 移交历史记录
          this.moveListDis = [...this.moveListDis, ...this.moveList]
          this.historyListDis = [...this.historyListDis, ...this.historyList]
          let lenDis = this.moveListDis.length
          this.tabLenDis = (lenDis === 0 ? -1 : lenDis - 1)
        } else {}
      })
    },
    mergeData (data) {
      data.forEach((v, i) => {
        this.$set(this.followData, i, Object.assign({}, this.followData[i], v))
      })
      // console.log(this.followData)
    }
  },
  components: {
    Scroll,
    FollowHistory,
    Msg,
    Loading
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.grey
  color: #999
.history
  position: absolute
  left: 0
  right: 0
  top: 10px
  bottom: 60px
  overflow: hidden
  margin: auto
  .content
    b-radius(10px)
    background-color: $color-background
    padding: 0 10px 10px
    ul
      display: flex
      justify-content: space-around
      font-size: $font-size-medium
      border-bottom: 1px solid rgba(0, 0, 0, 0.1)
      li
        position: relative
        padding: 7px 20px
        text-align: center
        &.active
          color: $color-text-active
          &:after
            content: ''
            width: 90%
            height: 3px
            position: absolute
            left: 50%
            bottom: -1px
            transform: translate3d(-50%, 0, 0)
            background-color: $color-background-active
    .tab-wrap
      position: relative
      padding: 20px 12px
      &:after
        content: ''
        width: 100%
        height: 1px
        position: absolute
        left: 0
        bottom: 0
        border-bottom: 1px dashed $color-background-active
        opacity: 0.4
    .name
      position: relative
      margin-bottom: 10px
      color: $color-text-m
      font-size: $font-size-medium-x
      font-weight: bold
      &:after
        content: ''
        width: 2px
        height: 16px
        position: absolute
        left: -6px
        top: 4px
        b-radius(1px)
        background-color: #666
      &.active
        font-weight: bold
        color: $color-text-m
        &:after
          background-color: $color-background-active
    .remark
      font-size: $font-size-medium-s
      color: $color-text
.follow-info
  width: 100%
  height: 100%
  position: relative
.top
  span
    padding: 7px 0
  position: absolute
  left: -10px
  right: -10px
  z-index: 1
  text-align: right
  color: $color-text-sub
  font-size: $font-size-small
  padding: 10px
  background-color: $color-background
  /* box-shadow: 0 0 20px $color-background-df */
.bottom
  position: absolute
  top: 36px
  left: -10px
  right: -10px
  bottom: 0
  padding: 0 10px
  overflow: hidden
  &.set-bot
    bottom: 60px
    top: 0
  &>div
    padding-top: 10px
.card
  width: 100%
  b-radius(5px)
  background-color: $color-background
  overflow: hidden
  box-shadow: 0 0 20px $color-background-df
  margin-bottom: 10px
  .card-title
    display: flex
    justify-content: space-between
    align-items: center
    padding: 8px 8px 6px
    .card-name
      position: relative
      margin-left: 6px
      font-size: $font-size-medium-x
      color: $color-text-m
      font-weight: bold
      &:before
        content: ''
        width: 3px
        height: 20px
        position: absolute
        left: -6px
        top: 1px
        background-color: $color-background-active
        b-radius(2px)
    .card-op
      color: #B4DFFB
      .iconfont
        margin-left: 8px
        font-size: 20px
  .disabled
    .card-name
      color: $color-text
      &:before
        background-color: $color-text
  .card-ipt
    width: 100%
    position: relative
    padding: 14px
    &:after
      content: ''
      width: 100%
      height: 1px
      position: absolute
      top: 0
      left: 0
      background-color: $color-background-line
    .txt
      width: 100%
      height: 145px
      border: none
      padding: 0
      font-size: $font-size-small
      line-height: 1.2
      &::-webkit-input-placeholder
        color: $color-text-sub
.tip
  padding-top: 6px
  padding-bottom: 10px
  span
    margin-right: 20px
    color: $color-text-sub
    font-size: $font-size-small
</style>
