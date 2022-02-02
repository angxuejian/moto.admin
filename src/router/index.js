import {
  createRouter,
  createWebHistory,
} from 'vue-router'
import defaultRouter from './defaultRouter'
/**
 * @params {string}   name       跳转路由地址名称
 * @params {string}   redirect   重定向页面
 * @params {template} component  组件(父页面可使用Layout布局组件)
 * @params {array}    children   子组件列表
 * @params {boolean}  hidden     是否显示路由
 * @params {object}   meta       自定义数据
 * @params {string}   meta.title 菜单名称
 * @params {array}    meta.vcode 校验路由权限(Verification code)
 * @params {string}   meta.icon  菜单图标(https://element-plus.gitee.io/zh-CN/component/icon.html#%E5%9B%BE%E6%A0%87%E9%9B%86%E5%90%88)
 */
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: defaultRouter,
})

export default router
