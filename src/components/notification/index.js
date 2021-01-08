import Notification from './src/main.js'
// export default Notification
import '@/elementTheme/theme-chalk/src/notification.scss'

const install = function(Vue, opts = {}) {
  Vue.prototype.$knotify = Notification
}

export default {
  install
}
