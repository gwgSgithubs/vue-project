<template lang="html">
  <div class="">
    <div class="login user" v-show="userShow">
      <div class="login-img-box">
        <img src="" alt="">
      </div>
      <div class="login-ipt">
        <div class="ipt-box">
          <i class="iconfont icon-yonghu1"></i>
          <input type="text" name="name" value="" placeholder="请输入用户名" v-model="username">
        </div>
        <div class="ipt-box">
          <i class="iconfont icon-suo1"></i>
          <input :type="type" name="password" value="" placeholder="请输入密码" autocomplete="new-password" v-model="password">
          <i class="iconfont icon-kekan show" @click="showPass"></i>
        </div>
      </div>
      <div class="login-notice" v-show="userLoginErr">
        <span>提示: {{userLoginErrTxt}}</span>
      </div>
      <div class="login-btn">
        <button type="button" class="needsclick" name="button" @click="userLogin">登录</button>
      </div>
      <div class="login-switch">
        <span @click="switchPhoneLogin">切换手机登录</span>
        <span @click="switchForgerPass">忘记密码?</span>
      </div>
    </div>
    <div class="login phone" v-show="phoneShow">
      <div class="login-img-box">
        <img src="" alt="">
      </div>
      <div class="login-ipt">
        <div class="ipt-box">
          <input type="text" name="name" value="" placeholder="手机号码" v-model="phoneLoginNumber">
          <div class="postfix">
            +86
          </div>
        </div>
        <div class="ipt-box">
          <input type="text" name="password" value="" placeholder="验证码" v-model="phoneLoginCode">
          <div class="code" :class="{'err': !phoneLoginTiming}" @click="getPhoneLoginCode">
            {{phoneLoginTimeTxt}}
          </div>
        </div>
      </div>
      <div class="login-notice" v-show="phoneLoginErr">
        <span>提示: {{phoneLoginErrTxt}}</span>
      </div>
      <div class="login-btn">
        <button type="button" name="button" @click="phoneLogin">登录</button>
      </div>
      <div class="login-switch">
        <span @click="switchUser">切换账户登录</span>
      </div>
    </div>
    <div class="login phone" v-show="forgetShow">
      <div class="login-ipt">
        <div class="ipt-box">
          <input type="text" name="name" value="" placeholder="手机号码" v-model="forgotPwNumber">
          <div class="postfix">
            +86
          </div>
        </div>
        <div class="ipt-box">
          <input type="text" name="password" value="" placeholder="验证码" v-model="forgotPwCode">
          <div class="code" :class="{'err': !forgotPwTiming}" @click="getForgotPwCode">
            {{forgotPwTimeTxt}}
          </div>
        </div>
      </div>
      <div class="login-notice" v-show="forgotPwErr">
        <span>提示: {{forgotPwErrTxt}}</span>
      </div>
      <div class="login-btn">
        <button type="button" name="button" @click="checkCode">提交验证码</button>
      </div>
      <div class="login-switch">
        <span @click="switchUser">切换账户登录</span>
      </div>
    </div>
    <div class="login phone" v-show="newShow">
      <div class="login-ipt">
        <div class="ipt-box">
          <input type="text" name="name" value="" placeholder="输入密码" v-model="pw">
          <!-- <div class="postfix">
            +86
          </div> -->
        </div>
        <div class="ipt-box">
          <input type="text" name="password" value="" placeholder="确认密码" v-model="cPw">
        </div>
      </div>
      <div class="login-notice" v-show="pwErr">
        <span>提示: {{pwErrTxt}}</span>
      </div>
      <div class="login-btn">
        <button type="button" name="button" @click="savePw">提交保存</button>
      </div>
      <div class="login-switch">
        <span @click="switchUser">切换账户登录</span>
      </div>
    </div>
    <msg :show="msgShow" :msg="msgTit"></msg>
    <loading :show="loadingShow" :title="loadingTit"></loading>
  </div>
</template>

