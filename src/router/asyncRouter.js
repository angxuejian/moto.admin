
import Layout from '../layout/index'
const asyncRouter = [
  {
    path: '/export-manage',
    name: 'ExportManage',
    children: [
      {
        path: '/export-file',
        name: 'ExportFile',
        meta: {
          title: '文件导出',
          icon: 'files',
        },
        component: () => import('@/views/export/index'),
      },
    ],
    component: Layout,
  },
  {
    path: '/test',
    name: 'Test',
    meta: {
      title: '测试管理',
      icon: 'files',
    },
    redirect: '/test1',
    children: [
      {
        path: '/test1',
        name: 'Test1',
        meta: {
          title: '测试1',
          icon: 'files',
        },
        component: () => import('@/views/test/test1'),
      },
      {
        path: '/test2',
        name: 'Test2',
        meta: {
          title: '测试2',
          icon: 'files',
        },
        component: () => import('@/views/test/test2'),
      },
      {
        path: '/test3',
        name: 'Test3',
        redirect: '/test31',
        meta: {
          title: '测试3',
          icon: 'files',
        },
        component: () => import('@/views/test/test3'),
        children: [
          {
            path: '/test31',
            name: 'Test31',
            meta: {
              title: '测试31',
              icon: 'files',
            },
            component: () => import('@/views/test/test3/test31'),
          },
          {
            path: '/test32',
            name: 'Test32',
            meta: {
              title: '测试32',
              icon: 'files',
            },
            component: () => import('@/views/test/test3/test32'),
          },
        ],
      },
    ],
    component: Layout,
  },
]

export default asyncRouter
