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
          视频预览
        </div>
        <div class="content">
          <div class="video-wrap">
            <div class="vi-title">
              <span class="vi-name">{{videoData.title}}</span>
              <span class="status">{{videoData.statusText}}</span>
            </div>
            <div class="vi-concent">
              <video ref="vid" :src="videoData.url" :poster="videoData.coverUrl" controls></video>
            </div>
            <div class="look-num">
              <span>{{videoData.videocount}}次播放</span>
            </div>
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
    videoData: {
      type: Object,
      default: Function
    }
  },
  methods: {
    // 关闭
    close () {
      this.$refs.vid.load()
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.main
  height: 280px
  width: 330px
.content
  padding: 10px 15px
  .vi-title
    display: flex
    justify-content: space-between
    align-items: flex-end
    padding: 0 12px
  .vi-name
    font-weight: bold
    font-size: $font-size-medium-x
    color: $color-text-m
  .status
    font-size: $font-size-small
  .vi-concent
    box-shadow: 0 0 10px $color-background-df
    margin: 5px 0
    video
      width: 300px
      height: 150px
      display: block
  .look-num
    text-align: right
    font-size: $font-size-medium-s
    color: $color-text-active
    padding-right: 12px
</style>
