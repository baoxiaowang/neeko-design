<template>
  <div
    class="iframe-container__wrap"
    :class="{
      'iframe-container__wrap--frame': showFrame,
    }"
  >
    <img
      v-if="showFrame"
      class="preview__wrap-iphone"
      src="@/assets/images/iphonex.png"
      alt=""
      srcset=""
    />
    <iframe
      class="iframe-container"
      :src="src"
      frameborder="0"
      @load="onload"
    />
  </div>
</template>

<script setup lang="ts" name="iframe-container">
  import { Widget } from '@/widgets/types';
  import { ref, watchEffect } from 'vue';
  import DesignEventBus from 'src/utils/design-event';
  import MessageChannelBus from 'src/utils/message-channel';

  const messageChannelBus = new MessageChannelBus(window);
  const props = withDefaults(
    defineProps<{
      autoHeight: boolean; // 自适应内部的高度
      widgets: Widget[];
      showFrame: boolean; // 是否显示iphone 骨架
    }>(),
    {
      autoHeight: true,
      showFrame: false,
      widgets: () => [],
    }
  );
  // const emit = defineEmits();

  const src = `${window.location.origin}/preview.html`;
  function onload() {
    watchEffect(() => {
      messageChannelBus.emit('sync', {
        widgetList: props.widgets,
      });
    });
  }
</script>

<style lang="less">
  .iframe-container__wrap {
    position: relative;
    height: 100%;

    &--frame {
      position: relative;
      width: 432px;
      height: 862.5px;
      margin: 0 auto;
      padding: 26px 28px;
      background: #fff;
    }

    .iframe-container {
      width: 100%;
      height: 100%;
    }

    .preview__wrap-iphone {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 100;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }
  }
</style>
