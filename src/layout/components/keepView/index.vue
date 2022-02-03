<template>
  <div class="tags">
    <mo-scrollbar style="height: 100%; width: 100%;" scroll-x>
      <el-tag
      class="item-tag"
      v-for="(item, index) in 10"
      :key="index"
      size='small'
      effect='plain'
      closable>Tag 1</el-tag>
    </mo-scrollbar>
  </div>
</template>

<script>
import { defineAsyncComponent, defineComponent, ref } from 'vue'
export default defineComponent({
  components: {
    moScrollbar: defineAsyncComponent(() => import('@/components/scrollbar')),
  },
  setup() {
    const tagArr = ref([])

    return { tagArr }
  },
})
</script>

<style lang="scss" scoped>
.tags {
  width: 100%;
  height: 100%;
  // background-color: yellowgreen;
  display: flex;
  align-items: center;
  .item-tag {
    margin-right: 10px;
  }
}
</style>
