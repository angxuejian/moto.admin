<template>
  <div>
    这是登录页

    <!-- <router-link to="Home">去首页</router-link> -->
    <div @click="gotoHome">去首页</div>
  </div>
</template>

<script>
import { setToken } from '@/utils/cookie'
export default {
  name   : 'Lonin',
  methods: {
    gotoHome: function() {
      setToken('123456')
      this.$router.push({ name: 'Home' })
    },
  },
}
</script>
