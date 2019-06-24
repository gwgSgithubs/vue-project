import * as types from './mutation-types'
const mutations = {
  [types.SET_BREAK] (state, breakData) {
    state.breakData = breakData
  },
  [types.SET_ISSHOWACTIVE] (state, isShowActive) {
    state.isShowActive = isShowActive
  }
}
export default mutations
