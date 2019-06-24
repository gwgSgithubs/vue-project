<template lang="html">
  <div class="">
    <div class="bak-white aclist" v-if="isShowActive">
      <el-row :gutter="20" class="input-h28">
        <el-col :xl="16" :lg="24">
          <el-row :gutter="20">
            <el-col :xl="12" :lg="12" class="mb20">
              <div class="search-box">
                <div class="ipt-box">
                  <div class="label">活动开始时间:</div>
                  <el-date-picker
                    v-model="activeStartVal"
                    type="datetimerange"
                    range-separator="至"
                    @change="getStartTime"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间">
                  </el-date-picker>
                </div>
              </div>
            </el-col>
            <el-col :xl="12" :lg="12" class="mb20">
              <div class="search-box">
                <div class="ipt-box">
                  <div class="label">活动结束时间:</div>
                  <el-date-picker
                    v-model="activeEndVal"
                    @change="getEndTime"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间">
                  </el-date-picker>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :xl="8" :lg="24" class="mb20">
          <div class="search-box">
            <div class="ipt-box border-no-r">
              <div class="label">活动状态:</div>
              <el-select v-model="status" clearable placeholder="请选择" @change="changeStatus">
                <el-option
                  v-for="item in statusList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="ipt-box flex1 border-no-l">
              <el-input placeholder="输入活动单号、订单名称" v-model="actName" class="input-with-select" @change="changeActName">
                <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </div>
          </div>
        </el-col>
      </el-row>
      <div class="txt-right p5">
        <button class="r-button brif small" @click="deleteActive">删除</button>
        <button class="r-button brif small" @click="editActive">编辑</button>
        <button class="r-button brif small" @click="lookActive">查看</button>
        <button class="r-button brif small" @click="addActive">新增</button>
      </div>
      <el-table
        ref="tabList"
        :data="activeList"
        border
        stripe
        tooltip-effect="dark"
        style="width: 100%"
        @row-click="rowClickSelect"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          align="center"
          width="55">
        </el-table-column>
        <el-table-column
          prop="actCode"
          align="center"
          label="活动编号"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="actName"
          align="center"
          label="活动标题"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="actDesc"
          align="center"
          label="活动描述"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="statusTxt"
          align="center"
          label="活动状态"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="updateTime"
          align="center"
          label="最后编辑时间"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="startTime"
          align="center"
          label="活动开始时间"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="endTime"
          align="center"
          label="活动结束时间"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="publishTime"
          align="center"
          label="发布时间"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="nickName"
          align="center"
          label="发布人"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="head"
          align="center"
          label="负责人"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="amount"
          align="center"
          label="活动预算金额"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="factAmount"
          align="center"
          label="实际使用金额"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="actRemark"
          label="活动备注"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
      </el-table>
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
    </div>
    <router-view></router-view>
    <msg :msgText="msgText" :isShow="isShowMsg"></msg>
    <m-alert :isShow="isShowAlter" :alertTxt="alertTxt" @closeAlert="hideAlert"></m-alert>
    <m-confirm :isShow="isShowConfirm" :confirmTxt="confirmTxt" @closeConfirm="closeConfirm" @confirmSure="confirmSure"></m-confirm>
    <m-loading :isShow="isloading" :loadingTxt="loadingTxt"></m-loading>
  </div>
</template>

