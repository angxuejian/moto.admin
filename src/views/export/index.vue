<template>
  <div>
    文件导出 {{ a }}

    <div @click="setA">改变</div>
    <div @click="gotoTest">去路由测试</div>
  </div>
</template>

<script>
import { ref, defineComponent, reactive } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'ExportFile1',
  activated() {
  },
  setup() {
    const a = ref(0)
    const router = reactive(useRouter())
    const setA = function() {
      a.value = Math.random() * 10
    }
    const gotoTest = function() {
      router.push({ name: 'ExportTest', query: { id: 456 } })
    }
    return { a, setA, gotoTest }
  },
})
</script>
