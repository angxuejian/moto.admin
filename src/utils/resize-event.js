import ResizeObserver from 'resize-observer-polyfill'

export const addResize = function(el, fn) {
  el.__ro__ = new ResizeObserver(() => { fn() })
  el.__ro__.observe(el)
}

export const removeResize = function(el, fu) {
  el.__ro__.disconnect()
}
