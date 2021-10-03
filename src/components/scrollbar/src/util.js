// 计算鼠标滚动 距离
export const getScrollDistance = function(params) {
  const { scrollTop, clientHeight, scrollLeft, clientWidth } = params

  // (盒子内容滚动高度 / 盒子高度 = 滚动条滚动高度) * 100 = 换算为整数
  // 宽度与高度一样
  return {
    y: scrollTop / clientHeight * 100,
    x: scrollLeft / clientWidth * 100,
  }
}

// 计算滚动条的宽度或者高度、
// 要与原生滚动条的宽高一致、否则会出现滚动过多或过少
export const getScrollSize = function(params) {
  const { clientHeight, scrollHeight, clientWidth, scrollWidth } = params

  // (盒子高度 / 滚动区域的高度 = 滚动条的高度) * 100 = 换算为整数
  // 宽度与高度一样
  return {
    h: clientHeight / scrollHeight * 100,
    w: clientWidth / scrollWidth * 100,
  }
}

// 返回元素的大小及其相对于视口的位置。
export const getClientTop = function(dom) {
  return dom.getBoundingClientRect()
}

/**
 * 计算滚动条 Y轴 或 X轴 滚动区域高度
 * BB = Top或Left、 width或height、 Y或X、 顶部或左边
 * @param {number} params.boxBB             盒子距离页面BB 高度
 * @param {number} params.itemClienBB       当前dom标签距离页面BB 高度
 * @param {number} params.boxItemBB         盒子BB距离当前dom标签 高度
 * @param {number} params.clickBarBB        点击bar位置距离盒子BB 高度
 * @param {number} params.clickBarToBoxItem 盒子从点击bar位置 到 当前dom标签位置的 距离
 * @param {number} params.boxBarBB          盒子滚动条 高度
 * @param {number} params.boxSlidingBB      盒子已滚动的 高度
 * @param {number} params.boxScrollBB       盒子滚动区域 高度
 * @returns scrollBB
 */
export const getScrollBB = function(params) {
  if (!params) return

  const integer = 100  // 换算为 整数

  const { boxBB, itemClienBB, clickBarBB, boxBarBB, boxScrollBB } = params
  let   { boxItemBB = 0, clickBarToBoxItem = 0, boxSlidingBB = 0 } = params

  boxItemBB = (boxBB - itemClienBB) * -1
  !clickBarToBoxItem && (clickBarToBoxItem = boxItemBB - clickBarBB)
  boxSlidingBB = clickBarToBoxItem / boxBarBB * integer

  const scrollBB = boxSlidingBB * boxScrollBB / integer // 滚动区域高度
  return scrollBB
}
