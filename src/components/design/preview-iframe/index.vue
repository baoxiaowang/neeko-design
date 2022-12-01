<template>
  <iframe
    id="preview"
    ref="iframeEl"
    name="preview"
    class="preview-iframe"
    :class="['preview-iframe__' + windowType, pageTypeClass[pageType!]]"
    :src="src"
    frameborder="0"
    :style="{
      height: iframeHeight,
    }"
    @load="onload"
  >
  </iframe>
</template>

<script setup lang="ts" name="preview-iframe">
  import { useDesignStore } from '@/store';
  import { watch, ref, computed, watchEffect } from 'vue';
  import DesignEventBus from 'src/utils/design-event';
  import { PageTypeEnum } from '@/api/page';

  const src = `${window.location.origin}/preview.html`;
  const iframeHeight = ref<string>('100vh');

  const store = useDesignStore();

  const windowType = computed(() => store.windowType);

  defineEmits([]);
  defineProps<{
    pageType?: PageTypeEnum;
  }>();

  const pageTypeClass: Record<PageTypeEnum, string> = {
    [PageTypeEnum.mobile]: 'preview-iframe--mobild',
    [PageTypeEnum.form]: 'preview-iframe--form',
    [PageTypeEnum.link]: 'preview-iframe--link',
    [PageTypeEnum.processForm]: 'preview-iframe--process-form',
    [PageTypeEnum.pc]: 'preview-iframe--pc',
  };

  const designEventBus = new DesignEventBus(window);

  function onload() {
    watch(
      () => store.widgetList,
      () => {
        designEventBus.emitInit(store.widgetList);
      },
      {
        deep: true,
        immediate: true,
      }
    );
    watch(
      () => store.selectedKey,
      (val) => {
        designEventBus.emit('select', {
          key: val,
          type: store.widgetMap[val]?.type,
        });
      },
      {
        deep: true,
        immediate: true,
      }
    );
    watch(
      () => store.hoveredKey,
      (val: any) => {
        designEventBus.emit('hover', {
          key: val,
        });
      },
      {
        deep: true,
        immediate: true,
      }
    );
  }

  designEventBus.on('select', (widget) => {
    store.setSelectKey(widget.key);
  });
  designEventBus.on('hover', (detail) => {
    const newKey = detail.key;
    if (newKey !== store.hoveredKey) {
      store.hoveredKey = newKey;
    }
  });
  designEventBus.on('update', (widget) => {
    store.handlerWidgetUpdate(widget, true);
  });
  designEventBus.on('delete', (widget) => {
    store.handlerWidgetDelete(widget);
  });
</script>

<style lang="less">
  .preview-iframe {
    width: 100%;
    // height: inherit;
    &__mobile {
      width: 375px;
      margin: 0 auto;
    }
  }

  .preview-iframe--mobild {
    width: 375px;
    margin-top: 20px;
  }
</style>
