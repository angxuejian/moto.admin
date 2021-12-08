import getScollbarWidth from '@/utils/scrollbar-width'
import { getScrollDistance } from './util'
import { ref } from 'vue'

export default function useWrap(defau, axis) {
  // wrap标签的样式
  const wrapStyle = ref('')

  // 隐藏 x、y轴滚动条
  const getWrapStyle = () => {
    if (!defau.value) {
      const width = getScollbarWidth()
      wrapStyle.value = `margin-right:${width}px; padding-bottom: ${Math.abs(width)}px`
    } else wrapStyle.value = ''
  }

  // 监听scroll事件 - 修改x、y轴滚动位置
  const getWrapDistance = (event) => {
    if (defau.value) return

    const { x, y } = getScrollDistance(event.target)
    axis.value.y = y
    axis.value.x = x
  }

  return { wrapStyle, getWrapStyle, getWrapDistance }
}
