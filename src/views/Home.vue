<template>
  <div class="home">
    <!-- <mo-scrollbar  scroll-y class="scrollbar">
      <div ref='items' class="items">
        <div class="item" v-for="(item, index) in 50" :key="index"> {{ index + 1 }}</div>
      </div>
    </mo-scrollbar> -->

    <button @click="setUserId">修改用户ID</button>
    <div>这是用户 ----- {{USER_ID}}</div>

    <!-- <div v-auth='"user"'>这是普通用户</div>
    <div v-auth='"admin"'>这是管理员-----</div> -->
    <!-- <router-link to="/user">去用户</router-link> -->
    <div v-if="isShow" v-clickoutside='onCallbackClose' class="test">
      测试 click outside
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { defineComponent, toRefs, ref, reactive } from 'vue'
import Clickoutside from '@/directive/click-outside'
export default defineComponent({
  name      : 'Home',
  directives: { Clickoutside },
  setup() {
    const onCallbackClose = () => {
      isShow.value = false
    }
    const isShow = ref(true)
    const store = useStore()
    const { USER_ID } = toRefs(reactive(store.getters))
    const setUserId = () => {
      const d = parseInt(Math.random() * 10)
      store.dispatch('USER/RUN_USER_ID', d)
    }

    return {
      isShow,
      // store,
      USER_ID,
      setUserId,
      onCallbackClose,
    }
  },
})
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
.test {
  width: 200px;
  height: 200px;
  border: 1px solid red;
}

</style>
