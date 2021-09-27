import Scrollbar from '@/components/scrollbar/index'

const Components = [
  Scrollbar, // 滚动条
]

export default (vue) => {
  Components.forEach(item => {
    vue.component(toUpperCaseH(`mo${Scrollbar.name}`), item)
  })
}

// 将大写转换为 -
const toUpperCaseH = (str) => {
  const list = str.split('')

  str = list.map(item => {
    if (item.toUpperCase() === item) {
      return '-' + item.toLowerCase()
    } else return item
  })
  return str.join('')
}
