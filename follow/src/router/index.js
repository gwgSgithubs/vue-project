import Vue from 'vue'
import Router from 'vue-router'
import Task from 'components/task/task'
import Favor from 'components/favor/favor'
import Move from 'components/move/move'
import UserDetail from 'components/user-detail/user-detail'
import UserInfo from 'components/user-info/user-info'
import FollowInfo from 'components/follow-info/follow-info'
import VideoInfo from 'components/video-info/video-info'
import Login from 'components/login/login'
import Finish from 'components/finish/finish'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/finish',
      name: 'Finish',
      component: Finish
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/task',
      name: 'Task',
      component: Task
    },
    {
      path: '/favor',
      name: 'Favor',
      component: Favor
    },
    {
      path: '/move',
      name: 'Move',
      component: Move
    },
    {
      path: '/userDetail',
      component: UserDetail,
      // name: 'userDetail',
      children: [
        {
          path: '/',
          redirect: 'userInfo'
        },
        {
          path: 'userInfo',
          component: UserInfo
        },
        {
          path: 'followInfo',
          component: FollowInfo
        },
        {
          path: 'videoInfo',
          component: VideoInfo
        }
      ]
    }
  ]
})
