<template>
  <div class="main-container">
    <div class="header">
      <div class="header-wrap">
        <div class="title-box">
          <h1 class="">
            *****
          </h1>
          <div class="">
            <ul>
              <li v-for="(item, index) in topNav" :key="index">{{item.title}}</li>
            </ul>
          </div>
        </div>
        <div class="op-box">
          <div class="fullscreen">
            <i class="el-icon-location"></i>
          </div>
          <div class="fullscreen">
            <i class="el-icon-location"></i>
          </div>
          <div class="user-box">
            <div class="">
              admin
            </div>
            <ul>
              <li>个人资料</li>
              <li>修改密码</li>
              <li>修改手机号码</li>
              <li>注销</li>
            </ul>
          </div>
          <div class="fullscreen">
            <i class="el-icon-location"></i>
          </div>
        </div>
      </div>
    </div>
    <!-- SIDER -->
    <div class="sider">
      <el-col :span="24">
        <el-menu
          :unique-opened=true
          :default-active="$route.path"
          :router="isRouter"
          class="el-menu-vertical-demo"
          @select="handleSelect"
          background-color="#4C4F5A"
          text-color="#fff"
          active-text-color="#A2A5B0">
          <el-menu-item v-for="(item, index) in leftNav" v-if="item.children.length === 0" :key="index" :index="item.href">
            <i class="el-icon-location"></i>
            <span slot="title">{{item.title}}</span>
          </el-menu-item>
          <el-submenu :index="index + ''" v-for="(item, index) in leftNav" :key="index" v-if="item.children.length">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.title}}</span>
            </template>
            <el-menu-item v-if="item.children.length" v-for="(inItem, inIndex) in item.children" :key="inIndex" :index="inItem.href">{{inItem.title}}</el-menu-item>
          </el-submenu>
          <!-- <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>消息管理</span>
            </template>
            <el-menu-item index="ancManagement">公告管理</el-menu-item>
            <el-menu-item index="feedback">意见反馈</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <span>礼品订单</span>
            </template>
            <el-menu-item index="gifts">礼品管理</el-menu-item>
            <el-menu-item index="orders">订单管理</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>信息查询</span>
            </template>
            <el-menu-item index="userQuery">用户查询</el-menu-item>
          </el-submenu> -->
        </el-menu>
      </el-col>
    </div>
    <div class="right">
      <div class="nav">
        <div class="bread">
          <span>当前位置：</span>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item> -->
            <el-breadcrumb-item :to="{ path: '' }">系统首页</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="help">
          <i class="el-icon-location"></i>帮助
        </div>
      </div>
      <div class="main">
        <div class="">
          <router-view v-if="isRouterAlive"></router-view>
        </div>
      </div>
      <div class="footer">
        footer
      </div>
    </div>
  </div>
</template>

