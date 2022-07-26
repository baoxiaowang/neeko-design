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
  import { onMounted, ref } from 'vue';
  import DesignChannel, {
    WidgetChangeEvent,
  } from '@/components/design/design-channel';
  import WidgetMark from './components/design/widget-mark/index.vue';
  import { Widget } from './widgets/types';

  const widgetData = ref<Widget[]>([]);
  const designChannel = new DesignChannel(window.parent);
  onMounted(() => {
    if (window.parent) {
      designChannel.$on('widgetChange', (e) => {
        widgetData.value = (e as WidgetChangeEvent).detail;
      });
    }
  });
</script>

<style lang="less">
  html,
  body {
    overflow: hidden;
  }
  // .preview-App {
  // }
</style>
