<template lang="html">
  <transition name="search">
    <div class="search" v-show="show">
      <div class="s-form" ref="sFrom">
        <i class="iconfont icon-gengduo" @click="close"></i>
        <form class="" @submit.prevent="search">
          <i class="iconfont icon-fangdajing" @click="search"></i>
          <input type="text" name="" value="" placeholder="请输入用户名" v-model="title">
        </form>
      </div>
      <div class="s-history" ref="hFrom" v-show="recordList.length">
        <div class="hi-record">
          <span class="hi-name">历史记录</span>
          <span class="hi-clear" @click="clear">清空历史</span>
        </div>
        <div class="">
          <ul>
            <li v-for="(item, index) in recordList" :key="index" :class="{'active': item === title}" @click="hiSearch(item)">{{item}}</li>
          </ul>
        </div>
      </div>
      <div class="s-result">
        <div class="re-name">
          <span>用户</span>
        </div>
        <div class="">
          <scroll ref="wrapperList" class="bottom"
          @scroll="scroll"
          @touchEnd="touchEnd"
          :probe-type="probeType"
          :listen-scroll="listenScroll">
          <div class="" ref="contentList">
            <!-- 下拉刷新 -->
            <div class="state fresh" ref="fresh">
              {{fresh}}
            </div>
            <div class="empty" v-show="empty">
              <img src="~common/images/icon-empty.png" alt="">
              <span>空空如也！ </span>
            </div>
            <ul>
              <li v-for="(item, index) in userList" :key="index" @click="detail(item)">{{item.nickName}}</li>
            </ul>
            <!-- 上拉加载 -->
            <div class="state load" ref="load">
              {{load}}
            </div>
          </div>
        </scroll>
      </div>
    </div>
      <msg :show="msgShow" :msg="msgTit"></msg>
      <loading :show="loadingShow" :title="loadingTit"></loading>
      <confirm :show="confirmShow" :title="confirmTit" @cancel="cancel" @sure="sure"></confirm>
    </div>
  </transition>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import Scroll from 'base/scroll/scroll'