<script>
import {login, postPhoneLogin, getLoginCode, getCheckCode, postSavePw} from 'api/login'
import {ERR_OK, TIME_LIMIT} from 'api/config'
import Loading from 'base/loading/loading'
import Msg from 'base/msg/msg'
import {storage} from 'common/js/common'
export default {
  data () {
    return {
      msgTit: '', //
      msgShow: false,
      loadingTit: '', // 加载文本
      loadingShow: false,
      userShow: true,
      phoneShow: false,
      forgetShow: false,
      newShow: false,
      // 用户登录
      userLoginErr: false, // 用户登录错误提示
      userLoginErrTxt: '', // 用户登录错误提示语
      type: 'password', // 密码是否可见
      username: '', // 用户名
      password: '', // 密码
      // 手机登录
      phoneLoginErr: false, // 手机登录错误提示
      phoneLoginErrTxt: '', // 手机登录错误提示语
      phoneLoginNumber: '', // 手机登录手机号
      phoneLoginCode: '', // 手机登录验证码
      phoneLoginTime: 60,
      phoneLoginTimeTxt: '获取验证码',
      phoneLoginTiming: true, // 控制重复点击
      // 忘记密码
      forgotPwErr: false, // 忘记密码错误提示
      forgotPwErrTxt: '', // 忘记密码错误提示语
      forgotPwNumber: '', // 忘记密码手机号
      forgotPwCode: '', // 忘记密码验证码
      forgotPwTime: 60,
      forgotPwTimeTxt: '获取验证码',
      forgotPwTiming: true, // 控制重复点击
      // 新密码设置
      pw: '', // 新密码
      cPw: '', // 确认密码
      pwErr: false, // 新密码错误提示
      pwErrTxt: '' // 新密码错误提示语
    }
  },
  created () {
    let res = storage('loginData')
    // console.log(res)
    if (res) {
      this.$router.push({
        path: 'task'
      })
    }
  },
  methods: {
    // 初始化
    formFormate () {
      // 用户登录
      this.userLoginErr = false // 账户登录错误提示
      this.userLoginErrTxt = '' // 账户登录错误提示语
      this.username = '' // 用户清空
      this.password = '' // 密码清空
      // 手机登录
      this.phoneLoginErr = false // 手机登录错误提示
      this.phoneLoginErrTxt = '' // 手机登录错误提示语
      this.phoneLoginNumber = '' // 手机登录手机号
      this.phoneLoginCode = '' // 手机登录验证码
      // 忘记密码
      this.forgotPwErr = false // 忘记密码错误提示
      this.forgotPwErrTxt = '' // 忘记密码错误提示语
      this.forgotPwNumber = '' // 忘记密码手机号
      this.forgotPwCode = '' // 忘记密码验证码
      // 新密码设置
      this.pw = '' // 新密码
      this.cPw = '' // 确认密码
      this.pwErr = false // 新密码错误提示
      this.pwErrTxt = '' // 新密码错误提示语
    },
    //
    switchNewPw () {
      this.userShow = false
      this.phoneShow = false
      this.forgetShow = false
      this.newShow = true
    },
    // 切换账户登录
    switchUser () {
      this.userShow = true
      this.phoneShow = false
      this.forgetShow = false
      this.newShow = false
      this.formFormate()
    },
    // 保存提交
    savePw () {
      let pw = this.pw
      let cPw = this.cPw
      let reg = /^(?![a-zA-Z]+$)(?![0-9]+$)(?![\W_]+$)[a-zA-Z0-9\W_]{8,32}$/
      let regPw = pw.replace(/(^\s*)|(\s*$)/g, '')
      let regCpw = cPw.replace(/(^\s*)|(\s*$)/g, '')
      let regRes = reg.test(pw)
      if (!regPw) {
        this.pwErr = true
        this.pwErrTxt = '密码不能为空'
        return
      }
      if (!regCpw) {
        this.pwErr = true
        this.pwErrTxt = '确认密码不能为空'
        return
      }
      if (pw !== cPw) {
        this.pwErr = true
        this.pwErrTxt = '密码与确认密码不一致'
        return
      }
      if (!regRes) {
        this.pwErr = true
        this.pwErrTxt = '密码长度8-32位, 需包含数字,字母,符号至少2种以上元素'
        return
      }
      this.loadingShow = true // 加载显示
      this.loadingTit = '保存中...'
      postSavePw({phone: this.forgotPwNumber, pwd: pw}, (res) => {
        this.loadingShow = false // 加载隐藏
        if (res.code === ERR_OK) {
          this.msgShow = true // 提示框显示
          this.msgTit = '保存成功请重新登录'
          let timer = setTimeout(() => {
            this.msgShow = false
            this.switchUser()
            clearTimeout(timer)
          }, TIME_LIMIT)
        } else {
          this.pwErr = true
          this.pwErrTxt = res.msg
        }
      })
    },
    // 忘记密码
    switchForgerPass () {
      this.userShow = false
      this.phoneShow = false
      this.forgetShow = true
      this.newShow = false
      this.formFormate()
    },
    // 切换手机登录
    switchPhoneLogin () {
      this.userShow = false
      this.phoneShow = true
      this.forgetShow = false
      this.newShow = false
      this.formFormate()
    },
    // 提交验证码
    checkCode () {
      let regRes = this.regPhone(this.forgotPwNumber)
      if (!regRes.status) {
        this.forgotPwErr = true
        this.forgotPwErrTxt = regRes.txt
        return
      }
      if (!this.forgotPwCode) {
        this.forgotPwErr = true
        this.forgotPwErrTxt = '验证码不能为空'
        return
      }
      let checkData = {
        userPhone: this.forgotPwNumber,
        code: this.forgotPwCode
      }
      this.loadingShow = true // 加载显示
      this.loadingTit = '验证中...'
      getCheckCode(checkData, (res) => {
        this.loadingShow = false // 加载隐藏
        if (res.code === ERR_OK) {
          this.msgShow = true // 提示框显示
          this.msgTit = '验证成功'
          let timer = setTimeout(() => {
            this.msgShow = false
            this.switchNewPw()
            clearTimeout(timer)
          }, TIME_LIMIT)
        } else {
          this.forgotPwErr = true
          this.forgotPwErrTxt = res.msg
        }
      })
    },
    // 忘记密码获取验证码
    getForgotPwCode () {
      let timer = null
      let timerMsg = null
      let regRes = this.regPhone(this.forgotPwNumber)
      if (!regRes.status) {
        this.forgotPwErr = true
        this.forgotPwErrTxt = regRes.txt
        return
      }
      if (this.forgotPwTiming) {
        this.forgotPwTiming = false
        this.forgotPwTime = this.forgotPwTime - 1
        this.forgotPwTimeTxt = `${this.forgotPwTime}秒后重发`
        timer = setInterval(() => {
          this.forgotPwTime = this.forgotPwTime - 1
          this.forgotPwTimeTxt = `${this.forgotPwTime}秒后重发`
          if (this.forgotPwTime === 0) {
            this.forgotPwTiming = true
            this.forgotPwTime = 60
            this.forgotPwTimeTxt = '获取验证码'
            clearInterval(timer)
          }
        }, 1000)
      } else {
        return false
      }
      getLoginCode({userPhone: this.forgotPwNumber}, (res) => {
        this.msgShow = true // 提示框显示
        if (res.code !== ERR_OK) {
          this.msgTit = res.msg
          this.forgotPwTiming = true
          this.forgotPwTime = 60
          this.forgotPwTimeTxt = '获取验证码'
          clearInterval(timer)
        } else {
          this.msgTit = '验证码已发送'
        }
        timerMsg = setTimeout(() => {
          this.msgShow = false
          clearTimeout(timerMsg)
        }, TIME_LIMIT)
      })
    },
    // 获取手机登录验证码
    getPhoneLoginCode () {
      let timer = null
      let timerMsg = null
      let regRes = this.regPhone(this.phoneLoginNumber)
      if (!regRes.status) {
        this.phoneLoginErr = true
        this.phoneLoginErrTxt = regRes.txt
        return
      }
      if (this.phoneLoginTiming) {
        this.phoneLoginTiming = false
        this.phoneLoginTime = this.phoneLoginTime - 1
        this.phoneLoginTimeTxt = `${this.phoneLoginTime}秒后重发`
        timer = setInterval(() => {
          this.phoneLoginTime = this.phoneLoginTime - 1
          this.phoneLoginTimeTxt = `${this.phoneLoginTime}秒后重发`
          if (this.phoneLoginTime === 0) {
            this.phoneLoginTiming = true
            this.phoneLoginTime = 60
            this.phoneLoginTimeTxt = '获取验证码'
            clearInterval(timer)
          }
        }, 1000)
      } else {
        return false
      }
      getLoginCode({userPhone: this.phoneLoginNumber}, (res) => {
        this.msgShow = true // 提示框显示
        if (res.code !== ERR_OK) {
          this.msgTit = res.msg
          this.phoneLoginTiming = true
          this.phoneLoginTime = 60
          this.phoneLoginTimeTxt = '获取验证码'
          clearInterval(timer)
        } else {
          this.msgTit = '验证码已发送'
        }
        timerMsg = setTimeout(() => {
          this.msgShow = false
          clearTimeout(timerMsg)
        }, TIME_LIMIT)
      })
    },
    // 密码是否可见
    showPass () {
      this.type = (this.type === 'password' ? 'text' : 'password')
    },
    // 手机号码验证
    regPhone (nu) {
      let obj = {
        status: true
      }
      let phone = nu.replace(/(^\s*)|(\s*$)/g, '')
      let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[0-9]|18[0-9]|14[57])[0-9]{8}$/
      if (!phone) {
        obj.status = false
        obj.txt = '手机号码不能为空'
        return obj
      }
      if (!reg.test(phone)) {
        obj.status = false
        obj.txt = '请输入正确的手机号码'
        return obj
      }
      return obj
    },
    // 手机登录
    phoneLogin () {
      let regRes = this.regPhone(this.phoneLoginNumber)
      if (!regRes.status) {
        this.phoneLoginErr = true
        this.phoneLoginErrTxt = regRes.txt
        return
      }
      if (!this.phoneLoginCode) {
        this.phoneLoginErr = true
        this.phoneLoginErrTxt = '验证码不能为空'
        return
      }
      let loginData = {
        mobile: this.phoneLoginNumber,
        code: this.phoneLoginCode
      }
      console.log(loginData)
      this.loadingShow = true // 加载显示
      this.loadingTit = '登录中...'
      postPhoneLogin(loginData, (res) => {
        this.loadingShow = false // 加载隐藏
        if (res.code === ERR_OK) {
          this.msgShow = true // 提示框显示
          this.msgTit = '登录成功'
          document.title = '福音跟进客户端'
          let timer = setTimeout(() => {
            this.msgShow = false
            this.phoneLoginNumber = ''
            this.phoneLoginCode = ''
            this.$router.push({
              path: 'task'
            })
            clearTimeout(timer)
          }, TIME_LIMIT)
          storage('loginData', res.data)
        } else {
          this.phoneLoginErr = true
          this.phoneLoginErrTxt = res.msg
        }
      })
    },
    // 用户登录
    userLogin () {
      if (!this.username || !this.password) {
        this.userLoginErr = true
        this.userLoginErrTxt = '用户名或密码不能为空'
        return
      }
      let loginData = {
        username: this.username,
        password: this.password
      }
      this.loadingShow = true // 加载显示
      this.loadingTit = '登录中...'
      login(loginData, (res) => {
        this.loadingShow = false // 加载隐藏
        if (res.code === ERR_OK) {
          this.msgShow = true // 提示框显示
          this.msgTit = '登录成功'
          document.title = '福音跟进客户端'
          // 我的任务
          let timer = setTimeout(() => {
            this.msgShow = false
            this.username = ''
            this.password = ''
            this.$router.push({
              path: 'task'
            })
            clearTimeout(timer)
          }, TIME_LIMIT)
          storage('loginData', res.data)
        } else {
          this.userLoginErr = true
          this.userLoginErrTxt = `${res.msg}, 请重试`
        }
      })
    }
  },
  components: {
    Loading,
    Msg
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.login-switch
  display: flex
  justify-content: space-between
  margin-top: 20px
  color: $color-text-sub
.login-notice
  color: $color-text-nti
  font-size: $font-size-small
  padding-bottom: 16px
  opacity: 0.8
button
  width: 100%
  padding: 10px
  border-radius: 2px
  background-color: $color-background-active
  color: $color-text-btn
  font-size: $font-size-large-s
  &:active
    opacity: 0.4
input
  width: 100%
  padding: 18px 0
  font-size: $font-size-medium
  color: $color-text-m
  &::-webkit-input-placeholder
    ipt-set($font-size-medium, $color-text-sub)
.login-ipt
  margin-bottom: 36px
.ipt-box
  position: relative
  &:after
    content: ''
    width: 100%
    height: 1px
    position: absolute
    bottom: 0
    left: 0
    z-index: 999
    background-color: $color-background-line
.login
  width: 100%
  height: 100%
  position: fixed
  top: 0
  right: 0
  bottom: 0
  left: 0
  z-index: 999
  padding: 36px
  background-color: $color-background
  .login-img-box
    margin-top: 10px
    margin-bottom: 50px
    img
      width: 76px
      height: 76px
      margin: auto
      border-radius: 10px
      background-color: $color-background-df
.user
  .ipt-box
    padding-left: 30px
    i
      width: 20px
      height: 20px
      position: absolute
      left: 0
      top: 17px
      font-size: 20px
      color: $color-text-sub
      font-weight: bold
    i.show
      left: auto
      right: 18px
.phone
  .ipt-box
    &>div
      position: absolute
      right: 10px
      top: 17px
    .postfix
      color: $color-text-sub
      font-size: $font-size-medium
    .code
      color: $color-text-btn
      font-size: $font-size-small-x
      background-color: $color-background-active
      padding: 4px 12px
      border-radius: 12px
      &.err
        background-color: $color-background-df
        opacity: 0.5
</style>
