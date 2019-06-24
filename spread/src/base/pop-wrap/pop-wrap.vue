<template lang="html">
  <div class="pop" v-if="isShow">
    <div class="mask"></div>
    <div class="pop-main" :style="{height: height, width: width}">
      <div class="pop-tit-box">
        <span>{{title}}</span>
        <i class="el-icon-close close" @click="close"></i>
      </div>
      <div class="pop-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    height: {
      type: String,
      default: 'auto'
    },
    width: {
      type: String,
      default: 'auto'
    },
    title: {
      type: String,
      default: ''
    },
    isShow: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    close () {
      this.$emit('closePop')
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/theme'
.pop
  width: 100%
  height: 100%
  position: fixed
  left: 0
  top: 0
  right: 0
  bottom: 0
  z-index: 99
  .mask
    width: 100%
    height: 100%
    background-color: rgba(0, 0, 0, 0.5)
  .pop-main
    position: absolute
    left: 50%
    top: 50%
    transform: translate3d(-50%, -50%, 0)
    background-color: #fff
    overflow: hidden
  .pop-tit-box
    width: 100%
    height: 44px
    position: relative
    background-color: $mainColor
    text-align: center
    font-size: 18px
    color: #fff
    line-height: 44px
    padding: 0 45px
    box-sizing: border-box
    .close
      position: absolute
      top: 13px
      right: 20px
      cursor: pointer
</style>
