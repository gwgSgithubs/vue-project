<template lang="html">
  <div class="tab">
    <router-link tag="div" class="tab-item" to="userInfo">
      用户信息
    </router-link>
    <router-link tag="div" class="tab-item" to="followInfo">
      跟进信息
    </router-link>
    <router-link tag="div" class="tab-item" to="videoInfo">
      视频信息
    </router-link>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.tab
  position: absolute
  left: 50%
  top: 52px
  transform: translate3d(-50%, 0, 0)
  display: flex
  b-radius(2px)
  overflow: hidden
  border: 1px solid $color-background-active
  box-shadow: 0 0 20px $color-background-df
  .tab-item
    no-wrap()
    padding: 6px 13px
    font-size: $font-size-medium
    color: $color-text-m
    background-color: $color-background
    &.router-link-active
      background-color: $color-background-active
      color: $color-text-btn
    &:nth-of-type(2)
      border-left: 1px solid $color-background-active
      border-right: 1px solid $color-background-active

</style>