<script>
import {ERR_OK} from 'api/config'
import {tableAndPaginater, msgMixin, alterMixin, confirmMixin, loadingMixin} from 'common/js/mixin'
import {reSetActiveList} from 'common/js/common'
import {activeStatusListCofg} from 'common/js/config'
import {getActiveList, deleteActiveData} from 'api/active'
import {mapGetters, mapMutations} from 'vuex'
export default {
  mixins: [tableAndPaginater, msgMixin, alterMixin, confirmMixin, loadingMixin],
  computed: {
    ...mapGetters([
      'isShowActive'
    ])
  },
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      // isRouterAlive: true,
      select: '',
      activeEndVal: null,
      activeStartVal: null,
      activeList: [],
      multipleSelection: [],
      // 活动开始时间范围
      startTime: null,
      endTime: null,
      // 活动结束时间范围
      sTime: null,
      eTime: null,
      status: null,
      statusList: null,
      actName: null
    }
  },
  created () {
    // 获取活动列表数据
    this._getActiveList()
    //
    this._initData()
  },
  methods: {
    reload () {
      // this.isRouterAlive = false
      this.$nextTick(function () {
        // this.isRouterAlive = true
        this.startTime = null
        this.endTime = null
        this.startTime = null
        this.endTime = null
        this.status = null
        this.actName = null
        this._getActiveList()
      })
    },
    // 查看活动
    lookActive () {
      if (this.multipleSelection.length === 0) {
        this.showAlert('请选择需要查看的活动')
        return false
      }
      if (this.multipleSelection.length > 1) {
        this.showAlert('只能查看一个活动')
        return false
      }
      this.$router.push({
        path: `/acList/detail/${this.multipleSelection[0].id}`
      })
    },
    // 编辑活动
    editActive () {
      console.log(this.multipleSelection)
      if (this.multipleSelection.length === 0) {
        this.showAlert('请选择需要编辑的活动')
        return false
      }
      if (this.multipleSelection.length > 1) {
        this.showAlert('只能编辑一个活动')
        return false
      }
      if (this.multipleSelection[0].status !== 1) {
        this.showAlert('活动已发布不能编辑')
        return false
      }
      this.$router.push({
        path: `/acList/edit/${this.multipleSelection[0].id}`
      })
    },
    // 新增活动
    addActive () {
      this.setShowActive(false)
      this.$router.push({
        path: '/acList/add'
      })
    },
    // 确定删除
    confirmSure () {
      this.isShowConfirm = false
      this._deleteActive()
    },
    // 删除
    deleteActive () {
      if (this.multipleSelection.length === 0) {
        this.showAlert('请选择要删除的活动')
      } else {
        this.showConfirm('确定删除, 是否继续?')
      }
    },
    // 删除
    _deleteActive () {
      deleteActiveData({activityIds: this.multipleSelection[0].id}, (res) => {
        if (res.code === ERR_OK) {
          this._getActiveList()
        } else {
          this.showAlert('删除失败')
        }
      })
    },
    // 活动单号、订单名称
    changeActName (e) {
      // console.log(e)
      this.actName = e
      this._getActiveList()
    },
    // 活动状态
    changeStatus (e) {
      // console.log(e)
      this.status = e
      this._getActiveList()
    },
    //
    _initData () {
      this.statusList = activeStatusListCofg
    },
    // 活动结束时间
    getEndTime (time) {
      this.activeEndVal = time
      if (!time) {
        this.sTime = null
        this.eTime = null
      } else {
        if (this.endTime) {
          if (+new Date(time[0]) < this.endTime) {
            this.activeEndVal = null
            // 提示弹框
            this.showMsg('开始时间不能大于结束时间')
            this.sTime = null
            this.eTime = null
            return false
          } else {
            this.sTime = +new Date(time[0])
            this.eTime = +new Date(time[1])
          }
        } else {
          this.sTime = +new Date(time[0])
          this.eTime = +new Date(time[1])
        }
      }
      this._getActiveList()
    },
    // 活动开始时间
    getStartTime (time) {
      this.activeStartVal = time
      if (!time) {
        this.startTime = null
        this.endTime = null
      } else {
        if (this.sTime) {
          if (+new Date(time[1]) > this.sTime) {
            this.activeStartVal = null
            // 提示弹框
            this.showMsg('开始时间不能大于结束时间')
            this.startTime = null
            this.endTime = null
            return
          } else {
            this.startTime = +new Date(time[0])
            this.endTime = +new Date(time[1])
          }
        } else {
          this.startTime = +new Date(time[0])
          this.endTime = +new Date(time[1])
        }
      }
      this._getActiveList()
    },
    // 获取活动列表数据
    _getActiveList () {
      this.activeList = []
      let data = {page: this.page, size: this.size, startTime: this.startTime, endTime: this.endTime, sTime: this.sTime, eTime: this.eTime, status: this.status, actName: this.actName}
      this.showLoading()
      getActiveList(data, (res) => {
        this.hideLoading()
        if (res.code === ERR_OK) {
          // console.log(res)
          this.activeList = this.activeList.concat(reSetActiveList(res.data.content))
          this.totalElements = res.data.totalElements
        } else {
          this.showAlert(res.msg)
        }
        this.multipleSelection = []
      })
    },
    // 单击行时
    rowClickSelect (row) {
      // console.log(val)
      this.$refs.tabList.toggleRowSelection(row)
    },
    // 勾选时
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 选择每页的数量
    handleSizeChange (val) {
      this.sizeNum = val
      this._getActiveList()
    },
    // 选择当前页
    handleCurrentChange (val) {
      this.page = val
      this.currentPage = val
      this._getActiveList()
    },
    ...mapMutations({
      setShowActive: 'SET_ISSHOWACTIVE'
    })
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.aclist
  padding: 38px 38px 20px
  margin-bottom: 20px
</style>
