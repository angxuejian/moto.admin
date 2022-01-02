<template>
  <div class="layout">
    <div class="navbar">
      <!-- <div><router-link to='/'>首页</router-link></div>
      <div><router-link to='/user/list'>用户列表</router-link></div>
      <div><router-link to='/project/list'>工程列表</router-link></div> -->
      <MENU />
    </div>
    <div class="body">
      <div class="bread-crumb"></div>

      <div class="main">

        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent, defineComponent } from 'vue'
export default defineComponent({
  name: 'LayoutIndex',

  components: {
    MENU: defineAsyncComponent(() => import('./components/menu.vue')),
  },
  setup() {
    return {}
  },
})
</script>

<style lang="scss" scoped>
.layout {
  .navbar {
    position: fixed;
    left: 0;
    top: 0;
    width: 12%;
    height: 100%;
  }
  .body {
    position: fixed;
    right: 0;
    top: 0;
    width: 88%;
    height: 100%;
    .bread-crumb {
      width: 100%;
      height: 7%;
      position: static;
      top: 0;
      left: 0;
    }
    .main {
      width: 100%;
      height: 100%;
      background: #f5f5f5;
    }
  }
}
</style>
