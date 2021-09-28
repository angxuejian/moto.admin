<template>
  <div class='mo-scrollbar'>
    <div :style="`margin-right:${marginWidth}px; margin-bottom: ${marginWidth}px;`" ref='wrap' class="mo-scrollbar-wrap">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Scrollbar',
  props: {

  },
  data() {
    return {
      marginWidth: 0, // margin-right, bottom 的偏移量
      scollbarWidth: 0, // 滚动条宽度
    }
  },
  created() {
  },
  mounted() {
    this.marginWidth = this.getScollbarWidth()
  },
  methods: {
    getScollbarWidth: function() {
      if (this.scollbarWidth) return this.scollbarWidth
      else {
        if (!this.$refs.wrap.children[0]) return 0
        else {
          return this.$refs.wrap.children[0].offsetWidth - this.$refs.wrap.offsetWidth
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.mo-scrollbar {
  overflow: hidden;
  .mo-scrollbar-wrap {
    overflow: scroll;
    height: 100%;
  }
}
</style>
