<template>
  <div class='mo-scrollbar'>
    <div
    :style="wrapStyle"
    ref='wrap'
    :class="[
    'mo-scrollbar__wrap',
    { 'mo-scrollbar__wrap-y': scrollY },
    { 'mo-scrollbar__wrap-x': scrollX } ]">

      <slot></slot>
    </div>
  </div>
</template>

<script>
import getScollbarWidth from '@/utils/scrollbar-width'
export default {
  name: 'Scrollbar',
  props: {
    scrollY: {
      type: Boolean,
      default() {
        return false
      },
    },
    scrollX: {
      type: Boolean,
      default() {
        return false
      },
    },
  },
  data() {
    return {
      wrapStyle: 0, // wrap标签的样式
      scollbarWidth: 0, // 滚动条宽度
    }
  },
  created() {
  },
  mounted() {
    // this.getWrapStyle()
  },

  methods: {

    /**
     * 隐藏 x、y轴滚动条
     */
    getWrapStyle() {
      const width = getScollbarWidth()

      this.wrapStyle = `
        margin-right:${width}px; 
        margin-bottom: ${width}px; 
        padding-bottom: ${Math.abs(width)}px`
    },
  },
}
</script>

<style lang="scss" scoped>
.mo-scrollbar {
  overflow: hidden;
  .mo-scrollbar__wrap {
    height: 100%;
    overflow: scroll;
  }

  .mo-scrollbar__wrap-y {
    overflow-y: scroll;
    overflow-x: hidden;
  }

  .mo-scrollbar__wrap-x {
    overflow-x: scroll;
    overflow-y: hidden;
  }
}
</style>
