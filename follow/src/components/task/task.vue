<template lang="html">
  <div class="">
    <user-list
      :title="title"
      :navData="navData"
      :listData="listData"
      :empty="empty"
      @toFinish="toFinish"
      @favor="favor"
      @refresh="refresh"
      @load="load"
      @navChange="navChange"
      :showLoad="showLoad"></user-list>
    <router-view></router-view>
    <msg :show="msgShow" :msg="msgTit"></msg>
    <loading :show="loadingShow" :title="loadingTit"></loading>
  </div>
</template>

<script>
import userList from 'components/userList/userList'
import {getTaskData, changeFavor, getNavData} from 'api/task'
import {ERR_OK, TIME_LIMIT} from 'api/config'
import Msg from 'base/msg/msg'
import Loading from 'base/loading/loading'
import {tipIconFormate, navFormate, storage} from 'common/js/common'
export default {
  data () {
    return {
      title: '我的任务',
      navData: [
        {
          num: 0,
          status: '',
          step: '全&nbsp;部'
        },
        {
          num: 0,
          status: 1,
          step: '***'
        },
        {
          num: 0,
          status: 2,
          step: '***'
        },
        {
          num: 0,
          status: 3,
          step: '***'
        },
        {
          num: 0,
          status: 4,
          step: '***'
        },
        {
          num: 0,
          status: 5,
          step: '***'
        }
      ],
      listData: [],
      msgTit: '', //
      msgShow: false,
      loadingTit: '', // 加载文本
      loadingShow: false,
      page: 1,
      size: 10,
      status: '', // 默认全部
      isLoad: true, // 是否下拉加载
      showLoad: true, // 是否到底
      empty: false // 是否为空
    }
  },
  created () {
    storage('methodName', 't')
    storage('path', '/task')
    this._getData()
    this._getNavData()
  },
  methods: {
    // 完成页面
    toFinish () {
      storage('path', '/finish')
      console.log(this.$router)
      this.$router.push({
        path: '/finish'
      })
    },
    // 初始化数据
    initData () {
      this.page = 1
      this.listData = []
      this.isLoad = true
      this.showLoad = true
    },
    //
    navChange (status) {
      this.status = status
      this.initData()
      this._getData()
    },
    // 上拉加载
    load () {
      if (this.isLoad) {
        this._getData()
      }
    },
    // 下拉加载
    refresh () {
      // 初始化page, listData
      this.initData()
      this._getData()
    },
    // 收藏
    favor (item) {
      let openid = item.openid
      let isFavor = item.isFavor
      let notice = ''
      let loadingNotice = ''
      notice = (isFavor ? '取消收藏成功' : '收藏成功')
      loadingNotice = (isFavor ? '取消收藏中...' : '收藏中...')
      this.loadingShow = true // 加载显示
      this.loadingTit = loadingNotice
      changeFavor({openid, isFavor}, (res) => {
        this.loadingShow = false // 加载隐藏
        this.msgShow = true // 提示框显示
        if (res.code === ERR_OK) {
          this.listData.map((v, i, arr) => {
            if (v.openid === openid) {
              v.isFavor = (v.isFavor ? 0 : 1)
            }
            return v
          })
          this.msgTit = notice
        } else {
          this.msgTit = notice
        }
        let timer = setTimeout(() => {
          this.msgShow = false
          clearTimeout(timer)
        }, TIME_LIMIT)
      })
    },
    _getNavData () {
      getNavData({}, (res) => {
        if (ERR_OK === 200) {
          // console.log(navFormate(res.data))
          this.navData = navFormate(res.data)
        } else {

        }
      })
    },
    _getData () {
      this.loadingShow = true
      this.loadingTit = '数据载入中...'
      getTaskData({
        status: this.status,
        page: this.page,
        size: this.size
      }, (res) => {
        this.loadingShow = false
        if (ERR_OK === 200) {
          let listData = this.listData
          let resData = tipIconFormate(res.data.content)
          this.listData = [...listData, ...resData]
          this.empty = !this.listData.length
          if (resData.length < this.size) {
            this.isLoad = false
            this.showLoad = false
            return
          }
          this.page += 1
        } else {
          this.msgShow = true
          this.msgTit = '加载失败'
          let timer = setTimeout(() => {
            clearTimeout(timer)
            this.msgShow = false
          }, TIME_LIMIT)
        }
      })
    }
  },
  components: {
    userList,
    Msg,
    Loading
  }
}
</script>

<style lang="css">
</style>
