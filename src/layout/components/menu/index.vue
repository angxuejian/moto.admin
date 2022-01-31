<template>
    <el-menu
        default-active="/home"
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
// import { defineAsyncComponent } from 'vue'
import { defineAsyncComponent, toRefs, reactive } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'Menu',
  components: {
    itemMenu: defineAsyncComponent(() => import('./itemMenu')),
  },

  setup() {
    const handleClose = () => {}
    const handleOpen = () => {}

    const store = useStore()
    const { LAYOUT_MENU, LAYOUT_IS_COLLAPSE } = toRefs(reactive(store.getters))

    return { LAYOUT_MENU, LAYOUT_IS_COLLAPSE, handleOpen, handleClose }
  },
  // computed: {
  //   menuBar() {
  //     return this.$store.getters.LAYOUT_MENU
  //   },
  // },
  // created () {
  // },
  // methods: {
  //   handleClose: function() {

  //   },
  //   handleOpen: function() {

  //   },
  // },
}
</script>
