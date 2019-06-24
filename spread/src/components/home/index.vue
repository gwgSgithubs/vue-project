<template lang="html">
  <div class="">
    <el-row class="mb20">
      <el-col :span="24" class="costStatus">
        <el-card class="box-card">
          <div slot="header">
            <span class="title">费用状态</span>
            <span class="btn-txt"><i class="el-icon-location"></i>明细</span>
          </div>
          <div>
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="">
                  
                  
                </div>
              </el-col>
              <el-col :span="12">
                <div class="">
                  
                </div>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row class="mb20">
      <el-col :span="24">
        <el-card class="box-card">
          <div slot="header">
            <span class="title">活动状态</span>
            <span class="btn-txt"><i class="el-icon-location"></i>管理</span>
          </div>
          <div>
            <el-row :gutter="15">
              
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row class="mb20">
      <el-col :span="24" class="dataAnalysis">
        <el-card class="box-card">
          <div slot="header">
            <span class="title">数据分析</span>
          </div>
          <div>
            <ul>
              <li><p>如果*****</p></li>
              <li class="line"></li>
              <li><p>如果*****</p></li>
              <li class="line"></li>
              <li><p>如果*****</p></li>
            </ul>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row class="mb20">
      
    </el-row>
  </div>
</template>

<script>
import {getCostStatus, getStatiscActivity, getChurch} from 'api/home'
import {ERR_OK} from 'api/config'
export default {
  data () {
    return {
      
    }
  },
  created () {
    
  },
  methods: {
    
    
    },
    _getChurch () {
      getChurch({}, (res) => {
        if (res.code === ERR_OK) {
          console.log(res.data)
          this.church = res.data
          this.isProp = res.data.isProp
          res.data.isProp ? this.switchTxt = '开启' : this.switchTxt = '关闭'
        }
      })
    },
    _getCostStatus () {
      getCostStatus({}, (res) => {
        if (res.code === ERR_OK) {
          // console.log(res.data)
          this.systemInfo = res.data.systemInfo
          this.userInfo = res.data.userInfo
        }
      })
    },
    _getStatiscActivity () {
      getStatiscActivity({}, (res) => {
        if (res.code === ERR_OK) {
          // console.log(res.data)
          this.allFinishData = res.data.allFinishData.totalData
          this.allTransmitData = res.data.allTransmitData.totalData
          this.currentFinishData = res.data.currentFinishData.totalData
          this.currentTransmitData = res.data.currentTransmitData.totalData
        }
      })
    }
  }
  // watch: {
  //   isProp (val) {
  //     console.log(val)
  //     val?''
  //   }
  // }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/theme'
.costStatus .el-col-12 >>> > div
  height: 180px
  display: flex
  justify-content: space-between
  background-color: #ddd
  padding: 18px 20px
  color: #fff
  box-sizing: border-box
  &>div:nth-of-type(2)
    align-self: flex-end
    display: flex
    text-align: right
    &>div:nth-of-type(1)
      display: flex
      flex-direction: column
      align-items: flex-end
    li
      margin-left: 20px
      margin-top: 10px
  &>div:nth-of-type(1)
    font-size: 20px
    .total
      margin-top: 40px
    .balance
      font-size: 50px
  .name
    font-size: 16px
  .num
    font-size: 34px
.box-card .box-card
  height: 180px
  .el-card__header > div
    display: flex
    justify-content: space-between
  .title
    font-size: 20px
    color: $mainTxt
  .num
    font-size: 24px
    font-weight: bolder
// 数据分析
.dataAnalysis
  ul
    display: flex
    align-items: center
    justify-content: space-between
    li
      position: relative
      padding: 12px 30px
      color: $subTxt
      font-size: 16px
    .line
      width: 1px
      height: 84px
      padding: 0
      background-color: #ddd
      flex: 0 0 1px
// 推荐教会
.remChurch
  .church-box
    display: flex
    .img-box
      height: 150px
      flex: 0 0 220px
      img
        width: 100%
        height: 100%
    ul
      font-size: 14px
      color: $subTxt
      line-height: 1.7
      padding-left: 20px
      .church-name
        font-size: 20px
        color: $mainTxt
        font-weight: bolder
  .op-box
    position: absolute
    right: 20px
    bottom: 18px
    display: flex
    align-items: center
    &>div
      margin: 0 10px 0 5px
    span
      font-size: 16px
      color: $subTxt
    .edit
      cursor: pointer
      &:hover
        color: $mainColor
</style>
