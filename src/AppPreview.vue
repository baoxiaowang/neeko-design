<template>
  <div class="PreviewApp">
    <renderWidgetVue
      v-for="node in widgetData"
      :key="node.key"
      :state="{}"
      :meta="{}"
      :node="node"
    ></renderWidgetVue>
  </div>
  <WidgetMark></WidgetMark>
  <!-- :select-widget="selectWidget"
    :hover-key="hoverKey"
  @select-key-change="selectKeyChange"
    @hovered-key-change="hoverKeyChange" -->
</template>

<script setup lang="ts" name="PreviewApp">
  import renderWidgetVue from '@/widgets/render/render-widget.vue';
  import { onMounted, ref } from 'vue';
  import DesignChannel, {
    SelectChangeEvent,
    WidgetChangeEvent,
    KeyChangeEvent,
  } from '@/components/design/design-channel';
  import WidgetMark from '@/components/design/widget-mark/index.vue';
  import { Widget } from './widgets/types';

  const widgetData = ref<Widget[]>([
    {
      type: 'text',
      key: 't',
      config: {
        text: '3',
      },
    },
  ]);
  const designChannel = new DesignChannel(window.parent);
  // const selfChannel = new DesignChannel(window);
  // const selectWidget = ref<Widget | undefined>();
  // const hoverKey = ref<string>('');

  // function selectKeyChange(e = '') {
  //   if (selectWidget.value?.key !== e) {
  //     selfChannel.$emit('selectKeyChange', e);
  //   }
  // }
  // function hoverKeyChange(e = '') {
  //   if (hoverKey.value !== e) {
  //     selfChannel.$emit('hoverKeyChange', e);
  //   }
  // }

  onMounted(() => {
    if (window.parent) {
      designChannel.$on('widgetChange', (e) => {
        widgetData.value = (e as WidgetChangeEvent).detail;
      });
      // designChannel.$on('selectChange', (e) => {
      //   selectWidget.value = (e as SelectChangeEvent).detail;
      // });
      // designChannel.$on('hoverKeyChange', (e) => {
      //   hoverKey.value = (e as KeyChangeEvent).detail;
      // });
    }
  });

  // const props = defineProps();
  // const emit = defineEmits();
</script>

<style lang="less">
  // .preview-App {
  // }
</style>
