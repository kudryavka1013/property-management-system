import Vue from 'vue'
import VueRouter from 'vue-router'
import User from '../views/User.vue'
import About from '../views/About.vue'
import Login from '../views/Login.vue'
import Settings from '../views/Settings.vue'
import Register from '../views/Register.vue'
import CommunityManage from '../views/CommunityManage'
import BuildingManage from '../views/BuildingManage'
import HouseholdManage from '../views/HouseholdManage'
import OwnerManage from '../views/OwnerManage'
import store from '@/store'
Vue.use(VueRouter)

const routes = [{
    path: '/user',
    name: 'user',
    meta: {
      requireAuth: true
    },
    component: User
  },
  {
    path: '/about',
    name: 'about',
    meta: {
      requireAuth: false
    },
    component: About
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      requireAuth: false
    },
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      requireAuth: true
    },
    component: Register
  },
  {
    path: '/settings',
    name: 'settings',
    meta: {
      requireAuth: true
    },
    component: Settings
  },
  {
    path: '/community',
    name: 'community',
    meta: {
      requireAuth: true
    },
    component: CommunityManage
  },
  {
    path: '/building',
    name: 'building',
    meta: {
      requireAuth: true
    },
    component: BuildingManage
  },
  {
    path: '/household',
    name: 'household',
    meta: {
      requireAuth: true
    },
    component: HouseholdManage
  },
  {
    path: '/ownerManage',
    name: "ownerManage",
    meta: {
      requireAuth: true
    },
    component: OwnerManage
  },
  {
    path: '*',
    redirect: '/login'
  },
]


const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth && store.state.isAuthenticated == false) {
    alert('请先登录')
    next('/login')
  } else {
    next()
  }

})

export default router