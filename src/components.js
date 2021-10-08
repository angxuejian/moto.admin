import Scrollbar from '@/components/scrollbar/index.js'

const Components = [
  Scrollbar, // 滚动条
]

export default (Vue) => {
  Components.forEach(item => {
    // vue.component(Scrollbar.name, item)
    Vue.use(item)
  })
}
