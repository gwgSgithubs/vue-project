<template>
  <div class="list">
    <div class="top shadow" ref="top" :style="bgImg">
      <div class="title">
        <i class="iconfont icon-gengduo" @click="back"></i>
        <h3>已完成朋友({{total}})</h3>
      </div>
      <div class="ipt-box" @click="search">
        <i class="iconfont icon-fangdajing"></i>
        <!-- <input type="text" name="" value="" placeholder="搜索福音朋友昵称/备注"> -->
        <span>搜索福音朋友昵称</span>
      </div>
    </div>
    <list-view
      :listData="finishListData"
      :showLoad="finishShowLoad"
      :empty="finishEmpty"
      :finishStyle="finishStyle"
      @favor="favor"
      @detail="detail"
      @refresh="refresh"
      @load="load"></list-view>
      <msg :show="msgShow" :msg="msgTit"></msg>
      <loading :show="loadingShow" :title="loadingTit"></loading>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import Loading from 'base/loading/loading'
import Confirm from 'base/confirm/confirm'
import Msg from 'base/msg/msg'
import {getTaskData, changeFavor} from 'api/task'
import ListView from 'components/listview/listview'
import {storage, tipIconFormate} from 'common/js/common'
import {ERR_OK, TIME_LIMIT} from 'api/config'
export default {
  data () {
    return {
      methodName: null,
      finishStyle: true,
      bgImg: {
        backgroundImage: 'url(' + require('common/images/icon-bg.png') + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100%'
      },
      msgTit: '', //
      msgShow: false,
      loadingTit: '', // 加载文本
      loadingShow: false,
      finishListData: [],
      finishPage: 1,
      finishSize: 10,
      finishIsLoad: true, // 是否下拉加载
      finishShowLoad: true, // 是否到底
      finishEmpty: false, // 是否为空
      total: null
    }
  },
  created () {
    this.probeType = 3
    this.listenScroll = true
    this.methodName = storage('methodName')
    this._getFinishData()
  },
  computed: {
    ...mapGetters(['shadowIndex'])
  },
  watch: {
    shadowIndex (zIndex) {
      this.$refs.top.style.zIndex = zIndex
    }
  },
  methods: {
    ...mapMutations({
      showSearch: 'SET_SEARCH'
    }),
    // 搜索
    search () {
      this.showSearch(true)
    },
    back () {
      this.$router.push({
        path: '/task'
      })
    },
    // 初始化完成数据
    initFinishData () {
      this.finishPage = 1
      this.finishListData = []
      this.finishIsLoad = true
      this.finishShowLoad = true
    },
    // 获取完成数据
    _getFinishData () {
      this.loadingShow = true
      this.loadingTit = '数据载入中...'
      getTaskData({
        status: 6,
        page: this.finishPage,
        size: this.finishSize
      }, (res) => {
        this.loadingShow = false
        if (res.code === ERR_OK) {
          let finishListData = this.finishListData
          let resData = tipIconFormate(res.data.content)
          this.total = res.data.totalElements
          this.finishListData = [...finishListData, ...resData]
          this.finishEmpty = !this.finishListData.length
          if (resData.length < this.finishSize) {
            this.finishIsLoad = false
            this.finishShowLoad = false
            return
          }
          this.finishPage += 1
        } else {
          this.msgShow = true
          this.msgTit = res.msg
          let timer = setTimeout(() => {
            clearTimeout(timer)
            this.msgShow = false
          }, TIME_LIMIT)
        }
      })
    },
    // 上拉加载
    load () {
      if (this.finishIsLoad) {
        this._getFinishData()
      }
    },
    // 下拉刷新
    refresh () {
      this.initFinishData()
      this._getFinishData()
    },
    // 收藏
    favor (item) {
      let openid = item.openid
      let isFavor = item.isFavor
      let notice = ''
      let loadingNotice = ''
      notice = (isFavor ? '取消收藏成功' : '收藏成功')
      loadingNotice = (isFavor ? '取消收藏中...' : '收藏中...')
      this.loadingShow = true // 加载显示
      this.loadingTit = loadingNotice
      changeFavor({openid, isFavor}, (res) => {
        this.loadingShow = false // 加载隐藏
        this.msgShow = true // 提示框显示
        if (res.code === ERR_OK) {
          this.finishListData.map((v, i, arr) => {
            if (v.openid === openid) {
              v.isFavor = (v.isFavor ? 0 : 1)
            }
            return v
          })
          this.msgTit = notice
        } else {
          this.msgTit = notice
        }
        let timer = setTimeout(() => {
          this.msgShow = false
          clearTimeout(timer)
        }, TIME_LIMIT)
      })
    },
    // 详情
    detail (item) {
      if (item.mstatus !== undefined && item.mstatus !== 0) {
        console.log('无法观看')
        return false
      }
      this.$router.push({
        path: 'userDetail'
      })
    }
  },
  components: {
    ListView,
    Loading,
    Confirm,
    Msg
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.list
  width: 100%
  position: absolute
  top: 0
  right: 0
  bottom: 0
  left: 0
  z-index: 10
  background-color: $color-background-m
.top
  height: 100px
  position: relative
  overflow: hidden
  text-align: center
  padding: 14px 12px 14px
  background-color: $color-background-m
  &.shadow
    box-shadow: 0 0 30px $color-background-active
  .title
    position: relative
    color: $color-text-btn
    i
      position: absolute
      left: 0
      transform: rotate(180deg)
      font-size: 22px
      font-weight: bold
  .ipt-box
    width: 100%
    text-align: left
    padding: 5px 18px
    background-color: $color-background
    b-radius(33px)
    margin: 20px 0 15px
    .icon-fangdajing
      color: $color-background-active
    span
      font-size: $font-size-medium-s
      color: $color-text-sub
</style>
