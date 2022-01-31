<template>
  <div class="layout">
    <div class="navbar"><MENU /></div>
    <div class="body">
      <div class="breadcrumb">
        <el-icon @click="switchSilde" style="margin-bottom: 2px;margin-right: 20px;"><component :is='icon' style="width: 1.2em;height: 1.2em; cursor: pointer;"  /></el-icon>
        <BREADCRUMB />
      </div>

      <div class="main">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent, watch, defineComponent, toRefs, ref, reactive } from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'LayoutIndex',

  components: {
    MENU: defineAsyncComponent(() => import('./components/menu')),
    BREADCRUMB: defineAsyncComponent(() => import('./components/breadcrumb')),
  },
  setup() {
    const icon = ref('expand')

    const store = useStore()
    const { LAYOUT_IS_COLLAPSE } = toRefs(reactive(store.getters))
    watch(LAYOUT_IS_COLLAPSE, () => { icon.value = LAYOUT_IS_COLLAPSE.value ? 'fold' : 'expand' })

    const switchSilde = () => store.dispatch('LAYOUT/RUN_COLLAPSE')

    return { icon, switchSilde }
  },
})
</script>

<style lang="scss">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 170px;
}
.el-menu-vertical-demo {
  height: 100%;
}
</style>
<style lang="scss" scoped>
.layout {
  height: 100%;
  display: flex;
  align-items: flex-start;
  .navbar {
    height: 100%;
  }
  .body {
    width: 100%;
    height: 100%;
    .breadcrumb {
      width: 99%;
      background: #fff;
      height: 7%;
      display: flex;
      align-items: center;
      padding-left: 1%;
    }
    .main {
      width: 100%;
      height: 93%;
    }
  }
}
</style>
