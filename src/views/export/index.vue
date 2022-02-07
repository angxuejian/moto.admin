<template>
  <div>
    <el-button @click="outputWord">word模板导出</el-button>
  </div>
</template>

<script>
import { ref, defineComponent, reactive } from 'vue'
import { useRouter } from 'vue-router'
import exportWord from '@/utils/export-word'
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

    const outputWord = function() {
      const d = new Date()
      const year = d.getFullYear()
      const month = d.getMonth() + 1
      const date = d.getDate()
      const data = {
        title: '2022 - 框出未来',
        name: '虎翼',
        date: [year, month, date].join('-'),
        cover: '/cover.jpg',
      }
      exportWord({
        url: '/word-template.docx',
        data,
        title: '2022 - 框出未来',
      })
    }
    return { a, setA, gotoTest, outputWord }
  },
})
</script>
