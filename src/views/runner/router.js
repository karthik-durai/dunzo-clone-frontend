import Vue from 'vue'
import Router from 'vue-router'
import showCurrentAssignment from '../../components/assignments/showCurrentAssignment.vue'
import showPastAssignments from '../../components/assignments/showPastAssignments.vue'
import runnerMenu from '../../components/menu/runnerMenu.vue'
import runnerProfile from '../../components/profile/runnerProfile.vue'
import runnerLogin from '../../components/login/runnerLogin.vue'
import about from '../../components/about/about.vue'
// import runnerChat from '../../components/chats/runnerChat.vue'

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
    },
    // {
    //   path: '/showCurrentAssignment/chat',
    //   component: runnerChat,
    //   children: [
    //     {
    //       path: 'menu',
    //       component: runnerMenu
    //     }
    //   ]
    // },
    {
      path: '/showPastAssignments',
      component: showPastAssignments,
    },
    {
      path: '/myProfile',
      component: runnerProfile,
    },
    {
      path: '/login',
      component: runnerLogin
    },
    {
      path: '/about',
      component: about,
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
