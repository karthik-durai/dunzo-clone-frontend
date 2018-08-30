import Vue from 'vue'
import index from './index.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(index)
}).$mount('#app')
