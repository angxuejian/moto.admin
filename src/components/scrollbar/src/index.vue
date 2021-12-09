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
    <div v-if="isScrollShow('scrollY')" @mousedown="clikcScrollbar" data-type='y' ref="barbcy" class="mo-scrollbar__axis-y">
      <div ref="bary" :style="`height: ${axis.h}%;transform: translateY(${axis.y}%)`"
        class="axis-hover"
        data-type='y'
        @mousedown.stop='clickSlideScrollbar'
      ></div>
    </div>

    <div v-if="isScrollShow('scrollX')" @mousedown="clikcScrollbar" data-type='x' ref="barbcx" class="mo-scrollbar__axis-x">
      <div ref="barx" :style="`width: ${axis.w}%;transform: translateX(${axis.x}%)`"
        class="axis-hover"
        data-type='x'
        @mousedown.stop='clickSlideScrollbar'
      ></div>
    </div>
  </div>
</template>

<script>
import { getScrollSize } from './util'
import { addResize, removeResize } from '@/utils/resize-event'
import useWrap from './wrap'
import useBar from './bar'
import { ref } from 'vue'
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

  setup(props) {
    const axis = ref({ y: 0, x: 0, h: 0, w: 0 }) // 滚动条的位置与大小

    const { wrapStyle, getWrapStyle, getWrapDistance } = useWrap(props.default, axis)
    const bar = useBar()

    return {
      axis,
      wrapStyle,
      getWrapStyle,
      getWrapDistance,
      ...bar,
    }
  },
  data() {
    return {
      isScroll: false, // 是否同时显示 x 和 y 轴
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

    getWrapSize: function() {
      const { w, h } = getScrollSize(this.$refs.wrap)
      this.axis.h = h
      this.axis.w = w
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
