<template>
    <el-menu
        :default-active="defaultActive"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :collapse='LAYOUT_IS_COLLAPSE'
        router
    >
    <item-menu v-for="(item, index) in LAYOUT_MENU" :key="index" :item='item' />
    </el-menu>
</template>

<script>
import { defineAsyncComponent, toRefs, ref, reactive, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
  name: 'Menu',
  components: {
    itemMenu: defineAsyncComponent(() => import('./itemMenu')),
  },

  setup() {
    const handleClose = () => {}
    const handleOpen = () => {}

    const store = useStore()
    const router = reactive(useRouter())
    const { LAYOUT_MENU, LAYOUT_IS_COLLAPSE } = toRefs(reactive(store.getters))
    const defaultActive = ref(router.currentRoute.path)

    watch(router, () => { defaultActive.value = router.currentRoute.path })
    return { defaultActive, LAYOUT_MENU, LAYOUT_IS_COLLAPSE, handleOpen, handleClose }
  },
}
</script>
