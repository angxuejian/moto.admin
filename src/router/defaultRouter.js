import Login from '../views/login'
import Home from '../views/Home.vue'
import Layout from '../layout/index'

const defaultRouter = [
  {
    path: '/login',
    meta: {
      title: '登录',
    },
    hidden   : true,
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
          title: '首页1ss',
          icon : 'sunset',
        },
        component: Home,
      },
    ],
  },
  {
    path     : '/home22',
    component: Layout,
    children : [
      {
        path: '/home2222',
        name: 'Home2',
        meta: {
          title: '首页=2ss',
          icon : 'sunset',
        },
        component: Home,
      },
    ],
  },
  {
    path: '/403',
    name: '403',
    meta: {
      title: '403',
    },
    hidden   : true,
    component: () => import('@/views/error/403'),
  },

  {
    path: '/:pathMatch(.*)*',
    name: '404',
    meta: {
      title: '404',
    },
    hidden   : true,
    component: () => import('@/views/error/404'),
  },
]
export default defaultRouter
