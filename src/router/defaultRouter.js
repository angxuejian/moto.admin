import Login from '../views/login'
import Home from '../views/Home.vue'
import Layout from '../layout/index'
import Pdf from '@/views/onlyPage/pdf'
const defaultRouter = [
  {
    path: '/login',
    meta: {
      title: '登录',
    },
    hidden: true,
    component: Login,
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        meta: {
          title: '首页',
          icon: 'sunset',
        },
        component: Home,
      },
    ],
  },
  {
    path: '/pdf',
    component: Pdf,
    meta: {
      title: 'PDF',
      pageTitle: '2022 - 框出未来',
    },
  },
  {
    path: '/403',
    name: '403',
    meta: {
      title: '403',
    },
    hidden: true,
    component: () => import('@/views/error/403'),
  },

  {
    path: '/:pathMatch(.*)*',
    name: '404',
    meta: {
      title: '404',
    },
    hidden: true,
    component: () => import('@/views/error/404'),
  },
]
export default defaultRouter
