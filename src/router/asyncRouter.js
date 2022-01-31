
import Layout from '../layout/index'
const asyncRouter = [
  {
    path: '/only-page',
    name: 'OnlyPage',
    meta: {
      title: '首页12',
      icon : 'sunset',
    },
    children: [
      {
        path: '/index1',
        name: 'PageIndex',
        meta: {
          title: '首页1',
          icon : 'sunset',
        },
        component: () => import('@/views/only-page/index'),
      },
    ],
    component: Layout,
  },
]

export default asyncRouter
