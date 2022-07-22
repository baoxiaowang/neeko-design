<template>
  <div class="design-page__page">
    <!-- <renderWidgetVue
      v-for="item in widgets"
      :key="item.key"
      :node="item"
      :meta="{}"
    ></renderWidgetVue> -->
    <PreviewIframe></PreviewIframe>
  </div>
</template>

<script setup lang="ts" name="design-page-view">
  import { useDesignStore } from '@/store';
  // import renderWidgetVue from '@/widgets/render/render-widget.vue';
  import PreviewIframe from '@/components/design/preview-iframe/index.vue';

  useDesignStore().initState('page');
  // const store = useDesignStore();
  // const widgets = store.widgetList;
</script>

<style lang="less">
  .design-page__page {
    height: 100%;
  }
</style>
