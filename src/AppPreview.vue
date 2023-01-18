<template>
  <renderProvider :meta="{}" mode="design">
    <renderWidgetVue
      v-for="node in widgetData"
      :key="node.key"
      :state="{}"
      :meta="{}"
      :node="node"
    />
  </renderProvider>
  <WidgetMark v-if="showMark === '1'"></WidgetMark>
</template>

<script setup lang="ts" name="PreviewApp">
  import renderWidgetVue from '@/widgets/render/render-widget.vue';
  import { onMounted, ref, provide, computed, watch, onBeforeMount } from 'vue';

  import DesignEventBus from 'src/utils/design-event';
  import MessageChannelBus from 'src/utils/message-channel';
  import renderProvider from '@/widgets/render/render-provider.vue';
  import WidgetMark from './components/design/widget-mark/index.vue';
  import { Widget } from './widgets/types';
  import { usePreviewStore } from './store-preview';

  const store = usePreviewStore();

  const messageChannel = new MessageChannelBus(window.parent);

  watch(
    () => store.selectKey,
    (val, oldVal) => {
      if (val === oldVal) return;
      messageChannel.emit('select', {
        key: val,
      });
    }
  );
  const widgetData = computed(() => {
    return store.widgetList || [];
  });
  const designEventBus = new DesignEventBus(window.parent);
  const url = new URLSearchParams(window.location.search);
  const showMark = url.get('showMark');
  const designMode = url.get('designMode');
  const PreviewApp = {
    designEventBus,
  };

  onBeforeMount(() => {
    if (designMode === '1') {
      document.body.classList.add('design-mode');
    }
  });

  provide('PreviewApp', PreviewApp);

  if (window.parent) {
    messageChannel.on<{
      widgetList: Widget[];
      widgetMap: Record<string, Widget>;
    }>('init', ({ widgetList, widgetMap }) => {
      store.setWidgetList(widgetList);
      store.setWidgetMap(widgetMap);
    });

    messageChannel.on<Widget>('select', (data) => {
      store.setSelectKey(data.key);
    });

    messageChannel.on<{
      widgetLev: Widget[];
      selectWidget?: Widget | null;
    }>('sync', (data) => {
      store.syncStore(data);
    });
  }
</script>

<style lang="less">
  // .preview-App {
  // }
</style>
