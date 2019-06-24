import Msg from 'base/msg/msg'
import MAlert from 'base/alert/alert'
import MConfirm from 'base/confirm/confirm'
import MLoading from 'base/loading/loading'
import MPrompt from 'base/prompt/prompt'
import PreviewVideo from 'base/preview-video/preview-video'
import MMap from 'base/map/map'

export const promptMixin = {
  data () {
    return {
      isPrompt: false
    }
  },
  methods: {
    hidePrompt () {
      this.isPrompt = false
    },
    showPrompt () {
      this.isPrompt = true
    }
  },
  components: {
    MPrompt
  }
}
export const msgMixin = {
  data () {
    return {
      // 提示内容
      msgText: null,
      isShowMsg: false
    }
  },
  methods: {
    showMsg (txt) {
      this.msgText = txt
      this.isShowMsg = true
      this.timeDown()
    },
    timeDown () {
      setTimeout(() => {
        this.msgText = null
        this.isShowMsg = false
      }, 2000)
    }
  },
  components: {
    Msg
  }
}
export const alterMixin = {
  data () {
    return {
      isShowAlter: false,
      alertTxt: ''
    }
  },
  methods: {
    showAlert (txt) {
      this.alertTxt = txt
      this.isShowAlter = true
    },
    hideAlert () {
      this.alertTxt = ''
      this.isShowAlter = false
    }
  },
  components: {
    MAlert
  }
}
export const confirmMixin = {
  data () {
    return {
      isShowConfirm: false,
      confirmTxt: ''
    }
  },
  methods: {
    showConfirm (txt) {
      this.confirmTxt = txt
      this.isShowConfirm = true
    },
    closeConfirm () {
      this.confirmTxt = ''
      this.isShowConfirm = false
    }
  },
  components: {
    MConfirm
  }
}
export const loadingMixin = {
  data () {
    return {
      isloading: false,
      loadingTxt: '加载中...'
    }
  },
  methods: {
    showLoading (txt) {
      this.loadingTxt = txt || '加载中...'
      this.isloading = true
    },
    hideLoading () {
      this.isloading = false
    }
  },
  components: {
    MLoading
  }
}
export const tableAndPaginater = {
  data () {
    return {
      currentPage: 1,
      page: 1,
      sizeNum: 10,
      pageSizes: [10, 20, 30, 40],
      totalElements: null
    }
  }
}
// 地图
export const mapMixin = {
  data () {
    return {
      isMapShow: false
    }
  },
  methods: {
    // 关闭地图
    closeMap () {
      this.isMapShow = false
    }
  },
  components: {
    MMap
  }
}
// 视频预览
export const previewVideoMixin = {
  data () {
    return {
      // 预览
      isPreview: false,
      videoItem: null
    }
  },
  methods: {
    closePreview () {
      this.isPreview = false
    }
  },
  components: {
    PreviewVideo
  }
}
