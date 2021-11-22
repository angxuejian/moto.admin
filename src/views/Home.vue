<template>
  <div class="home">
    <!-- <mo-scrollbar scroll-y class="scrollbar">
      <div ref='items' class="items">
        <div class="item" v-for="(item, index) in 320" :key="index"> {{ index + 1 }}</div>
      </div>
    </mo-scrollbar> -->

    <button @click="setUserId">修改用户ID</button>
    <div>这是用户 ----- {{USER_ID}}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Home',
  created() {
  },
  computed: {
    ...mapGetters([
      'USER_ID',
    ]),
  },
  methods: {
    setUserId: function() {
      const d = parseInt(Math.random() * 10)
      this.$store.dispatch('USER/RUN_USER_ID', d)
    },
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
