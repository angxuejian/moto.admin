<template>
    <div class="pdf">
        <img
            style="width: 700px; height: 400px"
            src="@/assets/cover.jpg"
            alt=""
        />

        <h1>2022 - 框出未来</h1>

        <div>
            <span>虎翼</span>
            <span style="margin: 0 10px">|</span>
            <span>{{ nowTime }}</span>
        </div>
    </div>
</template>

<script>
import { defineComponent, onMounted, nextTick, ref } from 'vue'

export default defineComponent({
  name: 'ExportPdf',

  setup() {
    const d = new Date()
    const year = d.getFullYear()
    const month = d.getMonth() + 1
    const date = d.getDate()
    const nowTime = ref([year, month, date].join('-'))
    onMounted(() => { setTimeout(() => { nextTick(() => { window.print() }) }, 500) })
    return { nowTime }
  },
})
</script>

<style lang="scss" scoped>
.pdf {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
}
</style>
