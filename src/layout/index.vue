<template>
  <div class="layout">
    <div class="navbar"><MENU /></div>
    <div class="body">
      <div class="historybar">
        <div class="breadcrumb">
          <el-icon @click="switchSilde" style="margin-bottom: 2px;margin-right: 20px;"><component :is='icon' style="width: 1.2em;height: 1.2em; cursor: pointer;"  /></el-icon>
          <BREADCRUMB />
        </div>
        <div class="keep-view"><KEEPVIEW /></div>

      </div>

      <div class="main">
        <router-view v-slot='{ Component }'>
          <keep-alive :include="keepView">
            <component :is="Component"/>
          </keep-alive>
        </router-view>
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
    KEEPVIEW: defineAsyncComponent(() => import('./components/keepView')),
  },
  setup() {
    const icon = ref('expand')
    const keepView = ref([])

    const store = useStore()
    const { LAYOUT_IS_COLLAPSE, LAYOUT_KEEP_VIEW } = toRefs(reactive(store.getters))

    watch(LAYOUT_IS_COLLAPSE, () => { icon.value = LAYOUT_IS_COLLAPSE.value ? 'fold' : 'expand' })
    watch(LAYOUT_KEEP_VIEW, () => { keepView.value = LAYOUT_KEEP_VIEW.value.map(s => s.name) }, { deep: true })

    const switchSilde = () => store.dispatch('LAYOUT/RUN_COLLAPSE')
    return { icon, switchSilde, keepView }
  },
})
</script>

<style lang="scss">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
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
    .historybar {
      width: 99%;
      background: #fff;
      padding-left: 1%;
      height: 10%;
      box-shadow: 0 1px 3px 0 rgb(0 0 0 / 12%), 0 0 3px 0 rgb(0 0 0 / 4%);
      .breadcrumb {
        width: 100%;
        height: 60%;
        display: flex;
        align-items: center;
      }
      .keep-view {
        width: 100%;
        height: 40%;
      }
    }
    .main {
      width: 98%;
      height: 90%;
      box-sizing: border-box;
      padding: 10px;
    }
  }
}
</style>
