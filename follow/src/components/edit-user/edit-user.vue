<template lang="html">
  <div class="pop m-apply" v-show="show">
    <div class="mask"></div>
    <div class="pop-main main-wrap">
      <div class="close">
        <div class="needsclick" @click="close">
          <i class="iconfont icon-guanbi1"></i>
        </div>
      </div>
      <div class="pop-content main">
        <div class="pop-title">
          修改用户信息
        </div>
        <div class="content">
          <div class="">
            <label>姓名:</label>
            <input class="name" type="text" name="" value="" v-model="userInfo.nickName" ref="nickName">
          </div>
          <div class="sex-box">
            <label>性别:</label>
            <input type="radio" name="sex" id="male" value="" :checked="userInfo.sex === 1" @click="sexFn(1)"><label class="set-font" for="male">男</label>
            <input type="radio" name="sex" id="female" value="" :checked="userInfo.sex === 2" @click="sexFn(2)"><label class="set-font" for="female">女</label>
            <input type="radio" name="sex" id="unKnow" value="" :checked="userInfo.sex === 0" @click="sexFn(0)"><label class="set-font" for="unKnow">未知</label>
          </div>
          <div class="">
            <label>备注:</label>
            <textarea v-model="userInfo.remark" ref="remark" placeholder="请输入备注(250)字以内" maxlength="250"></textarea>
          </div>
          <div class="btn-box">
            <button class="needsclick btn cancel" @click="cancel">取消</button>
            <button class="needsclick btn sure" type="button" name="button" @click="sure">确定</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    userInfo: {
      type: Object,
      default: Function
    }
  },
  data () {
    return {
      sex: null,
      remark: null,
      nickName: null
    }
  },
  methods: {
    sexFn (sex) {
      this.sex = sex
      this.userInfo.sex = sex
    },
    // 取消
    cancel () {
      this.$emit('cancelEdit')
    },
    // 确定
    sure () {
      let nickName = this.$refs.nickName.value
      let remark = this.$refs.remark.value
      let sex = null
      if (this.sex === null) {
        sex = this.userInfo.sex
      } else {
        sex = this.sex
      }
      console.log(sex)
      this.$emit('sureEdit', {remark, nickName, sex})
    },
    // 关闭
    close () {
      this.$emit('closeEdit')
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.m-apply
  .content
    padding: 0 25px
    &>div
      margin-top: 10px
    label
      font-size: $font-size-large-s
      color: $color-text-m
    .name
      width: 168px
      height: 28px
      padding: 0 5px
      border: 1px solid rgb(169, 169, 169)
      background-color: #F7F7F7
      outline: none
    textarea
      width: 166px
      height: 93px
      padding: 5px
      vertical-align: top
      background-color: #F7F7F7
      outline: none
    .sex-box
      input
        vertical-align: middle
        margin-top: 0
    .set-font
      font-size: $font-size-small-x
</style>
