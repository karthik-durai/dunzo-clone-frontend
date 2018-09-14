import Vue from 'vue'
import Router from 'vue-router'
import showCurrentAssignment from '../../components/assignments/showCurrentAssignment.vue'
import showPastAssignments from '../../components/assignments/showPastAssignments.vue'
import runnerMenu from '../../components/menu/runnerMenu.vue'
import runnerProfile from '../../components/profile/runnerProfile.vue'
import runnerLogin from '../../components/login/runnerLogin.vue'
import about from '../../components/about/about.vue'
// import chatWindow from '../../components/chats/chatWindow.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/showCurrentAssignment'
    },
    {
      path: '/showCurrentAssignment',
      component: showCurrentAssignment,
      children: [
        {
          path: 'menu',
          component: runnerMenu
        }
      ]
    },
    // {
    //   path: '/showCurrentAssignment/chat:id',
    //   component: chatWindow
    // },
    {
      path: '/showPastAssignments',
      component: showPastAssignments,
      children: [
        {
          path: 'menu',
          component: runnerMenu
        }
      ]
    },
    {
      path: '/myProfile',
      component: runnerProfile,
      children: [
        {
          path: 'menu',
          component: runnerMenu
        }
      ]
    },
    {
      path: '/login',
      component: runnerLogin
    },
    {
      path: '/about',
      component: about,
      children: [
        {
          path: 'menu',
          component: runnerMenu
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
