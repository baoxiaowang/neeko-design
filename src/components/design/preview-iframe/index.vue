<template>
  <iframe
    id="preview"
    ref="iframeEl"
    name="preview"
    class="preview-iframe"
    :src="src"
    frameborder="0"
    :style="{
      height: iframeHeight,
    }"
    @load="onLoad"
  >
  </iframe>
</template>

<script setup lang="ts" name="preview-iframe">
  import { useDesignStore } from '@/store';
  import { watch, ref } from 'vue';
  import DesignChannel, {
    DelWidgetEvent,
    KeyChangeEvent,
    SelectChangeEvent,
  } from '../design-channel';

  const designChannel = new DesignChannel(window);

  const src = `${window.location.origin}/preview.html`;
  const iframeHeight = ref<string>('100vh');

  // const props = defineProps();
  const store = useDesignStore();

  defineEmits([]);
  function initMutationObserver() {
    const preWindow: Window = (window as any).preview;
    const targetNode: HTMLBodyElement | null =
      preWindow?.document.querySelector('body');
    if (targetNode) {
      // 观察器的配置（需要观察什么变动）
      const config = { attributes: true, childList: true, subtree: true };
      // 当观察到变动时执行的回调函数
      // eslint-disable-next-line func-names
      const callback = (mutationsList: any, observer: any) => {
        // Use traditional 'for loops' for IE 11
        // eslint-disable-next-line no-restricted-syntax
        for (const mutation of mutationsList) {
          if (mutation.type === 'childList') {
            // console.log('A child node has been added or removed.');
          } else if (mutation.type === 'attributes') {
            // console.log(
            //   `The ${mutation.attributeName} attribute was modified.`
            // );
          }
        }
        // console.log(targetNode);
        setTimeout(() => {
          iframeHeight.value = `${targetNode.offsetHeight}px`;
        }, 200);
      };
      const observer = new MutationObserver(callback);
      // 以上述配置开始观察目标节点
      observer.observe(targetNode, config);
    }
  }
  function initPreviewEvent() {
    const previewChannel = new DesignChannel((window as any).preview);

    previewChannel.$on('selectKeyChange', (e: Event) => {
      // console.log('previewChannel', e);
      const newKey = (e as KeyChangeEvent).detail;
      if (newKey !== store.selectedKey) {
        store.setSelectKey(newKey);
      }
    });
    previewChannel.$on('hoverKeyChange', (e: Event) => {
      const newKey = (e as KeyChangeEvent).detail;
      if (newKey !== store.hoveredKey) {
        store.hoveredKey = newKey;
      }
    });
    previewChannel.$on('delWidget', (e: Event) => {
      debugger;
      const widget = (e as DelWidgetEvent).detail;
      if (widget) {
        store.handlerWidgetDelete(widget);
      }
    });
    previewChannel.$on('widgetUpdate', (e: Event) => {
      const widget = (e as DelWidgetEvent).detail;
      store.handlerWidgetUpdate(widget);
    });
  }

  function onLoad() {
    watch(
      () => store.widgetList,
      (val) => {
        try {
          const detail = JSON.parse(JSON.stringify(val || []));
          DesignChannel.getInstance(window).$emit('widgetChange', detail);
        } catch (error) {
          //
          console.error(error);
        }
      },
      {
        deep: true,
        immediate: true,
      }
    );
    watch(
      () => store.selectWidget,
      (val) => {
        try {
          const detail = JSON.parse(JSON.stringify(val));
          designChannel.$emit('selectChange', detail);
          designChannel.$emit('selectKeyChange', detail?.key || '');
        } catch (error) {
          console.error(error);
        }
      },
      {
        deep: true,
        immediate: true,
      }
    );
    watch(
      () => store.hoveredKey,
      (val) => {
        designChannel.$emit('hoverKeyChange', val || '');
      },
      {
        deep: true,
        immediate: true,
      }
    );

    initMutationObserver();
    initPreviewEvent();
  }
</script>

<style lang="less">
  .preview-iframe {
    width: 100%;
    // height: inherit;
  }
</style>
