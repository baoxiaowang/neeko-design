<template>
  <renderWidgetVue
    v-for="node in widgetData"
    :key="node.key"
    :state="{}"
    :meta="{}"
    :node="node"
  />
  <WidgetMark v-if="showMark === '1'"></WidgetMark>
</template>

<script setup lang="ts" name="PreviewApp">
  import renderWidgetVue from '@/widgets/render/render-widget.vue';
  import { onMounted, ref, provide, computed, watch } from 'vue';

  import DesignEventBus from 'src/utils/design-event';
  import WidgetMark from './components/design/widget-mark/index.vue';
  import { Widget } from './widgets/types';

  const widgetData = ref<Widget[]>([]);
  // const designChannel = new DesignChannel(window.parent);
  const designEventBus = new DesignEventBus(window.parent);
  const url = new URLSearchParams(window.location.search);
  const showMark = url.get('showMark');

  const PreviewApp = {
    designEventBus,
  };
  provide('PreviewApp', PreviewApp);

  if (window.parent) {
    designEventBus.onInit((data) => {
      const widgetList = JSON.parse(JSON.stringify(data));
      widgetData.value = widgetList;
    });
  }
</script>

<style lang="less">
  // .preview-App {
  // }
</style>
