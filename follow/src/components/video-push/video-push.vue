<template lang="html">
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
      <div class="card" v-for="(item, index) in listData" :key="index">
        <div class="card-main" @click="detail(item)">
          <div class="img-box">
            <img v-lazy="item.coverUrl" alt="">
          </div>
          <div class="card-detail">
            <div class="">
              <div class="title">
                {{ellipsis(item.title, 6)}}
              </div>
              <p class="remark">{{ellipsis(item.info, 10)}}</p>
            </div>
            <div class="oparation">
              <span class="push-no" v-show="item.isdefault === '0' && status !== 6" @click.stop="pushVideo(item)">推送</span>
              <span class="push-su" v-show="item.isdefault === '2' && status !== 6" @click.stop="pushVideo(item)">已推送</span>
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
import {storage, ellis} from 'common/js/common'
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
    this.status = storage('status')
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
      status: null
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
    // 视频预览
    ellipsis (data, nu) {
      let res = ellis(data, nu)
      return res
    },
    pushVideo (item) {
      this.$emit('pushVideo', item)
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
  position: fixed
  left: 0
  top: 240px
  right: 0
  bottom: 0
  padding: 0 10px 0 15px
  background-color: $color-background
  overflow: hidden
  &>div
    padding: 10px 0 1px
  .card
    margin-bottom: 8px
    .card-main
      padding: 11px 6px 11px 15px
      b-radius(5px)
      .card-detail
        .title
          font-size: $font-size-medium-s
        .remark
          font-size: $font-size-small
      .oparation span
        font-size: $font-size-small-s
    .img-box
      width: 40px
      height: 40px
      flex: 0 0 40px
      b-radius(40px)
</style>
