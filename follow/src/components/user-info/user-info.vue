<template lang="html">
  <div class="">
    <scroll class="user-info" :class="{'m': methodName === 'm'}">
      <div class="">
        <div class="detail">
          <ul>
            <li>用户编号: {{userData.userno}}</li>
            <li>姓名: {{userData.nickName}}</li>
            <li>性别: {{sex(userData.sex)}}</li>
            <li>手机号码: {{userData.phone}}
              <button class="needsclick" @click="copy(userData.phone)">复制</button>
              <textarea name="name" rows="8" cols="80" ref="ipt" v-model="userData.phone"></textarea>
            </li>
          </ul>
          <ul>
            <li>已看视频次数: {{userData.videotime}}次</li>
            <li>已看视频个数: {{userData.videocount}}个</li>
          </ul>
          <ul>
            <li>累计获得红包金额: {{userData.wmoney}}元</li>
            <li>已提现金额: {{userData.txmoney}}元</li>
            <li>未提现金额: {{userData.notxmoney}}元</li>
          </ul>
          <ul>
            <li>首次登陆时间: {{_timeFormate(userData.firstLoginTime)}}</li>
            <li>最近登陆时间: {{_timeFormate(userData.lastLoginTime)}}</li>
          </ul>
          <ul>
            <li>是否愿意接受联系: {{userData.acceptContact}}</li>
            <li>用户备注: {{userData.remark}}</li>
            <li class="notice" v-show="userData.description">
              申请说明: {{userData.description}}
            </li>
          </ul>
          <button class="push-qr disabled" v-show="methodName !== 'm' && isPush">
            二维码已推送
          </button>
          <button class="push-qr needsclick" v-show="methodName !== 'm' && !isPush" @click="pushQr">
            推送二维码
          </button>
        </div>
        <div class="tip" v-show="methodName === 'm'">
          <span>申请时间: {{_timeFormate(userData.applyTime)}}</span> <span>申请人: {{userData.userName}}</span>
        </div>
        <!-- <div class="" v-show="methodName === 'm'">
          <div class="btn-box" v-show="userData.sof === 's'">
            <button class="needsclick remove" @click="reject">驳回申请</button>
            <button type="button" name="button" class="needsclick modify" @click="receive">同意接收</button>
          </div>
          <div class="btn-box" v-show="userData.sof === 'f'">
            <button class="needsclick revoke" @click="revoke">撤回申请</button>
          </div>
        </div> -->
        <div class="btn-box" v-show="methodName !== 'm' && status !== 6">
          <button class="needsclick remove" @click="move">移交申请</button>
          <button type="button" name="button" class="needsclick modify" @click="modify">修改用户信息</button>
        </div>
      </div>
    </scroll>
    <edit-user
      @closeEdit="closeEdit"
      @sureEdit="sureEdit"
      @cancelEdit="cancelEdit"
      :show="editPop"
      :userInfo="userData"
    ></edit-user>
    <move-apply
      @closeApply="closeApply"
      @sureApply="sureApply"
      @cancelApply="cancelApply"
      :show="applyPop"
      :followJob="followJob"
    ></move-apply>
    <msg :show="msgShow" :msg="msgTit"></msg>
    <loading :show="loadingShow" :title="loadingTit"></loading>
  </div>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import EditUser from 'components/edit-user/edit-user'
