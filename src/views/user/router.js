import Vue from 'vue'
import Router from 'vue-router'
import user from './user.vue'
import login from '../../components/login/login.vue'
import placeOrder from '../../components/order/placeOrder.vue'
import showOrders from '../../components/order/showOrders.vue'
import showOrderDetails from '../../components/order/showOrderDetails.vue'
import userProfile from '../../components/profile/userProfile.vue'
import about from '../../components/about/about.vue'
import userChat from '../../components/chats/userChat.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      component: login
    },
    {
      path: '/',
      component: user,
      children:[
        {
          path: '/',
          redirect: '/placeOrder'
        },
        {
          path: '/placeOrder',
          component: placeOrder
        },
        {
          path: '/showOrders',
          component: showOrders
        },
        {
          path: '/showOrderDetails/:id',
          component: showOrderDetails
        },
        {
          path: '/showOrderDetails/:id/chat',
          component: userChat
        },
        {
          path: '/myProfile',
          component: userProfile
        },
        {
          path: '/about',
          component: about
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
