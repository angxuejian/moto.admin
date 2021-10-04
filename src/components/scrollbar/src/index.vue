<template>
  <div class='mo-scrollbar'>
    <div
      :style="wrapStyle"
      ref='wrap'
      :class="[
      'mo-scrollbar__wrap',
      { 'mo-scrollbar__wrap-y': scrollY },
      { 'mo-scrollbar__wrap-x': scrollX } ]"
      @scroll="getWrapDistance"
      >
      <!-- 包裹区域 -->
      <div ref="reszie">
         <slot></slot>
      </div>
    </div>

    <!-- x/y 轴滚动条 -->
    <div v-if="isScrollShow('scrollY')" @mousedown="clickMousedown" data-type='y' ref="barbcy" class="mo-scrollbar__axis-y">
      <div ref="bary" :style="`height: ${axis.h}%;transform: translateY(${axis.y}%)`"
        class="axis-hover"
        data-type='y'
        @mousedown.stop='onMousedown'
      ></div>
    </div>

    <div v-if="isScrollShow('scrollX')" @mousedown="clickMousedown" data-type='x' ref="barbcx" class="mo-scrollbar__axis-x">
      <div ref="barx" :style="`width: ${axis.w}%;transform: translateX(${axis.x}%)`"
        class=" axis-hover"
        data-type='x'
        @mousedown.stop='onMousedown'
      ></div>
    </div>
  </div>
</template>

<script>
import getScollbarWidth from '@/utils/scrollbar-width'
import {
  getScrollDistance,
  getScrollSize,
  getClientTop,
  getScrollBB,
} from './util'
import { addResize, removeResize } from '@/utils/resize-event'
export default {
  name : 'MoScrollbar',
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
    default: {
      type: Boolean,
      default() {
        return false
      },
    },
  },
  data() {
    return {
      wrapStyle    : 0, // wrap标签的样式
      scollbarWidth: 0, // 滚动条宽度
      axis         : { y: 0, x: 0, h: 0, w: 0 }, // 滚动条的位置与大小
      isMouse      : false,
      mouseType    : '',
      x            : null, // 当前点击位置距离盒子左边 距离
      y            : null, // 当前点击位置距离盒子顶部 距离
      isScroll     : false, // 是否同时显示 x 和 y 轴
    }
  },
  mounted() {
    this.init()
    addResize(this.$refs.reszie, this.getWrapSize)
  },
  beforeUnmount() {
    removeResize(this.$refs.reszie, this.getWrapSize)
  },
  watch: {
    default() { this.init() },
    scrollY() { this.init() },
    scrollX() { this.init() },
  },

  methods: {
    init: function() {
      this.isScroll = (!this.scrollY && !this.scrollX)
      this.getWrapStyle()
      if (!this.default) {
        this.getWrapSize()
      }
    },

    isScrollShow: function (type) {
      if (!this.default && this[type]) return true
      else if (!this.default && this.isScroll) return true
      else return false
    },

    // 隐藏 x、y轴滚动条
    getWrapStyle() {
      if (!this.default) {
        const width = getScollbarWidth()

        this.wrapStyle = `
        margin-right:${width}px; 
        margin-bottom: ${width}px; 
        padding-bottom: ${Math.abs(width)}px`
      } else {
        this.wrapStyle = ''
      }
    },

    getWrapDistance: function(event) {
      if (this.default) return

      const { x, y } = getScrollDistance(event.target)
      this.axis.y = y
      this.axis.x = x
    },
    getWrapSize: function() {
      const { w, h } = getScrollSize(this.$refs.wrap)
      this.axis.h = h
      this.axis.w = w
    },

    // ----------------------------------------------
    // ----------------------------------------------
    // ----------------------------------------------
    // ----------------------------------------------
    // ----------------------------------------------
    // ----------------------------------------------

    clickMousedown: function(event) {
      if (event.ctrlKey || event.button === 2) return

      this.mouseType = event.target.dataset.type

      if (this.mouseType === 'y') this.y = this.$refs.bary.offsetHeight / 2 // 模拟滑动距离
      else if (this.mouseType === 'x') this.x = this.$refs.bary.offsetWidth / 2 // 模拟滑动距离

      this.clearScrollType(event, true)
    },

    onMousedown: function(event) {
      // 防止右键点击
      if (event.ctrlKey || event.button === 2) return

      this.isMouse = true
      this.mouseType = event.target.dataset.type

      if (this.mouseType === 'y') this.y = event.clientY - getClientTop(event.currentTarget).top
      else if (this.mouseType === 'x') this.x = event.clientX - getClientTop(event.currentTarget).left

      document.addEventListener('mousemove', this.onMousemove, false)
      document.addEventListener('mouseup', this.onMouseup, false)
      document.onselectstart = () => false
    },

    onMousemove: function(event) {
      if (!this.isMouse) return
      this.clearScrollType(event)
    },

    onMouseup: function() {
      if (!this.isMouse) return

      this.isMouse = false
      document.removeEventListener('mousemove', this.onMousemove, false)
      document.onselectstart = null
    },

    // ----------------------------------------------
    // ----------------------------------------------
    // ----------------------------------------------
    // ----------------------------------------------
    // ----------------------------------------------
    // ----------------------------------------------

    clearScrollType: function(event, isReturn) {
      if (this.mouseType === 'y') this.getScrollTop(event.clientY, isReturn)
      else if (this.mouseType === 'x') this.getScrollLeft(event.clientX, isReturn)
    },

    getScrollTop: function(clientY, isReturn = false) {
      const d = {
        boxBB      : getClientTop(this.$refs.barbcy).top,
        itemClienBB: clientY,
        clickBarBB : this.y,
        boxBarBB   : this.$refs.barbcy.offsetHeight,
        boxScrollBB: this.$refs.wrap.scrollHeight,
      }

      const value = getScrollBB(d)

      if (!isReturn) this.$refs.wrap.scrollTop = value
      else this.setScrollBB(value, 'scrollTop')
    },

    getScrollLeft: function(clientX, isReturn = false) {
      const d = {
        boxBB      : getClientTop(this.$refs.barbcx).left,
        itemClienBB: clientX,
        clickBarBB : this.x,
        boxBarBB   : this.$refs.barbcx.offsetWidth,
        boxScrollBB: this.$refs.wrap.scrollWidth,
      }

      const value = getScrollBB(d)

      if (!isReturn) this.$refs.wrap.scrollLeft = value
      else this.setScrollBB(value, 'scrollLeft')
    },

    setScrollBB: function(value, key) {
      const length = 10
      const speed  = Math.ceil((value - this.$refs.wrap[key]) / length)
      let index = 0
      const setAnTime = window.requestAnimationFrame || (fn => setTimeout(fn, 10))
      const setScroll = () => {
        this.$refs.wrap[key] += speed

        if (index < length) setAnTime(setScroll)
        index += 1
      }
      setAnTime(setScroll)
    },
  },
  unmounted() {
    document.removeEventListener('mouseup', this.onMouseup, false)
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
    right: 0px;
    top: 2px;
    height: 100%;
    // background: #F1F1F1;
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
    bottom: 0px;
    // background: #F1F1F1;
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
