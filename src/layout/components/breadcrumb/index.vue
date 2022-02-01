<template>
   <el-breadcrumb>
    <el-breadcrumb-item v-for="(item, index) in dataArr" :key="index" :to="{ path: item.meta.url }">{{ item.meta.title }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
import { useRouter } from 'vue-router'
import { onBeforeMount, reactive, watch, ref } from 'vue'
export default {

  setup() {
    const dataArr = ref([])
    const router = reactive(useRouter())
    const getBreadcrumd = function() {
      const currRouter = router.currentRoute.matched.filter(item => item.meta && item.meta.title)
      const frist = currRouter[0]

      if (frist.meta.title !== '首页') {
        currRouter.unshift({ meta: { title: '首页', url: '/home' } })
      }
      dataArr.value = currRouter
    }

    onBeforeMount(() => getBreadcrumd())
    watch(router, getBreadcrumd)
    return { dataArr }
  },
}
</script>
