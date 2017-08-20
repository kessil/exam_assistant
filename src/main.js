// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-teal.css'
Vue.use(MuseUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  created() {
    // Vue全局变量userData保存的是json字符串，这样就不会被子组件随意修改造成维护困难
    Vue.prototype.userData = JSON.stringify(require('../data.json').questions);
    Vue.prototype.myMistakes = [];  // 错题集
    Vue.prototype.myStars = [];     // 收藏簿
  }
})
