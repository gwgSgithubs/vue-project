<template lang="html">
  <pop-wrap :title="title" height="196px" width="440px" v-if="isShow" @closePop="closePrompt">
    <div class="content">
      <el-input v-model="val" :placeholder="`请输入${title}`" :focus="isFocus"></el-input>
      <span class="tip" v-if="isShowTip">{{tipTxt}}</span>
    </div>
    <div class="pop-btn-box">
      <button class="r-button info" @click="promptCancel">取消</button>
      <button class="r-button primary" @click="promptSure">确定</button>
    </div>
  </pop-wrap>
</template>

<script>
import popWrap from 'base/pop-wrap/pop-wrap'
import {trim} from 'common/js/util'
export default {
  data () {
    return {
      val: '',
      isFocus: false,
      isShowTip: false,
      tipTxt: ''
    }
  },
  props: {
    title: {
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
    promptSure () {
      let val = trim(this.val)
      let reg = /^(([1-9]\d*)(\.\d{1,2})?)$|^(0\.0?([1-9]\d?))$/
      if (!val) {
        this.isShowTip = true
        this.tipTxt = `${this.title}不能为空`
        return
      }
      if (!reg.test(this.val)) {
        this.isShowTip = true
        this.tipTxt = `请输入正确的${this.title}`
        return
      } else {
        this.isShowTip = false
      }
      this.$emit('promptSure', val)
    },
    // 取消
    promptCancel () {
      this.closePrompt()
    },
    // 关闭
    closePrompt () {
      this.$emit('closePrompt')
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/theme'
.content
  height: 80px
  /* display: flex
  justify-content: center
  align-items: center
  text-align: center */
  font-size: 18px
  margin-top: 20px
  padding: 0 20px
  .tip
    display: inline-block
    padding-top: 12px
    font-size: 12px
    color: $danger
.pop-btn-box
  text-align: right
  padding-top: 0
  button
    margin: 0 0 0 12px
</style>
