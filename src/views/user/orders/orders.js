import Vue from 'vue'
import orders from './orders.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(orders)
}).$mount('#app')
