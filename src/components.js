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

// 将大写转换为 -
// const toUpperCaseH = (str) => {
//   const list = str.split('')

//   str = list.map(item => {
//     if (item.toUpperCase() === item) {
//       return '-' + item.toLowerCase()
//     } else return item
//   })
//   return str.join('')
// }
