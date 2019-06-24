import * as types from './mutation-types'
const mutations = {
  [types.SET_SHADOWINDEX] (state, shadowIndex) {
    state.shadowIndex = shadowIndex
  },
  [types.SET_LONGIN] (state, isLogin) {
    state.isLogin = isLogin
  },
  [types.SET_METHODNAME] (state, methodName) {
    state.methodName = methodName
  },
  [types.SET_OPENID] (state, openid) {
    state.openid = openid
  },
  [types.SET_SOF] (state, sof) {
    state.sof = sof
  },
  [types.SET_SEARCH] (state, showSearch) {
    state.showSearch = showSearch
  }
}
export default mutations
