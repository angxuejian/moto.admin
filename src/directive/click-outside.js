
const nodelist = []
const ctx = '@@clickoutside'

let seed = 0

window.addEventListener('click', listenerClick)

function listenerClick(event) { nodelist.forEach(node => node[ctx].elHandler(event)) }

function createElHandler(el, binding, vnode) {
  return function(click = {}) {
    if (!click || !click.target || (el && el.contains(click.target))) return
    el[ctx].vCallback && el[ctx].vCallback()
  }
}

export default {
  created(el, binding, vnode) {
    nodelist.push(el)
    const id = seed++

    el[ctx] = {
      id,
      vCallback: binding.value,
      elHandler: createElHandler(el, binding, vnode),
    }
  },

  updated(el, binding, vnode) {
    el[ctx].elHandler = createElHandler(el, binding, vnode)
    el[ctx].vCallback = binding.value
  },

  unmounted(el) {
    for (let i = 0; i < nodelist.length; i++) {
      if (nodelist[i][ctx].id === el[ctx].id) {
        nodelist.splice(i, 1)
        break
      }
    }
    delete el[ctx]
    // window.removeEventListener('click', listenerClick)
  },
}
