<template>
  <div class="list">
    <div class="top shadow" ref="top" :style="bgImg">
      <div class="title">
        <h3>{{title}}</h3>
        <i class="iconfont icon-weibiaoti-" v-show="methodName === 't'" @click="toFinish"></i>
      </div>
      <div class="ipt-box" @click="search">
        <i class="iconfont icon-fangdajing"></i>
        <span>搜索福音朋友昵称</span>
        <!-- <input type="text" name="" value="" placeholder="搜索福音朋友昵称/备注"> -->
      </div>
      <scroll class="nav"
        :probe-type="probeType"
        :listen-scroll="listenScroll"
        :scrollX="scrollXFlag"
        :scrollY="scrollYFlag"
        :data="navData"
        ref="navWrapper">
        <ul class="nav-box" ref="navBox">
          <li v-for="(item, index) in navData" :key="index" @click="tabChange(item, index)">
            <h2 class="resetFont">{{item.num}}</h2>
            <div class="step" :class="{'active': currrentIndex === index}">
              <span>{{item.step}}</span>
            </div>
          </li>
        </ul>
      </scroll>
    </div>
    <list-view
      :listData="listData"
      :showLoad="showLoad"
      :empty="empty"
      @detail="detail"
      @favor="favor"
      @refresh="refresh"
      @load="load"></list-view>
  </div>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import {mapGetters, mapMutations} from 'vuex'
import Loading from 'base/loading/loading'
import Confirm from 'base/confirm/confirm'
import Msg from 'base/msg/msg'
import ListView from 'components/listview/listview'
import {storage} from 'common/js/common'
export default {
  created () {
    this.probeType = 3
    this.listenScroll = true
    this.methodName = storage('methodName')
  },
  props: {
    empty: {
      type: Boolean,
      default: false
    },
    showLoad: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ''
    },
    navData: {
      type: Array,
      default: Function
    },
    listData: {
      type: Array,
      default: Function
    }
  },
  computed: {
    ...mapGetters(['shadowIndex'])
  },
  mounted () {
    this.$nextTick(() => {
      // 导航初始化
      this._initNav()
    })
  },
  data () {
    return {
      methodName: null,
      bgImg: {
        backgroundImage: 'url(' + require('common/images/icon-bg.png') + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100%'
      },
      currrentIndex: 0,
      scrollXFlag: true,
      scrollYFlag: false,
      isShowConfirm: false
    }
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
    // 完成
    toFinish () {
      this.$emit('toFinish')
    },
    // 上拉加载
    load () {
      this.$emit('load')
    },
    // 下拉刷新
    refresh () {
      this.$emit('refresh')
    },
    // 收藏
    favor (item) {
      this.$emit('favor', item)
    },
    // 详情
    detail (item) {
      if (item.mstatus !== undefined && item.mstatus !== 0) {
        console.log('无法观看')
        return false
      }
      // storage('sof', item.sof)
      // storage('userId', item.id)
      // storage('openid', item.openid)
      this.$router.push({
        path: 'userDetail'
      })
    },
    _initNav () {
      // 横向滚动 宽度
      let w = 0
      Array.prototype.forEach.call(this.$refs.navBox.children, (v, i) => {
        w += v.clientWidth
      })
      console.log(w)
      this.$refs.navBox.style.width = `${w + 10}px`
    },
    // nav 切换
    tabChange (item, index) {
      this.currrentIndex = index
      this.$emit('navChange', item.status)
    }
  },
  components: {
    Scroll,
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
.top
  height: 173px
  width: 100%
  position: absolute
  top: 0
  left: 0
  overflow: hidden
  text-align: center
  padding: 14px 12px 0
  background-color: $color-background-m
  .nav
    height: 62px
    position: absolute
    left: 14px
    right: 14px
    bottom: 12px
    overflow: hidden
    b-radius(5px)
    background-color: $color-background
  &.shadow
    box-shadow: 0 1px 30px $color-background-active
  .nav-box
    display: flex
    justify-content: space-around
    padding: 7px 5px
    h2
      color: $color-text-m
    li
      position: relative
      flex: 0 0 70px
      padding: 0 5px
      &:after
        content: ''
        width: 1px
        height: 33px
        position: absolute
        top: 6px
        right: -2px
        background-color: $color-background-line
      &:last-child:after
        display: none
    .step
      font-size: $font-size-small
      color: $color-text-sub
      width: 100%
      margin-top: 3px
      line-height: 1.2
      span
        display: inline-block
        padding: 3px 8px 1px
        line-height: 1
        b-radius(18px)
      &.active
        color: $color-text-btn
        span
          background: linear-gradient(to right, $color-background-l-start, $color-background-active)
  .title
    position: relative
    color: $color-text-btn
    i
      position: absolute
      right: 0
      top: 3px
      &:active
        opacity: 0.4
      /* &:after
        content: ''
        width: 5px
        height: 5px
        position: absolute
        right: -1px
        top: -1px
        background-color: #FF0000
        b-radius(3px) */
  .ipt-box
    width: 100%
    text-align: left
    padding: 4px 18px 5px
    background-color: $color-background
    b-radius(33px)
    margin: 20px 0 14px
    .icon-fangdajing
      color: $color-background-active
    span
      font-size: $font-size-medium-s
      color: $color-text-sub
</style>