<script>
// import {getNavData} from 'api/index'
// import {reSetNavData} from 'common/js/common'
// import {ERR_OK} from 'api/config'
import menuData from 'common/json/menuData'
export default {
  name: 'App',
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true,
      isRouter: true,
      input2: '',
      fullScreen: false,
      // activeMenu: '1',
      // 左侧菜单
      leftNav: null,
      // 顶部菜单
      topNav: null
    }
  },
  created () {
    this.$router.push({
      path: '/index'
    })
    // 获取导航数据
    this._getNavData()
  },
  methods: {
    // 获取导航数据
    _getNavData () {
      this.leftNav = menuData.data.leftnav
      this.topNav = menuData.data.topnav
      // getNavData({}, (res) => {
      //   if (res.code === ERR_OK) {
      //     console.log(res.data.leftnav)
      //     console.log(res.data.topnav)
      //     this.leftNav = reSetNavData(res.data.leftnav)
      //     this.topNav = reSetNavData(res.data.topnav)
      //   }
      // })
    },
    handleSelect (e, d) {
      console.log(e, d)
    },
    // 全屏
    handleFullScreen () {
      let element = document.documentElement
      if (!this.fullScreen) {
        (element.requestFullscreen && element.requestFullscreen()) || (element.mozRequestFullScreen && element.mozRequestFullScreen()) || (element.webkitRequestFullScreen && element.webkitRequestFullScreen()) || (element.msRequestFullscreen && element.msRequestFullscreen())
      } else {
        (document.exitFullscreen && document.exitFullscreen()) || (document.mozCancelFullScreen && document.mozCancelFullScreen()) || (document.msExitFullscreen && document.msExitFullscreen()) || (document.webkitCancelFullScreen && document.webkitCancelFullScreen())
      }
      this.fullScreen = !this.fullScreen
    },
    reload () {
      this.isRouterAlive = false
      this.$nextTick(() => {
        this.isRouterAlive = true
      })
    }
  },
  watch: {
    activeMenu (d) {
      console.log(d)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.main-container
  width: 100%
  height: 100%
  position: relative
.sider
  width: 220px
  position: absolute
  top: 100px
  left: 0
  bottom: 0
  background-color: #4C4F5A
  color: #fff
  .el-menu
    border: none
  >>>.el-submenu__title, >>>.el-menu-item
    font-size: 16px
  .el-submenu
    position: relative
    &:after
      content: ''
      width: 100%
      height: 1px
      position: absolute
      left: 0
      bottom: 0
      background-color: #555863
    >>>i
      color: #fff
.right
  position: absolute
  left: 220px
  top: 100px
  right: 0
  bottom: 0
  padding: 20px 70px 0 30px
  background-color: #EEEEEF
.header
  height: 100px
  position: absolute
  left: 0
  right: 0
  top: 0
  display: flex
  background-color: #2F333E
  .header-wrap
    width: 100%
    display: flex
    justify-content: space-between
    align-items: center
    font-size: 16px
    color: #fff
    padding: 0 50px
    .title-box
      display: flex
      align-items: center
      h1
        font-size: 32px
        margin-right: 118px
      ul
        display: flex
        align-items: center
        li
          margin-right: 35px
          cursor: pointer
    .op-box
      display: flex
      align-items: center
  .op-box > div
    padding: 0 20px
  i
    font-size: 25px
    cursor: pointer
  .user-box
    position: relative
    text-align: center
    &>div
      cursor: pointer
    ul
      width: 120px
      position: absolute
      left: -25px
      top: 15px
      z-index: 999
      display: none
      animation: slide 0.3s
      padding-top: 25px
      color: #fff
      &:after
        content: ''
        width: 10px
        height: 10px
        position: absolute
        right: 10px
        top: 20px
        transform: rotate(45deg)
        background-color: #4C4F5A
    li
      position: relative
      cursor: pointer
      padding: 10px
      background-color: #4C4F5A
      overflow: hidden
      white-space: nowrap
      &:first-child
        border-top-left-radius: 4px
        border-top-right-radius: 4px
      &:last-child
        border-bottom-left-radius: 4px
        border-bottom-right-radius: 4px
      &:after
        content: ''
        width: 100%
        height: 1px
        position: absolute
        left: 0
        bottom: 0
        background-color: #555863
      &:hover
        color: #A2A5B0
    &:hover ul
      display: block
.main
  position: absolute
  left: 30px
  top: 106px
  right: 70px
  bottom: 50px
  overflow-y: auto
  padding-top: 3px
  &>div
    position: relative
    /* background-color: #F8F8F8 */
    /* padding: 20px 10px 10px 30px */
  &:before
    content: ''
    width: 100%
    height: 3px
    position: absolute
    left: 0
    top: 0
    background-color: #30CCC1
.nav
  height: 66px
  position: absolute
  left: 30px
  top: 20px
  right: 70px
  display: flex
  justify-content: space-between
  align-items: center
  background-color: #fff
  padding: 0 36px
  font-size: 16px
  .el-breadcrumb
    font-size: 16px
    line-height: 1.2
  .bread
    display: flex
  .help
    cursor: pointer
    display: flex
    align-items: center
.footer
  height: 50px
  position: absolute
  left: 30px
  right: 70px
  bottom: 0
  line-height: 50px
  background-color: #fff
  text-align: center
</style>
