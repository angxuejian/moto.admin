<template>
  <div class="home">
    <mo-scrollbar class="scrollbar">
      <div class="items">
        <div class="item" v-for="(item, index) in 30" :key="index"> {{ index + 1 }}</div>
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
.items {
  display: flex;
  height: 1000px;
  background: f5f5f5;
  .item {
    display: block;
    text-align: center;
    width: 200px;
    // background: seagreen;
    padding-top: 10px;
    margin: 0 50px;
  }
}

</style>
