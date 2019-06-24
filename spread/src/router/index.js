import Vue from 'vue'
import Router from 'vue-router'
import Index from 'components/wrap/index'
import Login from 'components/login/index'
import Home from 'components/home/index'
import EditChurch from 'components/home/editChurch'
// 活动列表
import AcList from 'components/acManagement/acList/index'
import AddActive from 'components/acManagement/acList/add'
import EditActive from 'components/acManagement/acList/edit'
import DetailActive from 'components/acManagement/acList/detail'
// 活动模板
import AcModel from 'components/acManagement/acModel/index'
import AddModel from 'components/acManagement/acModel/add'
import EditModel from 'components/acManagement/acModel/edit'
import CopyModel from 'components/acManagement/acModel/copy'
import DetailModel from 'components/acManagement/acModel/detail'
// 本地标签
import LocalTag from 'components/acManagement/localTag/index'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/index',
      component: Index,
      children: [
        {
          path: '/',
          redirect: '/home'
        },
        {
          path: '/home',
          component: Home,
          children: [
            {
              path: '/editChurch',
              component: EditChurch
            }
          ]
        },
        {
          path: '/acList',
          component: AcList,
          children: [
            {
              path: 'add',
              component: AddActive
            },
            {
              path: 'edit/:id',
              component: EditActive
            },
            {
              path: 'detail/:id',
              component: DetailActive
            }
          ]
        },
        {
          path: '/acModel',
          component: AcModel,
          children: [
            {
              path: 'add',
              component: AddModel
            },
            {
              path: 'edit/:templetId',
              component: EditModel
            },
            {
              path: 'copy/:templetId',
              component: CopyModel
            },
            {
              path: 'detail/:templetId',
              component: DetailModel
            }
          ]
        },
        {
          path: '/localTag',
          component: LocalTag
        }
      ]
    }
  ]
})
