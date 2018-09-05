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
      redirect: '/placeOrder'
    },
    {
      path: '/placeOrder',
      component: placeOrder
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/showOrders',
      component: showOrders
    },
    {
      path: '/profile',
      component: showprofile
    }
    // {
    //   path: '/showOrderDetails',
    //   name: 'showOrderDetails',
    //   component: showOrderDetails
    // }
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
