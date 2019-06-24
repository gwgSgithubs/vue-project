<template lang="html">
  <scroll ref="wrapperList" class="bottom" :class="{'finish': finishStyle}"
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
            <img v-lazy="item.avatar" alt="">
            <i v-if="item.sex" class="iconfont" :class="{'icon-nande': item.sex === 1, 'icon-nvde-': item.sex === 2}"></i>
          </div>
          <div class="card-detail">
            <div class="">
              <div>
                <span class="title">{{ellis(item.nickName)}}</span>
                <!-- <span class="sex">{{sex(item.sex)}}</span> -->
              </div>
              <p class="remark">{{item.remark||'无备注'}}</p>
            </div>
            <div class="oparation">
              <span v-show="item.id" :class="item.classStyle">{{item.mstatusText}}</span>
              <i class="iconfont icon-shoucang1" :class="{'favor': item.isFavor}" @click.stop="favor(item)" v-show="!item.id"></i>
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
import {mapMutations} from 'vuex'
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
    },
    showShadow: {
      type: Boolean,
      default: true
    },
    finishStyle: {
      type: Boolean,
      default: false
    }
  },
  created () {
    this.probeType = 3
    this.listenScroll = true
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
      load: '上拉加载'
    }
  },
  watch: {
    listData () {
      setTimeout(() => {
        this._initContentList()
      }, 27)
    },
    scrollY (newY) {
      let zIndex = 0
      if (newY < 0) {
        zIndex = 1
        if (this.differenceHeight - newY > TIPHEIGHT) {
          this.load = '松开加载'
        } else {
          this.load = '上拉加载'
        }
        if (!this.showLoad) {
          this.load = '- - 已经到底了 - -'
        }
      } else {
        zIndex = 0
        if (newY > TIPHEIGHT) {
          this.fresh = '松开刷新'
        } else {
          this.fresh = '下拉刷新'
        }
      }
      // this.$refs.top.style.zIndex = zIndex
      if (this.showShadow) {
        this.setShadowIndex(zIndex)
      }
    },
    scrollEndY (newY) {
      // 下拉刷新
      if (LIMIT < newY) {
        console.log('下拉刷新')
        this.$emit('refresh')
      }
      // 上拉加载
      if (LIMIT < this.differenceHeight - newY) {
        console.log('上拉加载')
        this.$emit('load')
      }
    }
  },
  computed: {
    // sex (n) {
    //   console.log(n)
    //   return 1
    // }
  },
  methods: {
    ellis (data) {
      let res = data.length > 6 ? data.substr(0, 6) + '...' : data
      return res
    },
    // 性别
    sex (n) {
      let res = (n === 1 ? 'icon-nan-' : (n === 2 ? 'icon-nv-' : ''))
      return res
    },
    // 收藏
    favor (item) {
      this.$emit('favor', item)
    },
    // 详情
    detail (item) {
      console.log(item)
      storage('status', item.status)
      storage('sof', item.sof)
      storage('userId', item.id)
      storage('openid', item.openid)
      this.$emit('detail', item)
    },
    ...mapMutations({
      setShadowIndex: 'SET_SHADOWINDEX'
    }),
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
  left: 0
  top: 172px
  right: 0
  bottom: 0
  padding: 0 10px 0 15px
  background-color: $color-background-m
  overflow: hidden
  &.finish
    top: 100px
    padding-left: 10px
  &>div
    padding: 10px 0 1px
</style>
