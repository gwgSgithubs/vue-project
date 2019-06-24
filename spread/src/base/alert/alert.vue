<template lang="html">
  <pop-wrap title="提示" height="240px" width="440px" v-if="isShow" @closePop="closeAlert">
    <div class="content">
      <i class="icon iconfont icon-tishi"></i>
      {{alertTxt}}
    </div>
    <div class="pop-btn-box">
      <button class="r-button primary" @click="alertSure">确定</button>
    </div>
  </pop-wrap>
</template>

<script>
import popWrap from 'base/pop-wrap/pop-wrap'
export default {
  props: {
    alertTxt: {
      type: String,
      default: ''
    },
    isShow: {
      type: Boolean,
      default: false
    }
  },
  components: {
    popWrap
  },
  methods: {
    alertSure () {
      this.closeAlert()
    },
    closeAlert () {
      this.$emit('closeAlert')
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/theme'
.content
  height: 124px
  display: flex
  justify-content: center
  align-items: center
  text-align: center
  font-size: 18px
  margin-top: 20px
  .icon
    font-size: 40px
    color: $warning
    margin-right: 8px
.pop-btn-box
  text-align: right
  padding-top: 0
  button
    margin: 0
</style>
