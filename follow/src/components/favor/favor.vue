<template lang="html">
  <div class="">
    <user-list
    :title="title"
    :navData="navData"
    :listData="listData"
    :empty="empty"
    @favor="favor"
    @refresh="refresh"
    @load="load"
    @navChange="navChange"
    :showLoad="showLoad"
    ></user-list>
    <msg :show="msgShow" :msg="msgTit"></msg>
    <loading :show="loadingShow" :title="loadingTit"></loading>
  </div>
</template>

<script>
import userList from 'components/userList/userList'
import {getFavorData, getNavData, changeFavor} from 'api/favor'
import {ERR_OK, TIME_LIMIT} from 'api/config'
import Msg from 'base/msg/msg'
import Loading from 'base/loading/loading'
import {tipIconFormate, navFormate, storage} from 'common/js/common'
export default {
  data () {
    return {
      msgTit: '', //
      msgShow: false,
      loadingTit: '', // 加载文本
      loadingShow: false,
      title: '我的收藏',
      navData: [
        {
          num: 0,
          status: '',
          step: '全部'
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
      page: 1,
      size: 10,
      status: '', // 默认全部
      isLoad: true,
      showLoad: true,
      empty: false
    }
  },
  created () {
    storage('methodName', 'f')
    storage('path', '/favor')
    this._getData()
    this._getNavData()
  },
  methods: {
    // 初始化数据
    initData () {
      this.page = 1
      this.listData = []
      this.isLoad = true
      this.showLoad = true
    },
    //
    navChange (status) {
      // console.log(status)
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
    // 详情
    detail (item) {
      console.log(item)
    },
    // 收藏
    favor (item) {
      let openid = item.openid
      let isFavor = item.isFavor
      changeFavor({openid, isFavor}, (res) => {
        if (res.code === ERR_OK) {
          this.listData.map((v, i, arr) => {
            if (v.openid === openid) {
              v.isFavor = (v.isFavor ? 0 : 1)
            }
            return v
          })
          this.listData = []
          this._getNavData()
          this._getData()
        }
      })
    },
    _getNavData () {
      getNavData({}, (res) => {
        if (res.code === ERR_OK) {
          this.navData = navFormate(res.data)
        } else {

        }
      })
    },
    // 获取数据
    _getData () {
      this.loadingShow = true
      this.loadingTit = '数据载入中...'
      getFavorData({
        status: this.status,
        page: this.page,
        size: this.size
      }, (res) => {
        this.loadingShow = false
        if (res.code === ERR_OK) {
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
          this.msgTit = res.msg
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
