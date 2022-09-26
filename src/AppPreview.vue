<template>
  <div class="PreviewApp">
    <renderWidgetVue
      v-for="node in widgetData"
      :key="node.key"
      :state="{}"
      :meta="{}"
      :node="node"
    />
  </div>
  <WidgetMark></WidgetMark>
</template>

<script setup lang="ts" name="PreviewApp">
  import renderWidgetVue from '@/widgets/render/render-widget.vue';
  import { onMounted, ref, provide, computed, watch } from 'vue';
  import DesignChannel, {
    WidgetChangeEvent,
  } from '@/components/design/design-channel';
  import DesignEventBus from 'src/utils/design-event';
  import WidgetMark from './components/design/widget-mark/index.vue';
  import { Widget } from './widgets/types';

  const widgetData = ref<Widget[]>([]);
  // const designChannel = new DesignChannel(window.parent);
  const designEventBus = new DesignEventBus(window.parent);

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
  html,
  body {
    overflow: hidden;
  }
  // .preview-App {
  // }
</style>
