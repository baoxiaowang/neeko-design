<template>
  <div class="design-form__page">
    <renderWidgetVue
      v-for="item in widgets"
      :key="item.key"
      :node="item"
      :meta="{}"
    ></renderWidgetVue>
  </div>
</template>

<script setup lang="ts" name="index">
  import { useDesignStore } from '@/store';
  import renderWidgetVue from '@/widgets/render/render-widget.vue';

  useDesignStore().initState('form');
  const props = defineProps({});
  const emit = defineEmits({});
  const store = useDesignStore();
  const widgets = store.widgetList;
</script>

<style lang="less">
  .design-form__page {
    height: 100%;
  }
</style>
