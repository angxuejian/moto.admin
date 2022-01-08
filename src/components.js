import Scrollbar from '@/components/scrollbar/index.js'
import * as ElIcons from '@element-plus/icons-vue'
const Components = [
  Scrollbar, // 滚动条
]

export default (Vue) => {
  Components.forEach(item => {
    Vue.use(item)
  })
  for (const key in ElIcons) {
    const icon = ElIcons[key]
    Vue.component(icon.name, icon)
  }
}
