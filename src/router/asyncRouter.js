
import Layout from '../layout/index'
const asyncRouter = [
  {
    path: '/export-manage',
    name: 'ExportManage',
    meta: {
      vcode: ['export-file'],
      title: '导出管理',
      icon: 'files',
      component: 'layout/index',
    },
    children: [
      {
        path: '/export-file',
        name: 'ExportFile',
        meta: {
          title: '文件导出',
          icon: 'files',
          vcode: ['export-file'],
          component: 'views/export/index',
        },
      },
    ],
    component: Layout,
  },

  {
    path: '/export-pdf',
    name: 'ExportPdf',
    hidden: true,
    meta: {
      title: 'PDF',
      pageTitle: '2022 - 框出未来',
      component: 'views/export/pdf',
    },
  },

  {
    path: '/test',
    name: 'Test',
    meta: {
      title: '测试管理',
      icon: 'files',
      vcode: ['test2'],
      component: 'layout/index',
    },
    redirect: '/test1',
    children: [
      {
        path: '/test1',
        name: 'Test1',
        meta: {
          title: '测试1',
          icon: 'files',
          vcode: ['test1'],
          component: 'views/test/test1',
        },
      },
      {
        path: '/test2',
        name: 'Test2',
        meta: {
          title: '测试2',
          icon: 'files',
          vcode: ['test2'],
          component: 'views/test/test2',
        },
      },
      {
        path: '/test3',
        name: 'Test3',
        redirect: '/test31',
        meta: {
          title: '测试3',
          icon: 'files',
          vcode: ['test3'],
          component: 'views/test/test3',
        },
        children: [
          {
            path: '/test31',
            name: 'Test31',
            meta: {
              title: '测试31',
              icon: 'files',
              component: 'views/test/test3/test31',
            },
          },
          {
            path: '/test32',
            name: 'Test32',
            meta: {
              title: '测试32',
              icon: 'files',
              component: 'views/test/test3/test32',
            },
          },
        ],
      },
    ],
    component: Layout,
  },
]

export default asyncRouter
