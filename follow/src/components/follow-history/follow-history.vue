<template lang="html">
  <div class="pop m-apply" v-show="show">
    <div class="mask"></div>
    <div class="pop-main main-wrap">
      <div class="close">
        <div class="needsclick" @click="close">
          <i class="iconfont icon-guanbi1"></i>
        </div>
      </div>
      <div class="pop-content main">
        <div class="pop-title">
          跟进历史
        </div>
        <div class="content">
          <div class="tab">
            <ul>
              <li :class="{'active': index === tabIndex}" v-for="(item, index) in tab" :key="index" v-show="index < tabLen" @click="changeTab(index)">{{item}}</li>
            </ul>
          </div>
          <div class="container">
            <div class="tab-main" v-for="(list, listIndex) in historyList" :key="listIndex" v-show="listIndex === contentIndex">
              <div class="tab-wrap" v-for="(item, index) in list" :key="index">
                <div class="name" :class="{'active': item.styleClass}">
                  <span>{{item.sche}}</span>
                  <span>{{item.title}}</span>
                </div>
                <p class="remark">{{item.content}}</p>
              </div>
            </div>
            <div class="empty" v-show="historyList.length === 0">
              <img src="~common/images/icon-empty.png" alt="">
              <span>空空如也！ </span>
            </div>
          </div>
        </div>
        <div class="tip" v-for="(item, index) in moveList" :key="index" v-show="moveIndex === index">
          <span>移交时间：{{item.creatTime}}</span>
          <span>申请人：{{item.nickName}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tabIndex: 0,
      tab: ['历史1', '历史2', '历史3'],
      contentIndex: 0,
      moveIndex: 0
    }
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    historyList: {
      type: Array,
      default: Function
    },
    moveList: {
      type: Array,
      default: Function
    },
    tabLen: {
      type: Number,
      default: 2
    }
  },
  methods: {
    changeTab (index) {
      this.tabIndex = index
      this.contentIndex = index
      this.moveIndex = index
    },
    close () {
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.m-apply
  .close:active
    opacity: 0.4
  .main
    height: 420px
    .content
      padding: 15px 20px 10px
      .empty
        text-align: center
        font-size: 20px
        font-weight: bold
        img
          margin: auto
          margin-bottom: 20px
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
        padding: 6px 0 12px 10px
        &:after
          content: ''
          width: 100%
          height: 1px
          position: absolute
          left: 0
          bottom: 0
          border-bottom: 1px dashed $color-background-active
      .name
        position: relative
        font-size: $font-size-small-x
        &:after
          content: ''
          width: 2px
          height: 14px
          position: absolute
          left: -6px
          top: 2px
          b-radius(1px)
          background-color: #666
        &.active
          font-weight: bold
          color: $color-text-m
          &:after
            background-color: $color-background-active
      .remark
        font-size: $font-size-small
.tip
  color: $color-text-sub
  font-size: $font-size-small
  padding-left: 20px
  span
    margin-right: 25px
</style>
