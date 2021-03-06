import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import components from './components' // 全局组件
import { directive } from './directive/index' // 全局自定义指令
import ElementPlus from 'element-plus'
import './mock/main' // 引入mock数据
import 'element-plus/dist/index.css'
import './beforeEach' // 路由校验

const app = createApp(App)
  .use(store)
  .use(components)
  .use(ElementPlus)
  .use(router)

directive(app) // 注册自定义指令
app.mount('#app')
