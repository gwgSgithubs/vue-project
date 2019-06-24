<template lang="html">
  <div class="">
    <pop-wrap title="编辑活动模板" :isShow="true" height="734px" width="1160px" @closePop="closePop">
      <div class="bak-white act-card">
        <div class="tit-box">
          <div class="tit">
            活动规则
          </div>
          <div class="tip">当前每位用户最多可领<span>{{totalCommission}}</span>元;活动可支持<span>{{num}}</span>人看视频</div>
        </div>
        <el-row :gutter="50" v-if="step === 1">
          <el-col :xl="24" :lg="24">
            <div class="low-box">
              <div class="se-box">
                <span class="f100 lab"><span class="start">*</span>覆盖区域:</span>
                <div class="ipt-box">
                  <el-select v-model="distance" placeholder="请选择覆盖区域">
                    <el-option
                      v-for="item in distanceList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </div>
            </div>
            <div class="low-box">
              <div class="f1 se-box">
                <span class="f100 lab"><span class="start">*</span>定位地址:</span>
                <div class="txt-box">
                  <span class="txt-nowrap" v-if="positionAddress">{{positionAddress}}</span><button class="r-button primary mini-m search" @click="searchAddress">搜索</button>
                </div>
              </div>
            </div>
            <div class="low-box">
              <div class="se-box">
                <span class="f100 lab"><span class="start">*</span>开始时间:</span>
                <div class="ipt-box">
                  <el-date-picker
                    v-model="startTime"
                    @change="getStartTime"
                    type="datetime"
                    placeholder="选择开始时间">
                  </el-date-picker>
                </div>
              </div>
              <div class="se-box">
                <span class="lab"><span class="start">*</span>结束时间:</span>
                <div class="ipt-box">
                  <el-date-picker
                    v-model="endTime"
                    @change="getEndTime"
                    type="datetime"
                    placeholder="选择结束时间">
                  </el-date-picker>
                </div>
              </div>
            </div>
            <div class="low-box">
              <div class="se-box">
                <span class="f100 lab"><span class="start">*</span>活动总额:</span>
                <div class="ipt-box">
                  <el-select v-model="amount" placeholder="请选择活动总额" @change="changeCountUserNum">
                    <el-option
                      v-for="item in amountList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </div>
            </div>
            <div class="low-box">
              <div class="se-box">
                <span class="f100 lab"><span class="start">*</span>活动网址: </span>
                <div class="txt-box read-only">
                  {{actUrl}}
                </div>
              </div>
              <div class="se-box">
                <span class="lab"><span class="start">*</span>负责人:</span>
                <div class="ipt-box">
                  <el-select v-model="person" multiple placeholder="请选择负责人">
                    <el-option
                      v-for="item in personList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </div>
              </div>
            </div>
            <div class="low-box">
              <div class="se-box f1">
                <span class="f100 lab"><span class="start">*</span>活动标题: </span>
                <div class="ipt-box f1">
                  <el-input class="" v-model="actTitle" placeholder="请输入活动标题"></el-input>
                </div>
              </div>
            </div>
            <div class="low-box">
              <div class="se-box f1">
                <span class="f100 lab"><span class="start">*</span>活动描述: </span>
                <div class="ipt-box f1">
                  <el-input class="" v-model="actDesc" placeholder="请输入内容"></el-input>
                </div>
              </div>
            </div>
            <div class="low-box">
              <div class="se-box">
                <span class="f100 alisf-start pt12 lab"><span class="start">*</span>编辑封面:</span>
                <el-upload
                  class="avatar-uploader"
                  accept="image/*"
                  :action="updateCoverUrl"
                  :data="updateData"
                  :show-file-list="false"
                  :on-error="handleActCoverError"
                  :before-upload="beforeActCoverUpload"
                  :on-success="handleActCoverSuccess">
                  <img v-if="actCover" :src="actCover" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </div>
              <div class="se-box">
                <span class="lab"> 支持其他服务器发现:</span>
                <el-radio v-model="isFound" :label="true">是</el-radio>
                <el-radio v-model="isFound" :label="false">否</el-radio>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="0" v-if="step === 2" class="input-h28">
          <el-col :xl="24" :lg="24">
            <el-col :xl="8" :lg="8">
              <div class="low-box">
                <div class="se-box f1">
                  <span class="f180 lab"><span class="start">*</span>限时内完成奖励:</span>
                  <div class="f1 mr5 ipt-box">
                    <el-select v-model="limitHour" placeholder="请选择限时内完成奖励">
                      <el-option
                        v-for="item in limitHourList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                  <div class="f1 ipt-box">
                    <el-select v-model="limitAmount" placeholder="请选择" @change="changeCountUserNum">
                      <el-option
                        v-for="item in limitAmountList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                </div>
              </div>
              <div class="low-box">
                <div class="se-box f1">
                  <span class="f180 lab"><span class="start">*</span>额外奖励:</span>
                  <div class="f1 mr5 ipt-box">
                    <el-select v-model="extraCondition" multiple placeholder="请选择额外奖励" @change="changeCountUserNum">
                      <el-option
                        v-for="item in extraConditionList"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                  <div class="f1 ipt-box">
                    <el-select v-model="extraAmount" placeholder="请选择" @change="changeCountUserNum">
                      <el-option
                        v-for="item in extraAmountList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                </div>
              </div>
              <div class="low-box">
                <div class="se-box f1">
                  <span class="f180 lab"><span class="start">*</span>额外视频佣金统一定价:</span>
                  <div class="f1 ipt-box">
                    <el-select v-model="extraCommmission" placeholder="请选择" class="block" @change="changeExtraCommmission">
                      <el-option
                        v-for="item in extraCommmissionList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :xl="8" :lg="8">
              <div class="low-box">
                <div class="se-box f1">
                  <span class="f160 lab"><span class="start">*</span>用户任务存留期限:</span>
                  <div class="f1 ipt-box">
                    <el-select v-model="mandate" placeholder="请选择" class="block">
                      <el-option
                        v-for="item in mandateList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                </div>
              </div>
              <div class="low-box">
                <div class="se-box f1">
                  <span class="f160 lab"><span class="start">*</span>用户默认任务数量:</span>
                  <div class="f1 ipt-box">
                    <el-select v-model="taskCount" placeholder="请选择" class="block" @change="changeCountUserNum">
                      <el-option
                        v-for="item in taskCountList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                </div>
              </div>
              <div class="low-box">
                <div class="se-box f1">
                  <span class="f160 lab"><span class="start">*</span>用户额外任务数量:</span>
                  <div class="f1 ipt-box">
                    <el-select v-model="taskExtra" placeholder="请选择" class="block" @change="changeCountUserNum">
                      <el-option
                        v-for="item in taskExtraList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :xl="8" :lg="8">
              <div class="low-box">
                <div class="se-box f1">
                  <span class="f100 lab">无效时段1:</span>
                  <el-time-picker
                    is-range
                    v-model="nightMaintenanceTime1"
                    range-separator="至"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    placeholder="选择时间范围">
                  </el-time-picker>
                </div>
              </div>
              <div class="low-box">
                <div class="se-box f1">
                  <span class="f100 lab">无效时段2:</span>
                  <el-time-picker
                    is-range
                    v-model="nightMaintenanceTime2"
                    range-separator="至"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    placeholder="选择时间范围">
                  </el-time-picker>
                </div>
              </div>
              <div class="low-box">
                <div class="se-box f1">
                  <span class="f100 lab">无效时段3:</span>
                  <el-time-picker
                    is-range
                    v-model="nightMaintenanceTime3"
                    range-separator="至"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    placeholder="选择时间范围">
                  </el-time-picker>
                </div>
              </div>
            </el-col>
            <el-col :xl="24" :lg="24">
              <div class="tab-box">
                <div class="tab-item">
                  <ul>
                    <li :class="{'active': isAll === 'All'}" @click="getVidelList('All')">
                      全部视频
                      <span>1</span>
                    </li>
                    <li :class="{'active': isAll === 'def'}" @click="getVidelList('def')">默认推送</li>
                  </ul>
                </div>
                <div class="low-box js-end pb0">
                  <div class="se-box" v-if="isAll === 'All'">
                    <span class="f100 lab">标签分类:</span>
                    <div class="ipt-box tab-ipt">
                      <el-select v-model="labelId" placeholder="请选择" @change="changeLabel">
                        <el-option
                          v-for="item in labelsList"
                          :key="item.id"
                          :label="item.labelName"
                          :value="item.id">
                        </el-option>
                      </el-select>
                    </div>
                  </div>
                  <div class="se-box">
                    <div class="ipt-box" v-if="isAll === 'All'">
                      <el-input placeholder="请输入内容" v-model="title" class="input-with-select">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                      </el-input>
                    </div>
                    <button class="r-button warn">新增视频</button>
                  </div>
                </div>
              </div>
              <div class="table-box">
                <el-table
                  ref="tabList"
                  :data="modelVideoList"
                  border
                  stripe
                  tooltip-effect="dark"
                  style="width: 100%">
                  <el-table-column
                    prop="actCode"
                    align="center"
                    label="视频">
                    <template slot-scope="scope">
                      <div class="table-sub">
                        <div class="table-sub-avatar">
                          <img :src="scope.row.coverUrl" alt="">
                        </div>
                        <div class="table-sub-content">
                          <div class="table-subtit-box">
                            <div class="table-sub-tit">
                              {{scope.row.title}}
                            </div>
                            <div class="table-sub-btn">
                              <button class="r-button table-btn-tab" v-for="(item, index) in scope.row.labels" :key="index" v-if="index < 3">{{item.labelName}}</button>
                            </div>
                          </div>
                          <div class="table-sub-intro">
                            简介：{{scope.row.info}}
                          </div>
                          <div class="table-sub-viewed">
                            <i class="el-icon-time"></i>
                            <span>{{scope.row.readCount}}</span>
                          </div>
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="actName"
                    align="center"
                    width="80"
                    label="佣金">
                    <template slot-scope="scope">
                      <span class="color-red" v-if="isAll !== 'def'">￥{{scope.row.commission}}</span>
                      <span class="color-red cursor" v-if="isAll === 'def'" @click="changeCommission(scope.row)">￥{{scope.row.commission}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="actDesc"
                    align="center"
                    width="120"
                    label="就否答题">
                    <template slot-scope="scope">
                      <div class="switch">
                        <span :class="scope.row.switchClass" @click="changeAnswer(scope.row)"></span>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="status"
                    align="center"
                    label="操作"
                    show-overflow-tooltip>
                    <template slot-scope="scope">
                      <div class="status-box">
                        <div class="icon-box" v-if="isAll === 'def'">
                          <i class="icon iconfont icon-zhiding1" title="置顶" @click="setToTop(scope.row)"></i>
                          <i class="icon iconfont icon-xiangxia" title="向下" @click="setToUpDown(scope.row, 'down')"></i>
                          <i class="icon iconfont icon-xiangshang" title="向上" @click="setToUpDown(scope.row, 'up')"></i>
                        </div>
                        <button v-if="isAll !== 'def'" class="r-button table-btn-op table-btn-primary" @click="setDefault(scope.row, 'add')"><i class="icon iconfont icon-shanchu"></i><span>设为默认</span></button>
                        <button v-if="isAll === 'def'" class="r-button table-btn-op table-btn-primary" @click="setDefault(scope.row, 'remove')"><i class="icon iconfont icon-shanchu"></i><span>取消默认</span></button>
                        <button class="r-button table-btn-op table-btn-info" @click="previewVideo(scope.row)"><i class="icon iconfont icon-hexingyulan"></i><span>视频预览</span></button>
                        <button class="r-button table-btn-op table-btn-warn" @click="removeModel(scope.row)"><i class="icon iconfont icon-shanchu1"></i><span>移出活动</span></button>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div class="paginater-box txt-right">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  prev-text="上一页"
                  next-text="下一页"
                  :current-page="currentPage"
                  :page-sizes="pageSizes"
                  :page-size="sizeNum"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="totalElements">
                </el-pagination>
              </div>
            </el-col>
          </el-col>
        </el-row>
      </div>
      <div class="pop-btn-box">
        <button class="r-button info" :class="{'disabled': step === 1}" @click="prevStep">上一步</button>
        <button class="r-button primary" v-if="step === 1" @click="nextStep">下一步</button>
        <button class="r-button primary" v-if="step === 2" @click="saveModel">保存到模板</button>
      </div>
    </pop-wrap>
    <msg :msgText="msgText" :isShow="isShowMsg"></msg>
    <m-alert :isShow="isShowAlter" :alertTxt="alertTxt" @closeAlert="hideAlert"></m-alert>
    <m-confirm :isShow="isShowConfirm" :confirmTxt="confirmTxt" @closeConfirm="closeConfirm" @confirmSure="confirmSure"></m-confirm>
    <m-loading :isShow="isloading" :loadingTxt="loadingTxt"></m-loading>
    <m-map :isShow="isMapShow" @getAddress="getAddress" @closeMap="closeMap"></m-map>
    <preview-video :isShow="isPreview" :videoItem="videoItem" @closePreview="closePreview"></preview-video>
    <m-prompt :isShow="isPrompt" title="佣金金额" @closePrompt="hidePrompt" @promptSure="promptSure"></m-prompt>
  </div>
</template>

<script>
import popWrap from 'base/pop-wrap/pop-wrap'
import {ERR_OK} from 'api/config'
import {tableAndPaginater, promptMixin, msgMixin, alterMixin, confirmMixin, loadingMixin, mapMixin, previewVideoMixin} from 'common/js/mixin'
import {modelMixin} from 'common/js/modelMixin'
import {getEditModelData} from 'api/model'
export default {
  mixins: [tableAndPaginater, promptMixin, msgMixin, alterMixin, confirmMixin, loadingMixin, mapMixin, previewVideoMixin, modelMixin],
  data () {
    return {
      step: 1,
      activityId: null
    }
  },
  created () {
    // 获取数据
    this._getEditModelData(this.$route.params.templetId)
  },
  components: {
    popWrap
  },
  methods: {
    _getEditModelData (templetId) {
      getEditModelData(templetId, {}, res => {
        if (res.code === ERR_OK) {
          // 初始化数据
          this.initData(res.data)
        } else {
          this.showAlert(res.msg)
        }
      })
    },
    // 上一步
    prevStep () {
      if (this.step === 2) {
        this.step = 1
      }
    },
    // 下一步
    nextStep () {
      if (this.step === 1) {
        this.step = 2
      }
    },
    // 关闭弹框
    closePop () {
      this.$router.push({
        path: '/acModel'
      })
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet">
@import '~common/stylus/theme'
.act-card
  padding: 30px 40px 0
.table-box
  height: 304px
  overflow-y: auto
.table-sub
  display: flex
  align-items: center
  overflow: hidden
  .table-sub-content
    width: calc(100% - 137px)
    text-align: left
  .table-sub-avatar
    width: 106px
    height: 68px
    flex: 0 0 122px
    border-radius: 4px
    overflow: hidden
    background-color: #E5E5E5
    margin-right: 15px
    img
      width: 100%
      height: 100%
  .table-subtit-box
    display: flex
    align-items: center
  .table-sub-tit
    font-size: 18px
    color: #333
    font-weight: bolder
    margin-right: 10px
    white-space: nowrap
  .table-sub-intro
    width: 100%
    overflow: hidden
    text-overflow: ellipsis
    white-space: nowrap
    font-size: 16px
    color: $subTxt
  .table-sub-viewed
     font-size: 14px
     color: $disabledTxt
   .table-sub-btn
     display: flex
.status-box
  display: flex
  justify-content: center
.icon-box
  display: inline-block
  .icon
     color: $mainColor
     font-size: 25px
     cursor: pointer
     margin-right: 10px
.read-only
  color: $light
</style>
