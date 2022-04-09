import { createRouter, createWebHistory } from 'vue-router'


import MockExam from '../components/MockExam.vue'
import Signup from '../components/Signup.vue'
import Login from '../components/Login.vue'
import Dashboard from '../components/Dashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/mockexam',
      name: 'mockexam',
      component: MockExam
    },

    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },

    {
      path: '/login',
      name: 'login',
      component: Login
    },

    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    }
  ]
})

export default router
