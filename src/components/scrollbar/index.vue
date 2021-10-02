<template>
  <div class='mo-scrollbar'>
    <div
      :style="wrapStyle"
      ref='wrap'
      :class="[
      'mo-scrollbar__wrap',
      { 'mo-scrollbar__wrap-y': scrollY },
      { 'mo-scrollbar__wrap-x': scrollX } ]"
      @scroll="getWrapScroll"
      @focus="onFocus"
      >

      <slot></slot>
    </div>

    <div ref="axisy" class="mo-scrollbar__axis-y">
      <div ref="axisyy" :style="`height: ${axis.h}%;transform: translateY(${axis.y}%)`"
        class="axis-hover"
        @mousedown='onMousedown'
      ></div>
    </div>

    <div class="mo-scrollbar__axis-x">
      <div :style="`width: ${axis.w}%;transform: translateX(${axis.x}%)`"
        class=" axis-hover"
        @mousedown='onMousedown'
      ></div>
    </div>
  </div>
</template>

<script>
import getScollbarWidth from '@/utils/scrollbar-width'
export default {
  name: 'MoScrollbar',
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
      axis: { y: 0, x: 0, h: 0, w: 0 },
      isMouse: false,
    }
  },
  created() {
  },
  mounted() {
    // this.getWrapStyle()
    this.updateWrapScroll()
  },

  methods: {

    // 隐藏 x、y轴滚动条
    getWrapStyle() {
      const width = getScollbarWidth()

      this.wrapStyle = `
        margin-right:${width}px; 
        margin-bottom: ${width}px; 
        padding-bottom: ${Math.abs(width)}px`
    },

    onMousedown: function(event) {
      // 防止右键点击
      if (event.ctrlKey || event.button === 2) {
        return
      }
      this.isMouse = true
      const d = event.currentTarget.getBoundingClientRect()

      // this.Y = event.currentTarget.offsetHeight - (event.clientY - d.top)

      // 当前点击位置距离盒子顶部 距离
      this.Y = event.clientY - d.top

      document.addEventListener('mousemove', this.onMousemove, false)
      document.addEventListener('mouseup', this.onMouseup, false)
      document.onselectstart = () => false
    },
    onMousemove: function(event) {
      if (!this.isMouse) return

      const d = this.$refs.axisy.getBoundingClientRect()

      // d.top = 盒子距离页面顶部 高度
      // event.clientY = 当前标签距离页面顶部 高度
      // = 盒子顶部 距离 当前标签 高度

      console.log(d.top, '--', event.clientY)
      const top = Math.abs(d.top - event.clientY)
      // const hum = this.$refs.axisyy.offsetHeight - this.Y
      const hum = this.Y

      // 盒子顶部 距离 当前标签 高度 - 点击位置距离盒子顶部 距离
      // = 已滑动距离的 高度

      // 已滑动高度 / 盒子高度 * 100 = 已滑动的滚动条滚动高度
      console.log(this.Y)
      const h = (top - hum) * 100 / this.$refs.axisy.offsetHeight

      // 已滑动的滚动条滚动高度 * 滚动区域的高度 / 100 = 盒子内容滚动高度
      // 与计算鼠标滚动 距离 相反
      this.$refs.wrap.scrollTop = h * this.$refs.wrap.scrollHeight / 100
    },
    onMouseup: function(event) {
      if (!this.isMouse) return

      this.isMouse = false
      event.target.removeEventListener('mousemove', this.onMousemove, false)
    },

    // 计算鼠标滚动 距离
    getWrapScroll: function(event) {
      const { scrollTop, clientHeight } = event.target
      const { scrollLeft, clientWidth } = event.target
      // (盒子内容滚动高度 / 盒子高度 = 滚动条滚动高度) * 100 = 换算为整数
      // 宽度与高度一样
      this.axis.y = scrollTop / clientHeight * 100
      this.axis.x = scrollLeft / clientWidth * 100
    },

    // 计算滚动条的宽度或者高度、
    // 要与原生滚动条的宽高一致、否则会出现滚动过多或过少
    updateWrapScroll: function() {
      const { clientHeight, scrollHeight } = this.$refs.wrap
      const { clientWidth, scrollWidth } = this.$refs.wrap

      // (盒子高度 / 滚动区域的高度 = 滚动条的高度) * 100 = 换算为整数
      // 宽度与高度一样
      this.axis.h = clientHeight / scrollHeight * 100
      this.axis.w = clientWidth / scrollWidth * 100
    },
  },
}
</script>

<style lang="scss" scoped>
$hover-bc: #c1c1c1;
%axis-bar {
  border-radius: 10px;
  transition: 0.3s background;
  background: transparent;
  position: absolute;
}

.mo-scrollbar {
  overflow: hidden;
  position: relative;
  &:hover,
  &:focus,
  &:active {
    .axis-hover {
      background: $hover-bc;
    }
  }
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

  .mo-scrollbar__axis-y {
    position: absolute;
    right: 30px;
    top: 2px;
    height: 100%;
    background: #F1F1F1;
    width: 8px;
    div {
      width: 100%;
      @extend %axis-bar
    }
  }

  .mo-scrollbar__axis-x {
    position: absolute;
    width: 100%;
    left: 0px;
    bottom: 30px;
    background: #F1F1F1;
    height: 8px;
    div {
      height: 100%;
       @extend %axis-bar;
    }
  }

  .axis-hover:hover {
    background: #A8A8A8;
  }
}
</style>
