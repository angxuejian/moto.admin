
const authArr = ['admin']
const checkPermission = (el, value) => {
  if (el && !authArr.includes(value)) {
    el.parentNode && el.parentNode.removeChild(el)
  }
  // else {
  //   console.log(el.parentNode.childNodes, '-->')
  // }
}

export default {
  // 在绑定元素的 attribute 或事件监听器被应用之前调用
  created() {},
  // 在绑定元素的父组件挂载之前调用
  beforeMount() {},
  // 绑定元素的父组件被挂载时调用
  mounted(el, binding) {
    checkPermission(el, binding.value)
  },
  // 在包含组件的 VNode 更新之前调用
  beforeUpdate() {},
  // 在包含组件的 VNode 及其子组件的 VNode 更新之后调用
  updated(el, binding) {
    checkPermission(el, binding.value)
  },
  // 在绑定元素的父组件卸载之前调用
  beforeUnmount() {},
  // 卸载绑定元素的父组件时调用
  unmounted() {},
}
