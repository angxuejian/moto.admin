<template>
    <template v-if="!item.hidden">
        <el-menu-item v-if="checkOnlyItem(item)" :index="onlyItem.meta.url">
            <el-icon><component :is='onlyItem.meta.icon || "location"' /></el-icon>
            <span>{{ onlyItem.meta.title }}</span>
        </el-menu-item>

        <el-sub-menu v-else :index="item.meta.url">
            <template #title>
                <el-icon><folder /></el-icon>
                <span>{{ item.meta.title }}</span>
            </template>
            <item-menu v-for="(s, i) in item.children" :key="i" :item="s" />
        </el-sub-menu>
    </template>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'ItemMenu',
  props: {
    item: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  setup(props) {
    const onlyItem = ref({})

    const checkOnlyItem = (item) => {
      item.children = item.children || []
      const child = item.children.filter(f => !f.hidden)
      const isOnly = !child || (child && child.length === 1 && !child[0].children)
      if (isOnly) onlyItem.value = child ? child[0] : item

      return isOnly
    }

    return { onlyItem, checkOnlyItem }
  },
}
</script>
