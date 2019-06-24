<template lang="html">
  <pop-wrap title="定制海报" height="auto" width="440px" v-if="isShow" @closePop="closePoster">
    <div class="content">
      <img :src="imgUrl" class="poster-img">
      <img :src="qrUrl" class="qr-img">
    </div>
    <div class="pop-btn-box">
      <button class="r-button sub" @click="changePictrue">换一张</button>
      <button class="r-button primary" @click="savePictrue">保存图片</button>
    </div>
  </pop-wrap>
</template>

<script>
import popWrap from 'base/pop-wrap/pop-wrap'
export default {
  props: {
    imgUrl: {
      type: String,
      default: ''
    },
    qrUrl: {
      type: String,
      default: ''
    },
    isShow: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // 关闭
    closePoster () {
      this.$emit('closePoster')
    },
    // 换一张
    changePictrue () {
      this.$emit('changePictrue')
    },
    // 保存图片
    savePictrue () {
      this.$emit('savePictrue')
    }
  },
  components: {
    popWrap
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/theme'
.poster-img
  width: 100%
.qr-img
  width: 100px
  height: 100px
  position: absolute
  bottom: 85px
  right: 15px
  z-index: 1
</style>
