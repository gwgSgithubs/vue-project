<template>
  <div class="">
    <div class="mask" @click="showClick" v-show="isOpen"></div>
    <div class="nav">
      <transition name="open">
        <div v-show="isOpen" @click="showClick">
          <router-link tag="div" class="nav-item task" to='/task'>
            <div class="">
              <i class="iconfont icon-renwu1"></i>
            </div>
            <span>任务</span>
          </router-link>
          <router-link tag="div" class="nav-item favor" to="/favor">
            <div class="">
              <i class="iconfont icon-xiaoshoucang1"></i>
            </div>
            <span>收藏</span>
          </router-link>
          <router-link tag="div" class="nav-item move" to="/move">
            <div class="">
              <i class="iconfont icon-yijiao1"></i>
            </div>
            <span>移交</span>
          </router-link>
          <div class="nav-item loginOut" @click.stop="loginOut">
            <div class="">
              <i class="iconfont icon-zhuxiao1"></i>
            </div>
            <span>注销</span>
          </div>
        </div>
      </transition>
      <transition name="show">
        <div class="nav-item open" :class="{'show': isOpen}" @click="open">
          <i class="iconfont" :class="{'icon-guanbi1': isOpen, 'icon-caidan': !isOpen}"></i>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import {mapMutations} from 'vuex'
import {removeStorage} from 'common/js/common'
export default {
  data () {
    return {
      isOpen: false
    }
  },
  mounted () {
    this.$nextTick(() => {
      // this._inits()
    })
  },
  methods: {
    open () {
      this.isOpen = !this.isOpen
    },
    showClick () {
      this.isOpen = !this.isOpen
    },
    loginOut () {
      removeStorage('loginData')
      this.showClick()
      // this.setlongin(false)
      document.title = '用户登录'
      this.$router.push({
        path: '/login'
      })
    },
    ...mapMutations({
      setlongin: 'SET_LONGIN'
    })
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable'
.iconfont
  font-size: 23px
.mask
  width: 100%
  height: 100%
  position: absolute
  left: 0
  top: 0
  right: 0
  bottom: 0
.nav
  width: 50px
  height: 50px
  position: fixed
  bottom: 140px
  right: 10px
  /* z-index: 997 */
  font-size: $font-size-small-sm
  color: $color-text-btn
  text-align: center
  span
    font-size: $font-size-medium-s
  .nav-item
    width: 57px
    height: 57px
    position: absolute
    display: flex
    flex-direction: column
    justify-content: center
    padding: 1px
    border-radius: 57px
    background-color: $color-background-pop
    &.open
      width: 50px
      height: 50px
      /* line-height: 36px */
      transition: 0.4s
    &.task
      bottom: 75px
      right: 5px
    &.favor
      right: 66px
      bottom: 35px
    &.move
      right: 66px
      bottom: -37px
    &.loginOut
      bottom: -77px
      right: 5px
  .show
    transform: rotate(360deg)
.open-enter-active, .open-leave-active
  transition: all 0.4s
  .task
    transition: all 0.4s
  .favor
    transition: all 0.4s
  .move
    transition: all 0.4s
  .loginOut
    transition: all 0.4s
.open-enter, .open-leave-to
  opacity: 0
  .task
    transform: translate3d(0, 60px, 0) rotate(360deg)
  .favor
    transform: translate3d(52px, 30px, 0) rotate(360deg)
  .move
    transform: translate3d(52px, -30px, 0) rotate(360deg)
  .loginOut
    transform: translate3d(0, -56px, 0) rotate(360deg)

/* .show-enter-active, .show-leave-active
  transition: all 0.4s
  .show
    transition: 0.4s
    transform: rotate(720deg)
.show-enter, .show-leave-to
  .show
    transition: 0.4s
    transform: rotate(720deg) */
@keyframes animater
  0%
    transform: translate3d(0, 0, 0)
  100%
    transform: translate3d(-200px, 0, 0)
/* .mask
  width: 100%
  height: 100%
  position: fixed
  left: 0
  top: 0
  right: 0
  bottom: 0 */
</style>