import {storage} from 'common/js/common'
import {getSearchData} from 'api/search'
import Msg from 'base/msg/msg'
import Loading from 'base/loading/loading'
import Confirm from 'base/confirm/confirm'
import {ERR_OK, TIME_LIMIT} from 'api/config'
const LIMIT = 50
const TIPHEIGHT = 50
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      confirmTit: '',
      confirmShow: false,
      msgTit: '', //
      msgShow: false,
      loadingTit: '', // 加载文本
      loadingShow: false,
      wrapperHeight: 0,
      contentHeight: 0,
      scrollY: 0,
      scrollEndY: 0,
      fresh: '下拉刷新',
      load: '上拉加载',
      empty: false,
      probeType: 3,
      listenScroll: true,
      recordList: [],
      userList: [],
      showLoad: true,
      status: '',
      page: 1,
      size: 20,
      title: '',
      url: '',
      isLoad: true
    }
  },
  mounted () {
    // console.log(this.$refs.hFrom.clientHeight)
  },
  watch: {
    showSearch (d) {
      console.log(d)
      if (d) {
        if (storage('recordList')) {
          // this.recordList = JSON.parse(storage('recordList'))
          this.recordList = storage('recordList')
        } else {
          this.recordList = []
        }
        console.log(storage('recordList'))
        let methodName = storage('methodName')
        if (methodName === 'm') { // 我的移交
          this.url = 'findByMove'
        } else if (methodName === 'f') { // 我的收藏
          this.url = 'findByFavor'
        } else if (methodName === 't') { // 我的任务
          this.url = 'findByTask'
        }
        this.initData()
        // 获取搜索数据
        this.getData()
      } else {
        this.recordList = []
        this.userList = []
        this.showLoad = true
        this.status = ''
        this.page = 1
        this.title = ''
        this.url = ''
        this.isLoad = true
      }
    },
    scrollY (newY) {
      // let zIndex = 0
      if (newY < 0) {
        // zIndex = 1
        if (this.differenceHeight - newY > TIPHEIGHT) {
          this.load = '松开加载'
        } else {
          this.load = '上拉加载'
        }
        if (!this.showLoad) {
          this.load = '- - 已经到底了 - -'
        }
      } else {
        // zIndex = 0
        if (newY > TIPHEIGHT) {
          this.fresh = '松开刷新'
        } else {
          this.fresh = '下拉刷新'
        }
      }
      // this.$refs.top.style.zIndex = zIndex
      // if (this.showShadow) {
      //   this.setShadowIndex(zIndex)
      // }
    },
    scrollEndY (newY) {
      // 下拉刷新
      if (LIMIT < newY) {
        console.log('下拉刷新')
        this.initData()
        this.getData()
      }
      // 上拉加载
      if (LIMIT < this.differenceHeight - newY) {
        console.log('上拉加载')
        if (!this.isLoad) {
          return
        }
        this.getData()
      }
    }
  },
  computed: {
    ...mapGetters(['showSearch'])
  },
  methods: {
    detail (item) {
      storage('status', item.status)
      storage('sof', item.sof)
      storage('userId', item.id)
      storage('openid', item.openid)
      if (item.mstatus !== undefined && item.mstatus !== 0) {
        console.log('无法观看')
        return false
      }
      this.showSearchFn(false)
      this.$router.push({
        path: 'userDetail'
      })
    },
    // 初始化
    initData () {
      this.userList = []
      this.showLoad = true
      this.isLoad = true
      this.status = ''
      this.page = 1
    },
    //
    hiSearch (item) {
      this.title = item
      this.search()
    },
    // 搜索数据
    search () {
      this.title = this.title.replace(/(^\s*)|(\s*$)/g, '')
      // if (!this.title) {
      //   this.msgShow = true
      //   this.msgTit = '请输入用户名'
      //   let timer = setTimeout(() => {
      //     clearTimeout(timer)
      //     this.msgShow = false
      //   }, TIME_LIMIT)
      //   return
      // }
      if (!this.title) {
        this.msgShow = true
        this.msgTit = '请输入搜索内容'
        let timer = setTimeout(() => {
          clearTimeout(timer)
          this.msgShow = false
        }, TIME_LIMIT)
        return false
      }
      this.initData()
      this.userList = []
      this.getData()
      // 判断是否已有记录
      for (let i = 0; i < this.recordList.length; i++) {
        if (this.recordList[i] === this.title) {
          return
        }
      }
      if (this.title) {
        this.recordList.unshift(this.title)
      }
      storage('recordList', this.recordList)
    },
    // 获取数据
    getData () {
      this.loadingShow = true
      this.loadingTit = '数据载入中...'
      getSearchData(this.url, {status: this.status, page: this.page, size: this.size, title: this.title}, (res) => {
        this.loadingShow = false
        if (res.code === ERR_OK) {
          let userList = this.userList
          let resData = res.data.content
          this.userList = [...userList, ...resData]
          this.empty = !this.userList.length
          setTimeout(() => {
            // 设置scroll 位置
            this.setPosition()
          }, 27)
          if (resData.length < this.size) {
            this.isLoad = false
            this.showLoad = false
            return
          }
          this.page += 1
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
    // 清空历史记录
    clear () {
      this.confirmTit = '确定清空历史记录吗!'
      this.confirmShow = true
    },
    // 确定
    sure () {
      this.title = ''
      this.confirmTit = ''
      this.confirmShow = false
      this.recordList = []
      this.userList = []
      storage('recordList', this.recordList)
      setTimeout(() => {
        this.getData()
        this.setPosition()
      }, 27)
    },
    // 取消
    cancel () {
      this.confirmTit = ''
      this.confirmShow = false
    },
    // 设置scroll 位置
    setPosition () {
      let sFrom = this.$refs.sFrom.clientHeight
      let hFrom = this.$refs.hFrom.clientHeight
      this.$refs.wrapperList.$el.style.top = sFrom + hFrom + 41 + 'px'
      // 外壳高度
      this.wrapperHeight = this.$refs.wrapperList.$el.clientHeight
      // 内容高度
      this.contentHeight = this.$refs.contentList.clientHeight
      // console.log(this.contentHeight)
      this.differenceHeight = this.wrapperHeight - this.contentHeight
      // console.log(this.contentHeight)
      // 加载\刷新
      let displayState = 'block'
      if (this.differenceHeight >= 0) {
        displayState = 'none'
      } else {
        displayState = 'block'
      }
      this.$refs.fresh.style.display = displayState
      this.$refs.load.style.display = displayState
      this.$refs.wrapperList.refresh()
    },
    ...mapMutations({
      showSearchFn: 'SET_SEARCH'
    }),
    // 关闭搜索页面
    close () {
      this.showSearchFn(false)
    },
    // 监听滚动位置
    scroll (pos) {
      this.scrollY = pos.y
    },
    // 手指离开
    touchEnd (pos) {
      this.scrollEndY = pos.y
    }
  },
  components: {
    Scroll,
    Msg,
    Loading,
    Confirm
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/mixin'
@import '~common/stylus/variable'
.bottom
  width: 100%
  position: absolute
  bottom: 0
  left: 0
  right: 0
  overflow: hidden
  background-color: $color-background
.search
  width: 100%
  height: 100%
  position: fixed
  top: 0
  right: 0
  bottom: 0
  left: 0
  z-index: 11
  background-color: $color-background-m
  .s-form
    display: flex
    align-items: center
    background-color: $color-background-active
    padding: 8px 15px 8px 5px
    .icon-gengduo
      color: $color-text-btn
      font-size: 22px
      font-weight: bold
      transform: rotate(180deg)
    form
      width: 100%
      height: 28px
      flex: 1
      display: flex
      align-items: center
      margin-left: 15px
      background-color: $color-background
      padding: 5px 15px
      box-sizing: border-box
      b-radius(14px)
      .iconfont
        color: $color-background-active
    input
      margin: 0 5px
      flex: 1
      font-size: $font-size-medium-s
      color: $color-text-sub
  .s-history
    padding: 12px
    padding-bottom: 0
    .hi-record
      display: flex
      justify-content: space-between
      align-items: center
      margin-bottom: 10px
    .hi-name
      font-size: $font-size-medium-x
      color: $color-text-m
      font-weight: bolder
    .hi-clear
      font-size: $font-size-small
    ul
      display: flex
      flex-wrap: wrap
      li
        padding: 5px 10px
        b-radius(2px)
        border: 1px solid $color-background-active
        color: $color-background-active
        font-size: $font-size-medium-s
        margin: 0 10px 10px 0
        &.active
          background-color: $color-background
          color: $color-text-m
          border-color: $color-background
        /* &:hover
          color: $color-background-active */
  .s-result
    .re-name
      font-size: $font-size-medium-x
      color: $color-text-m
      font-weight: bolder
      padding: 10px
    li
      width: 100%
      height: 40px
      position: relative
      background-color: $color-background
      color: $color-text-m
      padding: 10px
      font-size: $font-size-medium-s
      box-sizing: border-box
      &:after
        content: ''
        width: 100%
        height: 1px
        position: absolute
        left: 0
        bottom: 0
        background-color: $color-background-line
.search-enter-active, .search-leave-active
  transition: all .3s
.search-enter, .search-leave-active
  transform: translate3d(0, -100%, 0)
</style>
