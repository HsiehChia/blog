import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AdminHome from '../views/AdminHome.vue'
import Cate from '../components/front/Cate.vue'
import Msg from '../components/front/Msg.vue'
import Login from '../components/front/Login.vue'
import ArticlePage from '../components/front/ArticlePage.vue'
import Fix from '../components/front/Fix.vue'
import PageList from '../components/front/PageList.vue'
import Welcome from '../components/admin/Welcome.vue'
import UserList from '../components/admin/UserList.vue'
import ArticleList from '../components/admin/ArticleList.vue'
import AddArticle from '../components/admin/AddArticle.vue'
import editArticle from '../components/admin/EditArticle.vue'
import CategoryList from '../components/admin/CategoryList.vue'
import RoleList from '../components/admin/RoleList.vue'
import AuthList from '../components/admin/AuthList.vue'
import DataCount from '../components/admin/DataCount.vue'
import MsgList from '../components/admin/MsgList.vue'

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
    path: '/fix',
    name: 'fix',
    component: Fix
  },
  {
    path: '/cate',
    name: 'Cate',
    component: Cate
  },
  {
    path: '/detail',
    name: 'ArticlePage',
    component: ArticlePage
  },
  {
    path: '/msg',
    name: 'Msg',
    component: Msg
  },
  {
    path: '/pagelist',
    name: 'PageList',
    component: PageList
  },
  {
    path: '/admin',
    name: 'Admin',
    redirect: '/admin/welcome',
    component: AdminHome,
    children: [{
      path: '/admin/welcome',
      name: 'Welcom',
      component: Welcome
    }, {
      path: '/admin/user',
      name: 'UserList',
      component: UserList
    }, {
      path: '/admin/article',
      name: 'ArticleList',
      component: ArticleList
    }, {
      path: '/admin/addArticle',
      name: 'AddArticle',
      component: AddArticle
    }, {
      path: '/admin/editArticle',
      name: 'editArticle',
      component: editArticle
    }, {
      path: '/admin/cate',
      name: 'CategoryList',
      component: CategoryList
    }, {
      path: '/admin/role',
      name: 'Role',
      component: RoleList
    }, {
      path: '/admin/auth',
      name: 'AuthList',
      component: AuthList
    }, {
      path: '/admin/datacount',
      name: 'DataCount',
      component: DataCount
    }, {
      path: '/admin/msg',
      name: 'MsgList',
      component: MsgList
    }]
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
