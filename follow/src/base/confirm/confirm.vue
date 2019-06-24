<template lang="html">
  <transition name="anim">
    <div class="confirm" v-show="show">
      <div class="confirm-main">
        <p class="desc">{{title}}</p>
        <div class="btn-box">
          <button class="needsclick btn cancel" @click="cancel">
            取消
          </button>
          <button class="needsclick btn sure" @click="sure">
            确定
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'confirm'
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    cancel () {
      this.$emit('cancel')
    },
    sure () {
      this.$emit('sure')
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.confirm
  width: 100%
  height: 100%
  position: fixed
  top: 0
  right: 0
  bottom: 0
  left: 0
  z-index: 999
  background-color: $color-background-pop
  text-align: center
  .confirm-main
    position: absolute
    top: 50%
    left: 50%
    transform: translate3d(-50%, -50%, 0)
    padding: 25px
    background-color: $color-background
    b-radius(10px)
    overflow: hidden
    p
      font-size: $font-size-large
      color: $color-text-m
      font-weight: bolder
      margin-bottom: 34px
      margin-top: 10px
      no-wrap()
    .btn-box
      no-wrap()
    .btn
      width: 118px
      height: 38px
      b-radius(20px)
      overflow: hidden
      font-size: $font-size-medium-x
      &.cancel
        border: 1px solid $color-text-sub
        color: $color-text
        background-color: $color-background
        margin-right: 5px
      &.sure
        border: 1px solid $color-background-active
        background-color: $color-background-active
        color: $color-text-btn
</style>
