<template>
  <div class="pdf">

      <img style="width: 700px; height: 400px" src="@/assets/cover.jpg" alt="">

      <h1>2022 - 框出未来</h1>

      <div>
        <span>虎翼</span>
        <span style="margin: 0 10px">|</span>
        <span>2022-2-12</span>
      </div>
  </div>
</template>

<script>
export default {
  name: 'OnlyPagePdf',

  mounted() {
    setTimeout(() => {
      this.$nextTick(() => {
        window.print()
      })
    }, 500)
  },
}
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
