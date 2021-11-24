import {
  createRouter,
  createWebHistory,
} from 'vue-router'
import Home from '../views/Home.vue'
import Layout from '../layout/index'

const routes = [
  {
    path     : '/',
    name     : 'index',
    component: Layout,
    redirect : '/home',
    children : [
      {
        path     : '/home',
        name     : 'Home',
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
        path     : '/user/list',
        name     : 'userList',
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
        path     : '/project/list',
        name     : 'projectList',
        component: () => import('@/views/project/list'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
