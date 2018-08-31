import Vue from 'vue'
import orders from './orders.vue'
import router from './router.js'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(orders)
}).$mount('#app')
