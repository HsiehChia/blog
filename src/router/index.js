import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AdminHome from '../views/AdminHome.vue'
import Cate from '../views/Cate.vue'
import Msg from '../views/Msg.vue'
import Login from '../components/Login.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/cate',
    name: 'Cate',
    component: Cate
  },
  {
    path: '/msg',
    name: 'Msg',
    component: Msg
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminHome
  }]
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to:将要访问路径
  // from: 从哪个路径跳转来
  // next: 放行 next('/login') 强制跳转
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (to.path === '/login') {
    if (tokenStr) {
      return next('/home')
    } else {
      return next()
    }
  } else {
    if (tokenStr) {
      return next()
    } else {
      return next('/login')
    }
  }
})

export default router
