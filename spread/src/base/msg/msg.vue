<template lang="html">
  <div class="pop msg" v-if="isShow">
    <div class="mask" v-if="isMask"></div>
    <div class="pop-content">
      <div class="msg-main">
        {{msgText}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isMask: {
      type: Boolean,
      default: true
    },
    msgText: {
      type: String,
      default: ''
    },
    time: {
      type: Number,
      default: 2000
    },
    isShow: {
      type: Boolean,
      default: false
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
    background-color: rgba(0, 0, 0, 0.1)
  .pop-content
    max-width: 400px
    position: absolute
    left: 50%
    top: 50%
    transform: translate3d(-50%, -50%, 0)
    background-color: rgba(0, 0, 0, 0.7)
    padding: 10px
    border-radius: 4px
    overflow: hidden
    text-align: center
    color: #fff
    font-size: 16px
</style>
