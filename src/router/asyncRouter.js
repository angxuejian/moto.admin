
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
]

export default asyncRouter
