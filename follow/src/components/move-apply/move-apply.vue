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
          移交申请
        </div>
        <div class="content">
          <div class="">
            <label>移至:</label>
            <select class="" name="" ref="toUserId">
              <option :value="item.id" v-for="(item, index) in followJob" :key="index">{{item.nickName}}</option>
            </select>
          </div>
          <div class="">
            <label>说明:</label>
            <textarea v-model="description" placeholder="请输入说明(250)字以内"></textarea>
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
  data () {
    return {
      description: null
    }
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    followJob: {
      type: Array,
      default: Function
    }
  },
  methods: {
    // 取消
    cancel () {
      this.$emit('cancelApply')
    },
    // 确定
    sure () {
      this.$emit('sureApply', {
        toUserId: this.$refs.toUserId.value,
        description: this.description
      })
    },
    // 关闭
    close () {
      this.$emit('closeApply')
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
    select
      width: 168px
      height: 28px
      background-color: #F7F7F7
      outline: none
    textarea
      width: 156px
      height: 117px
      padding: 5px
      vertical-align: top
      background-color: #F7F7F7
      outline: none
</style>
