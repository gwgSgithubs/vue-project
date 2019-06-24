// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'common/stylus/index.styl'
import 'babel-polyfill'
import VueAMap from 'vue-amap'
// import ECharts from 'vue-echarts'
// Vue.component('v-chart', ECharts)
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
  key: 'd7918df5144f6581c70b3e99bbc94da5',
  plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PlaceSearch', 'AMap.Geolocation', 'AMap.Geocoder'],
  v: '1.4.4',
  uiVersion: '1.0'
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
