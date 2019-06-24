<template lang="html">
  <div class="info">
    <div class="top">
      <div class="banner">
        <i class="iconfont icon-gengduo back" @click="back"></i>
        用户详情
      </div>
      <tab></tab>
    </div>
    <div class="main">
      <router-view></router-view>
    </div>
    <div class="" v-show="methodName === 'm'">
      <div class="btn-box" v-show="sof === 's'">
        <button class="needsclick remove" @click="reject(0)">驳回申请</button>
        <button type="button" name="button" class="needsclick modify" @click="receive(1)">同意接收</button>
      </div>
      <div class="btn-box" v-show="sof === 'f'">
        <button class="needsclick revoke" @click="revoke(2)">撤回申请</button>
      </div>
    </div>
    <msg :show="msgShow" :msg="msgTit"></msg>
    <loading :show="loadingShow" :title="loadingTit"></loading>
    <Confirm :show="confirmShow" :title="confirmTit" @cancel="cancel" @sure="sure"></Confirm>
  </div>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import Tab from 'components/tab/tab'
import {storage} from 'common/js/common'
import {postRevoke, revokeAndReceive} from 'api/userInfo'
import {ERR_OK, TIME_LIMIT} from 'api/config'
import Msg from 'base/msg/msg'
import Loading from 'base/loading/loading'
import Confirm from 'base/confirm/confirm'
export default {
  data () {
    return {
      path: '',
      methodName: null,
      sof: null,
      userId: null,
      msgTit: '', //
      msgShow: false,
      loadingTit: '', // 加载文本
      loadingShow: false,
      confirmTit: '',
      confirmShow: false,
      flag: null // 驳回申请: 0; 同意接收: 1; 撤回申请: 2
    }
  },
  created () {
    this.path = storage('path')
    this.methodName = storage('methodName')
    this.sof = storage('sof')
    this.userId = storage('userId')
  },
  methods: {
    // 确定
    sure () {
      this.confirmShow = false
      this.loadingShow = true
      this.loadingTit = this.loadingTit
      if (this.flag === 2) {
        postRevoke({id: this.userId, status: 2}, (res) => { // 撤回申请
          this.loadingShow = false
          this.msgShow = true
          if (ERR_OK === 200) {
            this.msgTit = '撤回申请成功'
            this.isPush = true
            this.msgTimerFn()
          } else {
            this.msgTit = res.msg
          }
        })
      } else if (this.flag === 1) { // 同意接收
        revokeAndReceive({id: this.userId, status: 1}, (res) => {
          this.loadingShow = false
          this.msgShow = true
          if (ERR_OK === 200) {
            this.msgTit = '接收成功'
            this.isPush = true
            this.msgTimerFn()
          } else {
            this.msgTit = res.msg
          }
        })
      } else if (this.flag === 0) { // 驳回申请
        revokeAndReceive({id: this.userId, status: -1}, (res) => {
          this.loadingShow = false
          this.msgShow = true
          if (ERR_OK === 200) {
            this.msgTit = '驳回申请成功'
            this.isPush = true
            this.msgTimerFn()
          } else {
            this.msgTit = res.msg
          }
        })
      }
    },
    // 取消
    cancel () {
      this.confirmShow = false
    },
    // 撤回申请
    revoke (flag) {
      this.flag = flag
      this.confirmTit = '是否撤回该申请？'
      this.loadingTit = '撤回申请中...'
      this.confirmShow = true
    },
    // 同意接收
    receive (flag) {
      this.flag = flag
      this.confirmTit = '是否同意接收？'
      this.loadingTit = '接收中...'
      this.confirmShow = true
    },
    // 驳回申请
    reject (flag) {
      this.flag = flag
      this.confirmTit = '是否驳回申请？'
      this.loadingTit = '驳回申请中...'
      this.confirmShow = true
    },
    back () {
      this.$router.push({
        path: this.path
      })
    },
    msgTimerFn () {
      let timer = setTimeout(() => {
        clearTimeout(timer)
        this.msgShow = false
        this.$router.push({
          path: this.path
        })
      }, TIME_LIMIT)
    }
  },
  components: {
    Scroll,
    Tab,
    Msg,
    Loading,
    Confirm
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.top
  width: 100%
  height: 96px
  position: absolute
  left: 0
  top: 0
  right: 0
  background-color: $color-background-m
.banner
  width: 100%
  height: 44px
  position: relative
  padding: 10px 12px
  font-weight: bold
  background-color: $color-background-active
  color: $color-text-btn
  font-size: $font-size-large
  text-align: center
  .back
    position: absolute
    left: 12px
    top: 11px
    font-size: 20px
    transform: rotate(180deg)
.main
  position: absolute
  top: 97px
  left: 10px
  right: 10px
  bottom: 0
.btn-box
  width: 100%
  position: absolute
  bottom: 0
  left: 0
  display: flex
  justify-content: center
  padding: 15px 0
  background-color: $color-background
  box-shadow: 0 0 10px $color-background-df
  button
    width: 114px
    b-radius(2px)
    overflow: hidden
    height: 28px
    font-size: $font-size-medium
    color: $color-text-btn
  .remove
    margin-right: 20px
    background-color: $color-background-warn
  .modify
    background-color: $color-background-active
  .revoke
    background-color: #F57C7C
</style>
