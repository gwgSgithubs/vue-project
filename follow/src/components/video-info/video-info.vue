<template lang="html">
  <div class="vi-info">
    <div class="top" v-show="methodName !== 'm'">
      <span @click="direPush">定向推送</span>
    </div>
    <video-list
      :listData="listData"
      :empty="empty"
      :showLoad="showLoad"
      @load="load"
      @refresh="refresh"
      @detail="detail"
    ></video-list>
    <dire-push
      @close="closePush"
      @refresh="pushRefresh"
      @load="pushLoad"
      @labelIdFn="labelIdFn"
      @videoTypeFn="videoTypeFn"
      @pushVideo="pushVideo"
      @detailReview="detailReview"
      @search="search"
      :show="showPush"
      :empty="pushEmpty"
      :showLoad="pushShowLoad"
      :listData="pushList"
      :labelIdList="labelIdList"
      :videoTypeList="videoTypeList"
    ></dire-push>
    <video-review
      :show="showView"
      :videoData="videoData"
      @close="closeVideo"
    ></video-review>
    <msg :show="msgShow" :msg="msgTit"></msg>
    <loading :show="loadingShow" :title="loadingTit"></loading>
  </div>
</template>

<script>
import VideoList from 'components/video-list/video-list'
import VideoReview from 'components/video-review/video-review'
import DirePush from 'components/dire-push/dire-push'
import {storage, tipIconFormateVideo, removeGap} from 'common/js/common'
import {getVideoInfo, getPushVideo, getVideoType, getVideoLabel, postPushVideo} from 'api/videoInfo'
import {ERR_OK, TIME_LIMIT} from 'api/config'
import Msg from 'base/msg/msg'
import Loading from 'base/loading/loading'
export default {
  data () {
    return {
      methodName: null,
      loadingTit: '', // 加载文本
      loadingShow: false,
      msgTit: '', //
      msgShow: false,
      showPush: false, // 是否显示推送
      showView: false, // 是否显示预览
      videoData: {}, // 预览视频信息
      openid: null,
      page: 1,
      size: 10,
      status: '', // 默认全部
      listData: [], // 视频信息
      isLoad: true, // 是否下拉加载
      showLoad: true, // 是否到底
      empty: false, // 是否为空
      videoType: '', // 视频类别
      videoTypeList: [],
      labelId: '', // 分类标签
      labelIdList: [],
      title: '', // 视频标题
      pushSize: 10,
      pushPage: 1,
      pushList: [], // 推送视频数据
      pushIsLoad: true, // 推送是否下拉加载
      pushShowLoad: true, // 推送是否到底
      pushEmpty: false // 是否为空
    }
  },
  created () {
    this.openid = storage('openid')
    this.methodName = storage('methodName')
    this._getVideoInfo()
  },
  methods: {
    // 推送视频预览
    detailReview (data) {
      this.showView = true
      this.videoData = data
    },
    // 取消\推送视频
    pushVideo (item) {
      let id = item.id
      let isdefault = item.isdefault
      let action = ''
      let notice = ''
      if (isdefault === '0') { // 推送
        action = 'add'
        notice = '推送'
      } else if (isdefault === '2') { // 取消推送
        action = 'remove'
        notice = '取消推送'
      }
      this.loadingShow = true
      this.loadingTit = notice + '中...'
      postPushVideo({id: id, action: action}, (res) => {
        this.loadingShow = false
        this.msgShow = true
        if (res.code === ERR_OK) {
          this.msgTit = notice + '成功'
          let ar = ''
          for (let i = 0; i < this.pushList.length; i++) {
            if (this.pushList[i].id === id) {
              if (this.pushList[i].isdefault === '0') {
                ar = '2'
              } else if (this.pushList[i].isdefault === '2') {
                ar = '0'
              }
              this.$set(this.pushList, i, Object.assign({}, this.pushList[i], {isdefault: ar}))
              break
            }
          }
          for (let i = 0; i < this.listData.length; i++) {
            if (this.listData[i].id === id) {
              this.$set(this.listData, i, Object.assign({}, this.listData[i], {isdefault: '2'}))
              break
            }
          }
          this.showPush = false // 推送弹框关闭
          this.initData() // 视频参数初始化
          this._getVideoInfo() // 获取视频信息
        } else {
          this.msgTit = res.msg
        }
        this.msgTimerFn()
      })
    },
    // 搜索
    search (title) {
      let res = removeGap(title)
      this.initPushData()
      this.title = res
      this._getPushVideo()
    },
    // 分类标签过滤
    labelIdFn (id) {
      this.initPushData()
      this.labelId = id
      this._getPushVideo()
    },
    // 视频类别过滤
    videoTypeFn (id) {
      this.initPushData()
      this.videoType = id
      this._getPushVideo()
    },
    // 初始推送化数据
    initPushData () {
      this.pushPage = 1
      this.pushList = []
      this.pushIsLoad = true
      this.pushShowLoad = true
    },
    // 推送加载
    pushLoad () {
      if (this.pushIsLoad) {
        this._getPushVideo()
      }
    },
    // 推送刷新
    pushRefresh () {
      this.initPushData()
      this._getPushVideo()
    },
    // 获取视频标签
    _getVideoLabel () {
      getVideoLabel({}, (res) => {
        if (res.code === ERR_OK) {
          this.labelIdList = res.data
        }
      })
    },
    // 获取视频类别
    _getVideoType () {
      getVideoType({typeId: 1}, (res) => {
        if (res.code === ERR_OK) {
          this.videoTypeList = res.data
        }
      })
    },
    // 获取推送视频信息
    _getPushVideo () {
      this.loadingShow = true
      this.loadingTit = '加载中...'
      getPushVideo({openid: this.openid, videoType: this.videoType, labelId: this.labelId, title: this.title, page: this.pushPage, size: this.pushSize}, (res) => {
        this.loadingShow = false
        if (res.code === ERR_OK) {
          let pushList = this.pushList
          let resData = res.data.content
          // let resData = tipIconFormateVideo(res.data.content)
          this.pushList = [...pushList, ...resData]
          // console.log(this.pushList)
          this.pushEmpty = !this.pushList.length
          if (resData.length < this.size) {
            this.pushIsLoad = false
            this.pushShowLoad = false
            return
          }
          this.pushPage += 1
        } else {
          this.msgShow = true
          this.msgTit = '加载错误'
          this.msgTimerFn()
        }
      })
    },
    // 定向推送关闭
    closePush () {
      this.initPushData()
      this.showPush = false
    },
    // 定向推送弹出
    direPush () {
      // 推送视频数据
      this._getPushVideo()
      // 获取视频类别
      this._getVideoType()
      // 视频标签
      this._getVideoLabel()
      this.showPush = true
    },
    // 初始化数据
    initData () {
      this.page = 1
      this.listData = []
      this.isLoad = true
      this.showLoad = true
    },
    // 上拉加载
    load () {
      if (this.isLoad) {
        this._getVideoInfo()
      }
    },
    // 下拉加载
    refresh () {
      // 初始化page, listData
      this.initData()
      this._getVideoInfo()
    },
    // 关闭预览
    closeVideo () {
      this.showView = false
    },
    // 预览
    detail (data) {
      this.showView = true
      this.videoData = data
    },
    _getVideoInfo () {
      this.loadingShow = true
      this.loadingTit = '加载中...'
      getVideoInfo({openid: this.openid, size: this.size, page: this.page}, (res) => {
        this.loadingShow = false
        if (res.code === ERR_OK) {
          let listData = this.listData
          let resData = tipIconFormateVideo(res.data.content)
          this.listData = [...listData, ...resData]
          this.empty = !this.listData.length
          if (resData.length < this.size) {
            this.isLoad = false
            this.showLoad = false
            return
          }
          this.page += 1
        } else {
          this.msgShow = true
          this.msgTit = '加载错误'
          this.msgTimerFn()
        }
      })
    },
    msgTimerFn () {
      let timer = setTimeout(() => {
        clearTimeout(timer)
        this.msgShow = false
      }, TIME_LIMIT)
    }
  },
  components: {
    VideoList,
    VideoReview,
    DirePush,
    Msg,
    Loading
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable'
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
  /* box-shadow: 0 1px 30px $color-background-df */
  /* border-bottom: 1px solid $color-background-df */
</style>
