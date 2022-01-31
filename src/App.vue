<template>
  <router-view/>
</template>

<script>
export default {
  created() {
    console.log('- github: https://github.com/angxuejian/moto.ui')
    console.log('- 如何使用  详看 README.md')
    console.log('- 有问题可以  issues  或者 QQ: 1251537708 找我哦!')
    console.log('- v0.1')
    console.log('\n')
  },
}
</script>

<style lang="scss">
html, body {
  margin: 0;
  padding: 0;
  background: #f5f5f5;
  height: 100%;
  width: 100%;
}
#app {
  width: 100%;
  height: 100%;
}
</style>
