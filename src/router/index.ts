import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/login/index.vue')
  },
  {
    path: '/',
    name:'home',
    component: () => import(/* webpackChunkName: "about" */ '../layout/default.vue'),
    redirect: '/orderManage',
    children:[
      {
        path: '/goodManage',
        name: 'goodManage',
        component: () => import(/* webpackChunkName: "about" */ '../views/goodManage/index.vue')
      },
      {
        path: '/orderManage',
        name: 'orderManage',
        component: () => import(/* webpackChunkName: "about" */ '../views/orderManage/index.vue')
      },
      {
        path: '/carTeamManage',
        name: 'carTeamManage',
        component: () => import(/* webpackChunkName: "about" */ '../views/carTeamManage/index.vue')
      },
      {
        path: '/carManage',
        name: 'carManage',
        component: () => import(/* webpackChunkName: "about" */ '../views/carManage/index.vue')
      },
      {
        path: '/startAdressManage',
        name: 'startAdressManage',
        component: () => import(/* webpackChunkName: "about" */ '../views/startAdressManage/index.vue')
      },
      {
        path: '/endAdressManage',
        name: 'endAdressManage',
        component: () => import(/* webpackChunkName: "about" */ '../views/endAdressManage/index.vue')
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
