import Vue from 'vue'
import Router from 'vue-router'
import login from '../../components/login/login.vue'
import placeOrder from '../../components/order/placeOrder.vue'
import showOrders from '../../components/order/showOrders.vue'
import showOrderDetails from '../../components/order/showOrderDetails.vue'
import showprofile from '../../components/profile/profile.vue'
import userMenu from '../../components/menu/userMenu.vue'
import about from '../../components/about/about.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/placeOrder'
    },
    {
      path: '/placeOrder',
      component: placeOrder,
      children: [
        {
          path: 'menu',
          component: userMenu
        }
      ]
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/showOrders',
      component: showOrders,
      children: [
        {
          path: 'menu',
          component: userMenu
        }
      ]
    },
    {
      path: '/showOrders/:id',
      component: showOrderDetails,
      children: [
        {
          path: 'menu',
          component: userMenu
        }
      ]
    },
    {
      path: '/profile',
      component: showprofile,
      children: [
        {
          path: 'menu',
          component: userMenu
        }
      ]
    },
    {
      path: '/about',
      component: about,
      children: [
        {
          path: 'menu',
          component: userMenu
        }
      ]
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
