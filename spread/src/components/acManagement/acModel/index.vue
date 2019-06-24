<template lang="html">
  <div class="">
    <div class="model-wrapper">
      <div class="model-card" v-for="(item, index) in modelList" :key="index">
        <div class="model-tit-box">
          <span class="model-name">{{item.actTitle}}</span>
          <span class="model-person">负责人：{{personFormate(item.person)}}</span>
        </div>
        <div class="model-box">
          <div class="model-img-box" @click="toDetail(item.templetId)">
            <img :src="item.actCover">
          </div>
          <div class="model-btn-box">
            <button class="r-button brif small" @click="toNotPublish(item.templetId)">保存到未发布</button>
            <button class="r-button brif small" @click="editModel(item.templetId)">编辑</button>
            <button class="r-button brif small" @click="copyModel(item.templetId)">复制</button>
            <button class="r-button small delete" @click="deleteModel(item.templetId)">删除</button>
          </div>
        </div>
      </div>
      <div class="model-card">
        <div class="icon-box" @click="addModel">
          <i class="icon iconfont icon-tianjia"></i>
        </div>
      </div>
      <msg :msgText="msgText" :isShow="isShowMsg"></msg>
      <m-alert :isShow="isShowAlter" :alertTxt="alertTxt" @closeAlert="hideAlert"></m-alert>
      <m-loading :isShow="isloading" :loadingTxt="loadingTxt"></m-loading>
      <m-confirm :isShow="isShowConfirm" :confirmTxt="confirmTxt" @closeConfirm="closeConfirm" @confirmSure="confirmSure"></m-confirm>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import {ERR_OK} from 'api/config'
import {getModelList, deleteModelData, saveToNotPublish} from 'api/model'
import {loadingMixin, msgMixin, confirmMixin, alterMixin} from 'common/js/mixin'
export default {
  mixins: [loadingMixin, msgMixin, confirmMixin, alterMixin],
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      // isRouterAlive: true,
      modelList: null,
      templetId: null,
      flag: null
    }
  },
  created () {
    // 获取列表模板数据
    this._getModelList()
  },
  methods: {
    toDetail (templetId) {
      console.log(templetId)
      this.$router.push({
        path: `/acModel/detail/${templetId}`
      })
    },
    // 保存到未发布
    toNotPublish (templetId) {
      saveToNotPublish({templetId}, res => {
        if (res.code === ERR_OK) {
          this.showAlert('成功保存到未发布, 可在活动列表中查看')
        } else {
          this.showAlert('保存到未发布失败')
        }
      })
    },
    reload () {
      // this.isRouterAlive = false
      this.$nextTick(() => {
        // this.isRouterAlive = true
        this._getModelList()
      })
    },
    //
    personFormate (data) {
      let personStr = ''
      data.map((v) => {
        personStr += v.nickName
      })
      return personStr
    },
    // 复制
    copyModel (templetId) {
      this.flag = 'copy'
      this.templetId = templetId
      this.showConfirm('确定复制, 是否继续?')
    },
    // 确定删除
    confirmSure () {
      this.isShowConfirm = false
      if (this.flag === 'copy') {
        this.$router.push({
          path: `/acModel/copy/${this.templetId}`
        })
      } else if (this.flag === 'delete') {
        this._deleteModel()
      }
    },
    // 删除
    deleteModel (templetId) {
      this.flag = 'delete'
      this.templetId = templetId
      this.showConfirm('确定删除, 是否继续?')
    },
    // 删除
    _deleteModel () {
      deleteModelData({templetId: this.templetId}, (res) => {
        if (res.code === ERR_OK) {
          this._getModelList()
        } else {
          this.showAlert('删除失败')
        }
      })
    },
    // 编辑
    editModel (templetId) {
      this.$router.push({
        path: `/acModel/edit/${templetId}`
      })
    },
    // 新增
    addModel () {
      this.$router.push({
        path: '/acModel/add'
      })
    },
    // 获取数据
    _getModelList () {
      this.showLoading()
      getModelList({}, res => {
        this.hideLoading()
        if (res.code === ERR_OK) {
          this.modelList = res.data.content
        } else {
          this.showMsg(res.msg)
        }
      })
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/theme'
.model-wrapper
  display: flex
  justify-content: space-between
  flex-wrap: wrap
  padding: 50px 80px
  box-sizing: border-box
  background-color: #fff
  margin-bottom: 20px
.model-card
  width: 460px
  height: 276px
  flex: 0 0 460px
  border-radius: 2px
  overflow: hidden
  margin: 15px 0
  box-shadow: 0 0 10px 0 $disabled
  &:hover
    box-shadow: 0 0 10px 0 $disabledTxt
  .delete
    background-color: rgba(0, 0, 0, 0)
    color: $disabledTxt
    border: 1px solid $disabledTxt
  .model-tit-box
    display: flex
    justify-content: space-between
    align-items: center
    padding: 15px 15px 15px 30px
    box-sizing: border-box
    border-bottom: 1px solid $disabled
    .model-name
      font-size: 18px
      font-weight: bolder
    .model-person
      font-size: 14px
      color: $subTxt
  .model-box
    padding: 15px 25px
    box-sizing: border-box
    .model-btn-box
      display: flex
      justify-content: space-between
      padding-top: 12px
      button
        margin: 0
  .model-img-box
    width: 408px
    height: 150px
    background-color: $disabled
    border: 1px solid $disabled
    cursor: pointer
    &:hover
      box-shadow: 0 0 5px 0 $disabledTxt
    img
      width: 100%
      height: 100%
  .icon-box
    width: 100%
    height: 100%
    display: flex
    justify-content: center
    align-items: center
    cursor: pointer
  .icon-tianjia
    font-size: 70px
    color: $disabled

</style>
