import Vue from 'vue'
import success from './success.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(success)
}).$mount('#app')
