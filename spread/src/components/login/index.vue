<template lang="html">
  <div class="login">
    <img src="~common/images/icon-login.png" alt="">
    <div class="main-wrap">
      <div class="main">
        <h1>管理系统</h1>
        <div class="">
          <el-tabs v-model="activeName" @tab-click="tabClick">
            <el-tab-pane label="账户密码登录" name="0">
              <div class="ipt-box">
                <div class="">
                  <div class="ipt-in">
                    <input type="text" name="" value="" placeholder="请输入账号" maxlength="30" v-model="username" ref="username">
                  </div>
                </div>
                <div class="ver-box">
                  <div class="ipt-in">
                    <input type="password" name="" value="" placeholder="请输入密码" maxlength="30" v-model="password" ref="password">
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="手机登录" name="1">
              <div class="ipt-box">
                <div class="">
                  <div class="ipt-in">
                    <input type="text" name="" value="" placeholder="请输入电话号码" maxlength="11" v-model="phone">
                  </div>
                </div>
                <div class="">
                  <div class="ipt-in">
                    <input type="text" name="" value="" placeholder="请输入验证码" maxlength="10" v-model="verCode">
                    <el-button type="primary" :disabled="disabled" size="small" @click="getVerCode">{{verCodeText}}</el-button>
                  </div>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
          <div class="ad-box">
            <div class="">
              <div class="remember" v-show="activeName === '0'">
                <el-checkbox v-model="rembPwd">记住密码</el-checkbox>
              </div>
              <div class="forgot">
                忘记密码?
              </div>
            </div>
          </div>
        </div>
        <div class="">
          <el-button type="primary" size="medium" round @click="login">登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {phoneReg} from 'common/js/util'
import {accountLogin} from 'api/login'
import {ERR_OK} from 'api/config'
import {storage} from 'common/js/common'
import {showLoading, hideLoading} from 'common/js/loading'
export default {
  data () {
    return {
      activeName: '0',
      rembPwd: true,
      disabled: false,
      username: null,
      password: null,
      phone: null,
      verCode: null,
      verCodeText: '获取验证码',
      downTime: 10,
      isGettingCode: false
    }
  },
  created () {
    let catchData = storage('catchData') || {}
    this.username = catchData.username
    this.password = catchData.password
    this.rembPwd = catchData.rembPwd
  },
  methods: {
    // 登录
    login () {
      // 账户密码登录
      if (this.activeName === '0') {
        // 是否输入账号
        if (!this.username) {
          this.$confirm('请输入账号', '提示', {
            confirmButtonText: '确定',
            showCancelButton: false,
            type: 'warning',
            center: true
          }).then(() => {
            this.$refs.username.focus()
          })
          return false
        }
        // 是否输入密码
        if (!this.password) {
          this.$confirm('请输入密码', '提示', {
            confirmButtonText: '确定',
            showCancelButton: false,
            type: 'warning',
            center: true
          }).then(() => {
            this.$refs.password.focus()
          })
          return false
        }
        showLoading()
        accountLogin({username: this.username, password: this.password}, (res) => {
          hideLoading()
          if (res.code === ERR_OK) {
            // loading.close()
            this.$router.push({
              path: 'index'
            })
            let data = res.data
            // 是否记住密码
            let catchData = {}
            if (this.rembPwd) {
              catchData.rembPwd = true
              catchData.username = this.username
              catchData.password = this.password
            } else {
              catchData.rembPwd = false
              catchData.username = null
              catchData.password = null
            }
            // 缓存username 和 token
            storage('requestData', data)
            // 是否记住密码
            storage('catchData', catchData)
          } else {
            this.$confirm(res.msg, '提示', {
              confirmButtonText: '确定',
              showCancelButton: false,
              type: 'warning',
              center: true
            })
          }
        })
        return false
      }
      // 手机登录
      if (this.activeName === '1') {
        return false
      }
      // this.$router.push({
      //   path: '/index'
      // })
    },
    tabClick (tab) {
      this.activeName = tab.index
    },
    // 获取验证码
    getVerCode () {
      this.$alert('请输入正确的手机号码', {
        confirmButtonText: '确定'
      })
      if (phoneReg(this.phone)) {

      }
      if (!this.isGettingCode) {
        this.isGettingCode = true
        this.disabled = true
        this.verCodeText = `${this.downTime}秒后重新获取`
        let timer = setInterval(() => {
          this.verCodeText = `${--this.downTime}秒后重新获取`
          console.log(this.downTime)
          if (this.downTime === 0) {
            this.downTime = 10
            this.isGettingCode = false
            this.disabled = false
            this.verCodeText = '获取验证码'
            clearInterval(timer)
          }
        }, 1000)
      }
    }
  },
  watch: {
    checked (d) {
      console.log(d)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.el-tabs >>> .el-tabs__nav-wrap::after
    display: none
.login
  width: 100%
  height: 100%
  position: relative
  overflow: hidden
  h1
    font-size: 40px
    margin-bottom: 30px
  img
    width: 1920px
    position: absolute
    left: 50%
    top: 50%
    transform: translate3d(-50%, -50%, 0)
  .main-wrap
    width: 1160px
    position: absolute
    top: 145px
    left: 50%
    margin-left: -580px
  .main
    width: 542px
    height: 648px
    position: absolute
    right: 0
    top: 0
    padding: 70px
    box-sizing: border-box
    .el-tabs__header
      margin: 0
    .ad-box
      &:after
        content: ''
        display: block
        clear: both
    .remember
      float: left
    .forgot
      float: right
      font-size: 14px
    .el-button--medium.is-round
      width: 100%
      height: 60px
      border-radius: 60px
      font-size: 25px
    >>> .el-tabs__item
      font-size: 21px
    .ad-box
      padding: 10px 0 60px
      &>div
        height: 20px
    .ipt-in
      height: 40px
      display: flex
      justify-content: space-between
      align-items: center
      input
        flex: 1
    .ipt-box
      &>div
        position: relative
        padding: 60px 0 15px 10px
        input
          width: 100%
          font-size: 19px
          border: none
          outline: none
        &:after
          content: ''
          width: 100%
          height: 2px
          position: absolute
          left: 0
          bottom: 0
          background-color: #999
</style>
