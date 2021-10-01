import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import components from './components' // 注册全局组件
import './mock/main' // 引入mock数据

createApp(App)
  .use(store)
  .use(router)
  .use(components)
  .mount('#app')
