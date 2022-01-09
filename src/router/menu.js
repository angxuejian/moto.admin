
import Layout from '../layout/index'
export const ALL_MENU = [
  {
    path: '/only-page',
    name: 'OnlyPage',
    meta: {
      title: '单独页',
      // vcode: ['only-page'],
    },
    component: () => import('@/views/only-page/index'),
  },
  {
    path: '/user',
    name: 'User',
    meta: {
      title: '用户管理',
    },
    component: Layout,
    children : [
      {
        path: '/user/list',
        name: 'userList',
        meta: {
          title: '用户列表1',
        },
        component: () => import('@/views/user/list'),
      },
      {
        path: '/user/list2',
        name: 'userList2',
        meta: {
          title: '用户列表2',
        },
        component: () => import('@/views/user/list'),
      },
    ],
  },
  {
    path: '/project',
    name: 'Project',
    meta: {
      title: '项目管理',
    },
    component: Layout,
    children : [
      {
        path: '/project/list',
        name: 'ProjectList',
        meta: {
          title: '项目列表1',
        },
        component: () => import('@/views/project/list'),
        children : [
          {
            path: '/project/list1',
            name: 'ProjectList1',
            meta: {
              title : '列表一1',
              hidden: true,
            },
            component: () => import('@/views/project/views/project1'),
          },
          {
            path: '/project/list2',
            name: 'ProjectList2',
            meta: {
              title: '列表二',
              // vcode: ['project-list2'],
            },
            component: () => import('@/views/project/views/project1'),
          },
        ],
      },
      {
        path: '/project/list2',
        name: 'ProjectList2',
        meta: {
          title: '项目列表2',
        },
        component: () => import('@/views/project/list'),
      },
    ],
  },
]
