
import Layout from '../layout/index'
const asyncRouter = [
  {
    path    : '/export',
    name    : 'Export',
    children: [
      {
        path: '/file',
        name: 'ExportFile',
        meta: {
          title: '文件导出',
          icon : 'files',
        },
        component: () => import('@/views/export'),
      },
    ],
    component: Layout,
  },
]

export default asyncRouter
