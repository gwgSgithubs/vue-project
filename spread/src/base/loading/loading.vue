<template lang="html">
  <div class="pop" v-if="isShow">
    <div class="mask"></div>
    <div class="pop-main">
      <img src="~common/images/loading.gif" alt="">
      <p>{{loadingTxt}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    loadingTxt: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
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
    overflow: hidden
    img
      margin: auto
    p
      padding-top: 10px
      color: #fff
      font-size: 14px
</style>
