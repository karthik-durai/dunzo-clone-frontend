import Vue from 'vue'
import runner from './runner.vue'
import router from './router.js'

export default new Vue({
  router,
  render: h => h(runner)
}).$mount('#app')
