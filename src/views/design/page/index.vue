<template>
  <div class="design-page__page">
    <renderWidgetVue
      v-for="item in widgets"
      :key="item.key"
      :node="item"
      :meta="{}"
    ></renderWidgetVue>
  </div>
</template>

<script setup lang="ts" name="design-page-view">
  import { useDesignStore } from '@/store';
  import renderWidgetVue from '@/widgets/render/render-widget.vue';

  useDesignStore().initState('page');
  const props = defineProps({});
  const emit = defineEmits({});
  const store = useDesignStore();
  const widgets = store.widgetList;
</script>

<style lang="less">
  .design-page__page {
    height: 100%;
  }
</style>
