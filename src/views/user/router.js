import Vue from 'vue'
import Router from 'vue-router'
import login from '../../components/login/login.vue'
import placeOrder from '../../components/order/placeOrder.vue'
import showOrders from '../../components/order/showOrders.vue'
import showOrderDetails from '../../components/order/showOrderDetails.vue'
import userProfile from '../../components/profile/userProfile.vue'
import userMenu from '../../components/menu/userMenu.vue'
import about from '../../components/about/about.vue'
import addressForm from '../../components/location/addressForm.vue'
import searchLocation from '../../components/location/searchLocation.vue'
import userChat from '../../components/chats/userChat.vue'

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
      path: '/placeOrder/providePickUpAddress/addressForm',
      component: addressForm
    },
    {
      path: '/placeOrder/providePickUpAddress/searchLocation',
      component: searchLocation
    },
    {
      path: '/placeOrder/provideDropAddress/addressForm',
      component: addressForm
    },
    {
      path: '/placeOrder/provideDropAddress/searchLocation',
      component: searchLocation
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
