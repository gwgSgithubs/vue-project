<template lang="html">
  <transition name="anim">
    <div class="pop msg" v-show="show">
      <div class="pop-main desc">
        {{msg}}
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    msg: {
      type: String,
      default: 'msg'
    },
    show: {
      type: Boolean,
      default: false
    },
    time: {
      type: Number,
      default: 1500
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.msg
  z-index: 999
  .desc
    no-wrap()
    background-color: $color-background-pop
    b-radius(2px)
    overflow: hidden
    font-size: $font-size-medium-x
    color: $color-text-btn
    padding: 14px
</style>
