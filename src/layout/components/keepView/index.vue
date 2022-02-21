<template>
  <mo-scrollbar scroll-x>
    <div class="tags">
      <el-tag
        class="item-tag"
        v-for="(item, index) in LAYOUT_KEEP_VIEW"
        :key="index"
        size="small"
        :effect="name === item.name ? 'dark' : 'plain'"
        :closable="item.name !== 'Home'"
        @close.stop="closeTag(item)"
        @click.stop="gotoTag(item.url)"
        >{{ item.title }}</el-tag
      >
    </div>
  </mo-scrollbar>
</template>

<script>
import { defineAsyncComponent, defineComponent, ref,  reactive, watch, toRefs, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default defineComponent({
  components: {
    moScrollbar: defineAsyncComponent(() =>
      import('@/components/scrollbar'),
    ),
  },
  setup() {
    const name = ref('')
    const router = reactive(useRouter())
    const store = reactive(useStore())
    const { LAYOUT_KEEP_VIEW } = toRefs(reactive(store.getters))

    const getKeepName = function() {
      const paths = router.currentRoute.matched
      const fullUrl = router.currentRoute.fullPath
      const component = paths[paths.length - 1].components.default
      const meta = paths[paths.length - 1].meta

      if (component.name && (meta && !meta.hidden)) {
        name.value = component.name
        store.dispatch('LAYOUT/ADD_KEEP_VIEW', {
          name: component.name,
          title: meta.title,
          url: fullUrl || meta.url,
        })
      }
    }
    watch(router, getKeepName)
    onMounted(() => getKeepName())

    const closeTag = function(item) {
      store.dispatch('LAYOUT/REM_KEEP_VIEW', item)
    }
    const gotoTag = function(url) {
      router.push(url)
    }
    return { name, LAYOUT_KEEP_VIEW, closeTag, gotoTag }
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
          cursor: pointer;
      }
  }

</style>
