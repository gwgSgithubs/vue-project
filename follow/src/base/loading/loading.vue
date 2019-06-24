<template lang="html">
  <transition name="anim">
    <div class="loading-container" v-show="show">
      <div class="loading">
        <img width="30" height="30" src="./loading.gif" alt="">
        <p class="desc">{{title}}</p>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '正在载入...'
    },
    show: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.loading-container
  position: fixed
  width: 100%
  height: 100%
  top: 0
  right: 0
  bottom: 0
  left: 0
  z-index: 9999
  background-color: $color-background-pop
  .loading
    width: 120px
    height: 50px
    position: absolute
    top: 50%
    left: 50%
    b-radius(10px)
    transform: translate3d(-50%, -50%, 0)
    display: flex
    justify-content: center
    align-items: center
    background-color: #333
    text-align: center
    .desc
      margin-left: 5px
      line-height: 20px
      font-size: $font-size-small
      color: $color-text-btn
</style>
