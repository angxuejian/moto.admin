<template>
  <div>
    这是测试路由传参
  </div>
</template>

<script>
export default {
  name: 'ExportTest',
  created() {
    console.log(this.$route, '--->')
  },
}
</script>
