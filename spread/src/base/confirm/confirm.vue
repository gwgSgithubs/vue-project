<template lang="html">
  <pop-wrap title="提示" height="240px" width="440px" v-if="isShow" @closePop="closeConfirm">
    <div class="content">
      <i class="icon iconfont icon-tishi"></i>
      {{confirmTxt}}
    </div>
    <div class="pop-btn-box">
      <button class="r-button info" @click="confirmCancel">取消</button>
      <button class="r-button primary" @click="confirmSure">确定</button>
    </div>
  </pop-wrap>
</template>

<script>
import popWrap from 'base/pop-wrap/pop-wrap'
export default {
  props: {
    confirmTxt: {
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
    // 确定
    confirmSure () {
      this.$emit('confirmSure')
    },
    // 取消
    confirmCancel () {
      this.closeConfirm()
    },
    // 关闭
    closeConfirm () {
      this.$emit('closeConfirm')
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
    font-size: 30px
    color: $warning
    margin-right: 8px
.pop-btn-box
  text-align: right
  padding-top: 0
  button
    margin: 0 0 0 12px
</style>
