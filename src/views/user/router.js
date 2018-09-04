import Vue from 'vue'
import Router from 'vue-router'
import login from '../../components/login/login.vue'
import placeOrder from '../../components/order/placeOrder.vue'
import showOrders from '../../components/order/showOrders.vue'
import showprofile from '../../components/profile/profile.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: placeOrder
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/showOrders',
      name: 'showOrders',
      component: showOrders
    },
    {
      path: '/profile',
      name: 'showProfile',
      component: showprofile
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
