<template>
    <el-menu
        default-active="/home"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        router
    >
    <item-menu v-for="(item, index) in menuBar" :key="index" :item='item' />
    </el-menu>
</template>

<script>
import { defineAsyncComponent } from 'vue'
export default {
  name      : 'Home',
  components: {
    itemMenu: defineAsyncComponent(() => import('./itemMenu')),
  },
  computed: {
    menuBar() {
      return this.$store.getters.USER_MENU
    },
  },
  created () {
    console.log(this.$store.getters.USER_MENU, 'bar-vue')
  },
  methods: {
    handleClose: function() {

    },
    handleOpen: function() {

    },
  },
}
</script>
