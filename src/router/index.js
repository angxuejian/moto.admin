import {
  createRouter,
  createWebHistory,
} from 'vue-router'
import Login from '../views/login'
import Home from '../views/Home.vue'
import Layout from '../layout/index'

/**
 * @params {string}   path       路由地址
 * @params {string}   name       跳转路由地址名称
 * @params {template} component  组件(父页面可使用Layout布局组件)
 * @params {array}    children   子组件列表
 * @params {boolean}  hidden     是否显示路由
 * @params {object}   meta       自定义数据
 * @params {string}   meta.title 路由名称
 * @params {array}    meta.auth  校验路由权限
 * @params {boolean}  meta.keep  是否缓存页面(关闭标签页时、会销毁缓存)
 */
const routes = [
  {
    path: '/login',
    meta: {
      title: '登录',
    },
    component: Login,
  },
  {
    path     : '/',
    component: Layout,
    redirect : '/home',
    children : [
      {
        path: '/home',
        name: 'Home',
        meta: {
          title: '首页',
        },
        component: Home,
      },
    ],
  },
  {
    path     : '/user',
    name     : 'User',
    component: Layout,
    children : [
      {
        path: '/user/list',
        name: 'userList',
        meta: {
          title: '用户列表',
        },
        component: () => import('@/views/user/list'),
      },
    ],
  },
  {
    path     : '/project',
    name     : 'Project',
    component: Layout,
    children : [
      {
        path: '/project/list',
        name: 'projectList',
        meta: {
          title: '项目列表',
        },
        component: () => import('@/views/project/list'),
      },
    ],
  },

  {
    path: '/:pathMatch(.*)*',
    name: '404',
    meta: {
      title: '404',
    },
    component: () => import('@/views/error/404'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
