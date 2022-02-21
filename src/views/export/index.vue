<template>
  <div>
    <el-button @click="outputZip">zip压缩包导出</el-button>
    <el-button @click="outputWord">word模板导出</el-button>
    <el-button @click="outputExcel">excel模板导出</el-button>
    <hr>
    <router-link to="/export-pdf">
    <el-button>pdf导出</el-button>
    </router-link>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import exportWord from '@/export/export-word'
import exportZip from '@/export/export-zip'
import exportExcel from '@/export/export-excel'
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

    const outputZip = async function() {
      const list = [
        await outputWord('blob'),
        outputExcel('blob'),
      ]
      exportZip({
        list,
        fileName: '2022 - 框出未来',
      })
    }

    const outputWord = function(t) {
      return exportWord({
        type: t,
        template: '/word-template.docx',
        fileName: '2022 - 框出未来',
        data: {
          title: '2022 - 框出未来',
          name: '虎翼',
          date: nowTime,
          cover: '/cover.jpg',
        },
      })
    }

    const outputExcel = function(t) {
      return exportExcel({
        type: t,
        fileName: '2022 - 框出未来',
        list: [
          {
            data: [
              ['姓名', '年龄'],
              ['张三', 20],
              ['张三1', 21],
            ],
            title: '第一页',
          },
          {
            data: [
              ['性别', '出生地'],
              ['男', '杭州'],
              ['女', '北京'],
            ],
            title: '第二页',
          },
        ],
      })
    }
    return { outputZip, outputWord, outputExcel }
  },
})
</script>
