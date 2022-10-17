import { createRouter, createWebHistory } from 'vue-router'


import MockExam from '../components/MockExam.vue'
import Signup from '../components/Signup.vue'
import Login from '../components/Login.vue'
import Dashboard from '../components/Dashboard.vue'
import MyMocks from '../components/MyMocks.vue'
import CallBack from '../components/CallBack.vue'
import Profile from '../components/Profile.vue'
import Package_checkout from '../components/Package_checkout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
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
    },

    {
      path: '/checkout',
      name: 'checkout',
      component: Package_checkout
    },

    {
      path: '/my_mocks',
      name: 'my_mocks',
      component: MyMocks
    },

    {
      path: '/callback',
      name: 'callback',
      component: CallBack
    },

    {
      path: '/profile',
      name: 'profile',
      component: Profile
    }
  ]
})


// http://themockmaster.com/?status=failed&tx_ref=176898067&transaction_id=null

// http://themockmaster.com/?status=successful&tx_ref=577079111&transaction_id=590756932

// https://tmmfrontend.herokuapp.com/dashboard?status=cancelled&tx_ref=64648448

export default router
