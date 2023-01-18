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
  import MessageChannelBus from 'src/utils/message-channel';
  import { PageTypeEnum } from '@/api/page';
  import { Widget } from '@/widgets/types';

  defineEmits([]);
  const props = defineProps<{
    pageType?: PageTypeEnum;
  }>();
  const src = `${window.location.origin}/preview.html?designMode=1&showMark=1`;
  const iframeHeight = ref<string>('100%');

  const store = useDesignStore();

  const windowType = computed(() => store.windowType);

  const pageTypeClass: Record<PageTypeEnum, string> = {
    [PageTypeEnum.mobile]: 'preview-iframe--mobile',
    [PageTypeEnum.form]: 'preview-iframe--form',
    [PageTypeEnum.link]: 'preview-iframe--link',
    [PageTypeEnum.processForm]: 'preview-iframe--process-form',
    [PageTypeEnum.pc]: 'preview-iframe--pc',
  };

  const messageChannelBus = new MessageChannelBus(window);

  function onload() {
    watch(
      () => {
        return {
          widgetList: store.widgetList,
          widgetMap: store.widgetMap,
        };
      },
      (val) => {
        messageChannelBus.emit('sync', val);
      },
      {
        deep: true,
        immediate: true,
      }
    );
    watch(
      () => {
        return {
          widgetLev: store.widgetLev,
        };
      },
      (val) => {
        messageChannelBus.emit('sync', val);
      }
    );
    watch(
      () => {
        return {
          selectWidget: store.selectWidget,
        };
      },
      (val) => {
        messageChannelBus.emit('sync', val);
      },
      {
        deep: true,
      }
    );
    watch(
      () => store.selectedKey,
      (val, oldVal) => {
        if (val === oldVal) return;
        messageChannelBus.emit('select', {
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
        messageChannelBus.emit('hover', {
          key: val,
        });
      },
      {
        deep: true,
      }
    );
  }

  messageChannelBus.on<Widget>('select', (widget) => {
    store.setSelectKey(widget.key);
  });
  messageChannelBus.on<Widget>('hover', (detail) => {
    const newKey = detail.key;
    if (newKey !== store.hoveredKey) {
      store.hoveredKey = newKey;
    }
  });
  messageChannelBus.on<Widget>('update', (widget) => {
    store.handlerWidgetUpdate(widget, true);
  });
  messageChannelBus.on<Widget>('delete', (widget) => {
    store.handlerWidgetDelete(widget);
  });
</script>

<style lang="less">
  .preview-iframe {
    width: 100%;
    overflow: hidden;

    &__mobile {
      width: 375px;
      margin: 0 auto;
    }
  }

  .preview-iframe--mobile {
    width: 375px;
    // margin-top: 20px;
    border-radius: 8px;
    box-shadow: 0 0 0 4px #999;
  }
</style>
