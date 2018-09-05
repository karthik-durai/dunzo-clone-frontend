import Vue from 'vue'
import Router from 'vue-router'
import showAssignments from '../../components/assignments/showAssignments.vue'
import showAssignmentDetails from '../../components/assignments/showAssignmentDetails.vue'
import userInfo from '../../components/user/userInfo.vue'
import runnerMenu from '../../components/menu/runnerMenu.vue'
import runnerProfile from '../../components/profile/runnerProfile.vue'
import login from '../../components/login/login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/showAssignments'
    },
    {
      path: '/showAssignments',
      component: showAssignments,
      children: [
        {
          path: 'menu',
          components: runnerMenu
        }
      ]
    },
    {
      path: '/showAssignments/:id',
      component: showAssignmentDetails,
      children: [
        {
          path: 'menu',
          components: runnerMenu
        }
      ]
    },
    {
      path: '/showAssignments/:id/userInfo',
      component: userInfo,
      children: [
        {
          path: 'menu',
          components: runnerMenu
        }
      ]
    },
    {
      path: '/myProfile',
      component: runnerProfile,
      children: [
        {
          path: 'menu',
          components: runnerMenu
        }
      ]
    },
    {
      path: '/login',
      component: login
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
