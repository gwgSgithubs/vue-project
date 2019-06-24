<template lang="html">
  <pop-wrap title="视频预览" height="550px" width="880px" v-if="isShow" @closePop="closePreview">
    <div class="video-wrap" v-if="videoItem">
      <div class="video-tit">
        {{videoItem.title}}
      </div>
      <div class="video-ctn">
        <video ref="video" :src="videoItem.downloadUrl" :poster="videoItem.coverUrl" @click="playVideo" @timeupdate="updataTime"></video>
        <span ref="times" class="times">{{videoItem.readCount}} 次播放</span>
        <i class="icon-big icon iconfont" :class="playBigCls" @click="playVideo"></i>
      </div>
      <div class="video-rate">
        <i class="icon-small icon iconfont" :class="playSmallCls" @click="playVideo"></i>
        <span class="current-time">{{currentTime}}</span>
        <el-slider class="slider" v-model="time" @change="changeTime" :show-tooltip="false"></el-slider>
        <span class="durration-time">{{formatTime(videoItem.duration)}}</span>
      </div>
    </div>
  </pop-wrap>
</template>

<script>
import popWrap from 'base/pop-wrap/pop-wrap'
export default {
  data () {
    return {
      currentTime: '00:00',
      isPlay: false,
      time: 0
    }
  },
  props: {
    videoItem: {
      type: Object,
      default: Function
    },
    isShow: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    playBigCls () {
      return this.isPlay ? 'icon-yitingzhi hide' : 'icon-bofang1'
    },
    playSmallCls () {
      return this.isPlay ? 'icon-tingzhi' : 'icon-bofang'
    }
  },
  mounted () {
    // console.log(this.$refs.times)
    // this.$refs.times.style.right = (820 - this.$refs.video.offsetWidth) / 2 + 'px'
  },
  methods: {
    // 改变滑块
    changeTime (val) {
      let chooseTime = val / 100 * this.videoItem.duration
      this.$refs.video.currentTime = chooseTime
      this.setTimeProcess(chooseTime)
    },
    // 更新时间
    updataTime (e) {
      this.setTimeProcess(parseInt(e.target.currentTime))
    },
    setTimeProcess (time) {
      this.currentTime = this.formatTime(time)
      this.time = time / this.videoItem.duration * 100
    },
    //
    playVideo () {
      let video = this.$refs.video
      if (this.isPlay) {
        video.pause()
      } else {
        video.play()
      }
      this.isPlay = !this.isPlay
    },
    closePreview () {
      this.currentTime = '00:00'
      this.isPlay = false
      this.time = 0
      this.$emit('closePreview')
    },
    formatTime (val) {
      let m = parseInt(val / 60)
      let s = parseInt(val % 60)
      m = m > 10 ? m : '0' + m
      s = s > 10 ? s : '0' + s
      return `${m}:${s}`
    }
  },
  components: {
    popWrap
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/theme'
.video-wrap
  padding: 36px 40px 30px
  box-sizing: border
  .video-tit
    font-size: 26px
    color: $mainTxt
    padding-bottom: 12px
  .video-ctn
    width: 800px
    height: 350px
    position: relative
    border-radius: 10px
    overflow: hidden
    background-color: $disabled
    video
      height: 100%
      display: block
      margin: auto
      border-radius: 10px
      overflow: hidden
      cursor: pointer
    .times
      position: absolute
      right: 12px
      bottom: 10px
      font-size: 20px
      color: $mainColor
    .icon-big
      position: absolute
      left: 50%
      top: 50%
      color: #fff
      font-size: 80px
      transform: translate3d(-50%, -50%, 0)
      cursor: pointer
      &:hover
        opacity: 0.9
  .video-rate
    display: flex
    align-items: center
    margin-top: 20px
    .slider
      flex: 0 0 641px
      margin-left: 20px
      margin-right: 20px
    .icon-small
      cursor: pointer
      color: $disabledTxt
      font-size: 22px
      margin-right: 5px
      &:hover
        opacity: 0.9
    .current-time, .durration-time
      font-size: 20px
      color: $disabledTxt
    >>> .el-slider__button
      width: 6px
      height: 6px
    >>> .el-slider__runway
      background-color: $disabledTxt
    >>> .el-slider__button
      border: 4px solid $mainColor
    >>> .el-slider__bar
      background-color: $mainColor
.icon.hide
  display: none
</style>