import MoveApply from 'components/move-apply/move-apply'
import {getUserData, getMoveAccountInfo, getAllFollowJobs, isPush, pushQrcode, moveApply, updateUser} from 'api/userInfo'
import {timeFormate, storage} from 'common/js/common'
import {ERR_OK, TIME_LIMIT} from 'api/config'
import Msg from 'base/msg/msg'
import Loading from 'base/loading/loading'
export default {
  data () {
    return {
      status: null,
      loadingTit: '', // 加载文本
      loadingShow: false,
      msgTit: '', //
      msgShow: false,
      applyTime: null, // 申请时间
      userName: null, // 申请人名称
      methodName: null,
      editPop: false, // 修改用户信息
      // userInfo: {}, // 用户信息
      path: null,
      isPush: true, // 是否推送
      followJob: [], // ***
      applyPop: false, // 移交申请
      userId: null, // 用户id
      openid: null,
      userData: {
        userno: null, // 用户编号
        nickName: null, // 姓名
        sex: null, // 性别
        phone: null, // 手机号码
        videotime: null, // 已看视频次数
        videocount: null, // 视频个数
        wmoney: null, // 累计获得红包金额
        txmoney: null, // 提现金额
        notxmoney: null, // 未提现金额
        firstLoginTime: null, // 首次登陆时间
        lastLoginTime: null, // 最后登陆时间
        acceptContact: null, // 是否愿意接受联系
        remark: null, // 用户备注
        description: null // 申请说明
      }
    }
  },
  created () {
    this.status = storage('status')
    this.openid = storage('openid')
    this.methodName = storage('methodName')
    this.userId = storage('userId')
    this.path = storage('path')
    // console.log(this.userId)
    // console.log(this.methodName)
    if (this.methodName === 'm') { // 我的移动
      this._getMoveAccountInfo()
    }
    this._getUserData()
    this._isPush()
  },
  methods: {
    // 复制电话号码
    copy (nu) {
      this.msgShow = true
      this.$refs.ipt.select()
      document.execCommand('copy')
      this.msgTit = '复制成功'
      this.msgTimerFn()
    },
    // 修改用户
    modify () {
      this.editPop = true
    },
    // 确定修改用户
    sureEdit (data) {
      data.openid = this.openid
      this.loadingShow = true
      this.loadingTit = '修改中...'
      updateUser(data, (res) => {
        this.loadingShow = false
        this.msgShow = true
        if (res.code === ERR_OK) {
          this.msgTit = '用户修改成功'
          this.editPop = false
        } else {
          this.msgTit = res.msg
        }
        this.msgTimerFn()
      })
    },
    // 取消修改用户
    cancelEdit () {
      this._getUserData()
      this.editPop = false
    },
    // 关闭修改用户
    closeEdit () {
      this._getUserData()
      this.editPop = false
    },
    // 确定移交申请提交
    sureApply (data) {
      data.openid = this.openid
      this.loadingShow = true
      this.loadingTit = '移交中...'
      moveApply(data, (res) => {
        this.loadingShow = false
        this.msgShow = true
        if (res.code === ERR_OK) {
          this.msgTit = '移交成功'
          setTimeout(() => {
            this.$router.push({
              path: this.path
            })
          }, TIME_LIMIT)
        } else {
          this.msgTit = res.msg
        }
        this.applyPop = false
        this.msgTimerFn()
      })
    },
    // 推送本人二维码
    pushQr () {
      this.loadingShow = true
      this.loadingTit = '二维码推送中...'
      pushQrcode({openid: this.openid}, (res) => {
        this.loadingShow = false
        this.msgShow = true
        if (res.code === ERR_OK) {
          console.log(res)
          this.msgTit = '二维码推送成功'
          this.isPush = true
          // this.userData = Object.assign({}, this.userData, res.data)
        } else {
          this.msgTit = res.msg
        }
        this.msgTimerFn()
      })
    },
    // 性别
    sex (n) {
      let res = (n === 1 ? '男' : (n === 2 ? '女' : '未知'))
      return res
    },
    // 是否已推送二维码
    _isPush () {
      isPush({openid: this.openid}, (res) => {
        if (res.code === ERR_OK) {
          this.isPush = res.data
        } else {}
      })
    },
    // 移交关闭
    closeApply () {
      this.applyPop = false
      this.followJob = []
    },
    // 移交取消
    cancelApply () {
      this.applyPop = false
      this.followJob = []
    },
    // 移交申请
    move () {
      let loginData = storage('loginData')
      // console.log(loginData)
      getAllFollowJobs({}, (res) => {
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].nickName === loginData.username) {
            res.data.splice(i, 1)
            break
          }
        }
        this.followJob = res.data
        this.applyPop = true
      })
    },
    _timeFormate (d) {
      return timeFormate(d, '/')
    },
    _getMoveAccountInfo () {
      // 我的移交详情
      getMoveAccountInfo({id: this.userId}, (res) => {
        if (res.code === ERR_OK) {
          this.userData = Object.assign({}, this.userData, res)
        } else {}
      })
    },
    _getUserData () {
      this.loadingShow = true
      this.loadingTit = '加载中...'
      // 我的任务详情
      getUserData({openid: this.openid}, (res) => {
        this.loadingShow = false
        if (res.code === ERR_OK) {
          // console.log(res.data)
          this.userData = Object.assign({}, this.userData, res.data)
        } else {
          this.msgShow = true
          this.msgTit = res.msg
          this.msgTimerFn()
        }
      })
    },
    msgTimerFn () {
      let timer = setTimeout(() => {
        clearTimeout(timer)
        this.msgShow = false
      }, TIME_LIMIT)
    }
  },
  components: {
    Scroll,
    EditUser,
    MoveApply,
    Msg,
    Loading
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.user-info
  position: absolute
  left: 0
  top: 4px
  right: 0
  bottom: 0
  margin: auto
  overflow: hidden
  &.m
    bottom: 60px
.detail
  width: 100%
  position: relative
  background-color: $color-background
  padding: 2px 7px 0
  /* margin-top: 4px */
  b-radius(5px)
  box-shadow: 0 0 1px $color-background-active
  font-size: $font-size-medium-s
  ul
    position: relative
    padding: 10px
    button
      font-size: $font-size-small-sm
      color: $color-text-active
      b-radius(2px)
      overflow: hidden
      background-color: $color-background
      border: 1px solid $color-background-active
      padding: 0 6px
      margin-left: 10px
    &:after
      content: ''
      width: 100%
      height: 1px
      position: absolute
      bottom: 0
      left: 0
      border-bottom: 1px dashed $color-background-active
    &:nth-last-of-type(1):after
      display: none
    .notice
      color: $color-text-nti
  .push-qr
    position: absolute
    right: 10px
    top: 10px
    font-size: $font-size-small
    color: $color-text-btn
    padding: 3px 7px
    b-radius(13px)
    background: linear-gradient(#FF7558, #FE4346)
  .disabled
    background: #999
    color: #fff
  li
    line-height: 1.5
    textarea
      width: 0
      height: 0
      position: absolute
      overflow: hidden
      opacity: 0
.tip
  font-size: $font-size-small
  color: $color-text-sub
  margin-top: 10px
  margin-left: 6px
  span
    margin-right: 20px
.btn-box
  display: flex
  justify-content: center
  margin-top: 15px
  padding-bottom: 20px
  button
    width: 114px
    height: 28px
    padding: 0
    b-radius(2px)
    overflow: hidden
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
