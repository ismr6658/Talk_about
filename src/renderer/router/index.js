import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  linkActiveClass:'link-act',
  base:__dirname,
  routes: [
    {
      path:'/',
      name:'login',
      component:require('@/components/login').default
    },
    {
      path: '/home',
      name: 'landing-page',
      component: require('@/components/LandingPage').default
    },
    {
      path:'/user',
      name:'user',
      component:require('@/components/a').default
    },
    {
      path:'/set',
      name:'set',
      component:require('@/components/set').default,
      children:[
        // {
        //   path:'/',
        //   name:'counter',
        //   component:require('@/components/sett/count')
        // },
        // {
        //   path:'/common',
        //   name:'common',
        //   componnets:require('@/components/sett/common')
        // },
        {
          path:'/',
          name:'count',
          components:require('@/components/sett/count')
        },
        {
          path:'/common',
          name:'common',
          components:require('@/components/sett/common')
        },
        {
          path:'/quick',
          name:'quick',
          components:require('@/components/sett/quick')
        },
        {
          path:'/about',
          name:'about',
          components:require('@/components/sett/about')
        }
      ]
    }
  ]
})
