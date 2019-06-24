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
          定向推送
        </div>
        <div class="content">
          <div class="search-wrap">
            <div class="ipt-box">
              <form class="" @submit.prevent="search">
                <i class="iconfont icon-fangdajing" @click="search"></i>
                <input type="text" name="" value="" placeholder="请输入需要推送的视频 ID/名称" v-model="title">
              </form>
            </div>
            <div class="slt-box">
              <div class="">
                <label>视频类别</label>
                <select class="" name="" @change="videoTypeFn">
                  <option value="">全部</option>
                  <option :value="item.id" v-for="(item, index) in videoTypeList" :key="index">{{item.dicName}}</option>
                </select>
              </div>
              <div class="">
                <label>分类标签</label>
                <select class="" name="" @change="labelIdFn">
                  <option value="">全部</option>
                  <option :value="item.id" v-for="(item, index) in labelIdList" :key="index">{{item.labelName}}</option>
                </select>
              </div>
            </div>
          </div>
          <div class="search-relt">
            <video-push
            :listData="listData"
            :empty="empty"
            :showLoad="showLoad"
            @load="load"
            @refresh="refresh"
            @pushVideo="pushVideo"
            @detail="detail"
            ></video-push>
          </div>
        </div>
      </div>
    </div>
    <msg :show="msgShow" :msg="msgTit"></msg>
  </div>
</template>

<script>
import VideoPush from 'components/video-push/video-push'
import {TIME_LIMIT} from 'api/config'
import Msg from 'base/msg/msg'
export default {
  props: {
    listData: {
      type: Array,
      default: Function
    },
    show: {
      type: Boolean,
      default: false
    },
    empty: {
      type: Boolean,
      default: false
    },
    showLoad: {
      type: Boolean,
      default: true
    },
    videoTypeList: {
      type: Array,
      default: Function
    },
    labelIdList: {
      type: Array,
      default: Function
    }
  },
  data () {
    return {
      openid: null,
      msgTit: '', //
      msgShow: false,
      title: ''
    }
  },
  methods: {
    // 搜索
    search () {
      this.$emit('search', this.title)
    },
    // 视频预览
    detail (item) {
      this.$emit('detailReview', item)
    },
    // 取消\推送视频
    pushVideo (item) {
      if (item.isload === '1') {
        this.msgShow = true
        this.msgTit = '当前视频已经加载,不能进行取消操作'
        this.msgTimerFn()
        return
      }
      this.$emit('pushVideo', item)
    },
    // 分类标签
    labelIdFn (ele) {
      this.$emit('labelIdFn', ele.target.value)
    },
    // 选择视频类别
    videoTypeFn (ele) {
      this.$emit('videoTypeFn', ele.target.value)
    },
    // 推送视频刷新
    refresh () {
      this.$emit('refresh')
    },
    // 推送视频加载
    load () {
      this.$emit('load')
    },
    // 关闭推送视频弹框
    close () {
      this.$emit('close')
    },
    msgTimerFn () {
      let timer = setTimeout(() => {
        clearTimeout(timer)
        this.msgShow = false
      }, TIME_LIMIT)
    }
  },
  components: {
    VideoPush,
    Msg
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.main
  height: 432px
  width: 330px
.search-wrap
  width: 100%
  height: 126px
  position: relative
  padding: 8px 12px
  box-shadow: 0 0 10px $color-background-df
  .ipt-box
    width: 100%
    height: 28px
    padding: 2px 9px
    margin-bottom: 10px
    background-color: $color-background-m
    form
      height: 100%
      display: flex
      align-items: center
    input
      flex: 1
      margin-left: 6px
      background-color: $color-background-m
    i
      color: $color-text-active
  .slt-box
    /* display: flex */
    &>div
      flex: 1
      display: flex
      justify-content: center
      align-items: center
      font-size: $font-size-small
      color: $color-text-m
      padding: 4px 0
    select
      width: 222px
      height: 30px
      background-color: $color-background
      font-size: $font-size-small
      color: $color-text
      border-color: $color-background-df
      margin-left: 5px
</style>
