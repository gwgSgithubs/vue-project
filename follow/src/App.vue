<template>
  <div id="app">
    <!-- <keep-alive>
    </keep-alive> -->
    <router-view></router-view>
    <!-- <login v-show="!isLoading"></login> -->
    <navs></navs>
    <!-- 搜索页面 -->
    <search :show="showSearch"></search>
  </div>
</template>

<script>
// import Login from 'components/login/login'
import Search from 'components/search/search'
import Navs from 'components/nav/nav'
import {storage} from 'common/js/common'
import {mapGetters} from 'vuex'
export default {
  name: 'App',
  components: {
    // Login,
    Search,
    Navs
  },
  data () {
    return {
      // login: false
    }
  },
  created () {
    // 判断是否登录
    let res = storage('loginData')
    if (!res) {
      document.title = '用户登录-福音跟进客户端'
      this.$router.push({
        path: '/login'
      })
    } else {
      document.title = '福音跟进客户端'
    }
  },
  methods: {
    // ...mapMutations({
    //   setLogin: 'SET_LONGIN'
    // })
  },
  computed: {
    ...mapGetters([
      'showSearch'
    ])
  }
}
</script>

<style scoped rel="stylesheet/stylus" lang="stylus">
</style>
