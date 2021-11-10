<template>
  <div class="home">
    <mo-scrollbar scroll-y class="scrollbar">
      <div ref='items' class="items">
        <div class="item" v-for="(item, index) in 320" :key="index"> {{ index + 1 }}</div>
      </div>
    </mo-scrollbar>
  </div>
</template>

<script>
import Moate from '../../utils/date/index'
export default {
  name: 'Home',
  created() {
    const moate = new Moate('2021-11-10')

    // console.log(moate)
    moate.getWeekNumber()
    console.log(moate.getWeekNumberTime())
  },

}
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 500px;
  width: 500px;
}
.scrollbar {
  height: 100%;
  width: 100%;
  border: 1px solid red;
}
.items {
  background: f5f5f5;
  .item {
    display: block;
    text-align: center;
    width: 100%;
    height: 50px;
    line-height: 50px;
  }
}

</style>
