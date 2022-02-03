<template>
  <mo-scrollbar scroll-x>
    <div class="tags">
      <el-tag
        class="item-tag"
        v-for="(item, index) in 10"
        :key="index"
        size="small"
        effect="plain"
        closable
        >Tag 1</el-tag
      >
    </div>
  </mo-scrollbar>
</template>

<script>
import { defineAsyncComponent, defineComponent, ref } from 'vue'
export default defineComponent({
  components: {
    moScrollbar: defineAsyncComponent(() =>
      import('@/components/scrollbar'),
    ),
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
      height: 50px;
      display: flex;
      align-items: flex-start;
      .item-tag {
          margin-right: 10px;
      }
  }

</style>
