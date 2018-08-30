import Vue from 'vue'
import login from './login.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(login)
}).$mount('#app')
