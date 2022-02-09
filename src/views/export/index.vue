<template>
  <div>
    <el-button @click="outputZip">zip压缩包导出</el-button>
    <el-button @click="outputWord">word模板导出</el-button>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import exportWord from '@/export/export-word'
import exportZip from '@/export/export-zip'
export default defineComponent({
  name: 'ExportFile1',
  activated() {
  },
  setup() {
    const d = new Date()
    const year = d.getFullYear()
    const month = d.getMonth() + 1
    const date = d.getDate()
    const nowTime = [year, month, date].join('-')

    const outputZip = function() {
      exportZip({
        fileName: '2022 - 框出未来.txt',
        fileData: `虎翼YYDS - ${nowTime}`,
        zipName: '2022 - 框出未来',
      })
    }

    const outputWord = function() {
      exportWord({
        template: '/word-template.docx',
        fileName: '2022 - 框出未来',
        fileData: {
          title: '2022 - 框出未来',
          name: '虎翼',
          date: nowTime,
          cover: '/cover.jpg',
        },
      })
    }
    return { outputZip, outputWord }
  },
})
</script>
