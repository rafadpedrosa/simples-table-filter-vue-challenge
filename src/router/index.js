import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import PrivateLayout from '@/layout/PrivateLayout'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: PrivateLayout,
    children: [
      {
        path: '/',
        name: 'home',
        component: Home
      }
    ]
  },
  {
    path: '/**',
    name: 'redirect-home',
    beforeEnter: (to, from, next) => next('/')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
