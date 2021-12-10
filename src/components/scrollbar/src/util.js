// 计算鼠标滚动 距离
export const getScrollDistance = function(params) {
  const { scrollTop, clientHeight, scrollLeft, clientWidth } = params
  return {
    y: scrollTop / clientHeight * 100,
    x: scrollLeft / clientWidth * 100,
  }
}

// 计算滚动条的宽度或者高度、
// 要与原生滚动条的宽高一致、否则会出现滚动过多或过少
export const getScrollbarSize = function(params) {
  const { clientHeight, scrollHeight, clientWidth, scrollWidth } = params
  return {
    h: clientHeight / scrollHeight * 100,
    w: clientWidth / scrollWidth * 100,
  }
}

// 返回元素的大小及其相对于视口的位置。
export const getClientTop = (dom) => dom.getBoundingClientRect()

/**
 * 计算滚动条 Y轴 或 X轴 滚动区域高度
 * @param {number} params.nowBarbc      鼠标拖动时当前滚动条背景(顶部或者左边) 距离页面(顶部或者左边)距离
 * @param {number} params.barSize       滚动条大小
 * @param {number} params.wrapSize      盒子滚动区域大小
 * @param {number} params.startBarbc    滚动条背景(顶部或者左边) 距离页面(顶部或者左边)距离
 * @param {number} params.nowScrollSize 点击时在滚动条中的位置
 * @returns 盒子内容滚动高度
 */
export const getScrollBar = function(params) {
  if (!params) return

  const integer = 100  // 换算为 整数
  const { startBarbc, nowBarbc, scrollBarSize, barSize, wrapSize } = params

  const nowBcSize = nowBarbc - startBarbc
  const distanceBary = ((nowBcSize - scrollBarSize) / barSize) * integer

  return distanceBary * wrapSize / integer
}
