<template>
  <div class="home">
    <mo-scrollbar class="scrollbar">
      <div>
        <p style="text-align: center; margin-bottom: 10px;" v-for="(item, index) in 30" :key="index"> {{ index + 1 }}</p>
      </div>
    </mo-scrollbar>
  </div>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    getList: function() {

    },
  },
}
</script>

<style lang="scss" scoped>
.scrollbar {
  width: 500px;
  height: 500px;
}
</style>
