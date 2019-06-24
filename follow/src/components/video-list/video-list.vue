<template lang="html">
  <scroll ref="wrapperList" class="bottom" :class="{'set-bot': setBot}"
    @scroll="scroll"
    @touchEnd="touchEnd"
    :probe-type="probeType"
    :data="listData"
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
      <div class="card" v-for="(item, index) in listData" :key="index">
        <div class="icon-tip">
          <img :src="item.tipIcon" alt="">
        </div>
        <div class="card-main" @click="detail(item)">
          <div class="img-box">
            <img v-lazy="item.coverUrl" alt="">
          </div>
          <div class="card-detail">
            <div class="">
              <div class="title">
                {{ellis(item.title)}}
              </div>
              <p class="remark">{{ellis12(item.info)}}</p>
            </div>
            <div class="oparation">
              <span>{{item.statusText}}</span>
              <span class="push-su" v-show="item.pushText">{{item.pushText}}</span>
              <!-- <span class="push-ca">取消推送</span> -->
              <i class="iconfont icon-gengduo detail"></i>
            </div>
          </div>
        </div>
      </div>
      <!-- 上拉加载 -->
      <div class="state load" ref="load">
        {{load}}
      </div>
    </div>
  </scroll>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import {storage} from 'common/js/common'
const LIMIT = 50
const TIPHEIGHT = 50
export default {
  props: {
    empty: {
      type: Boolean,
      default: false
    },
    showLoad: {
      type: Boolean,
      default: true
    },
    listData: {
      type: Array,
      default: Function
    }
  },
  created () {
    this.probeType = 3
    this.listenScroll = true
    this.methodName = storage('methodName')
    if (this.methodName === 'm') { // 我的移动
      this.setBot = true
    } else {
      this.setBot = false
    }
  },
  mounted () {
    // 内容列表初始化
    setTimeout(() => {
      this._initContentList()
    }, 27)
  },
  data () {
    return {
      scrollY: 0,
      scrollEndY: 0,
      wrapperHeight: 0,
      contentHeight: 0,
      fresh: '下拉刷新',
      load: '上拉加载',
      setBot: false
    }
  },
  watch: {
    listData () {
      setTimeout(() => {
        this._initContentList()
      }, 27)
    },
    scrollY (newY) {
      if (newY < 0) {
        if (this.differenceHeight - newY > TIPHEIGHT) {
          this.load = '松开加载'
        } else {
          this.load = '上拉加载'
        }
        if (!this.showLoad) {
          this.load = '- - 已经到底了 - -'
        }
      } else {
        if (newY > TIPHEIGHT) {
          this.fresh = '松开刷新'
        } else {
          this.fresh = '下拉刷新'
        }
      }
    },
    scrollEndY (newY) {
      // 下拉刷新
      if (LIMIT < newY) {
        this.$emit('refresh')
      }
      // 上拉加载
      if (LIMIT < this.differenceHeight - newY) {
        this.$emit('load')
      }
    }
  },
  methods: {
    ellis (data) {
      let res = data.length > 6 ? data.substr(0, 6) + '...' : data
      return res
    },
    ellis12 (data) {
      let res = data.length > 9 ? data.substr(0, 9) + '...' : data
      return res
    },
    // 详情
    detail (item) {
      this.$emit('detail', item)
    },
    _initContentList () {
      // 外壳高度
      this.wrapperHeight = this.$refs.wrapperList.$el.clientHeight
      // 内容高度
      this.contentHeight = this.$refs.contentList.clientHeight
      // console.log(this.contentHeight)
      this.differenceHeight = this.wrapperHeight - this.contentHeight
      // 加载\刷新
      let displayState = 'block'
      if (this.differenceHeight >= 0) {
        displayState = 'none'
      } else {
        displayState = 'block'
      }
      this.$refs.fresh.style.display = displayState
      this.$refs.load.style.display = displayState
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
    Scroll
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.bottom
  position: absolute
  left: -10px
  top: 36px
  right: -10px
  bottom: 0
  padding: 0 10px 0 15px
  background-color: $color-background-m
  overflow: hidden
  &.set-bot
    bottom: 60px
    top: 0
  &>div
    padding: 10px 0 1px
  .card
    .card-main
      padding: 15px 4px 15px 19px
</style>
