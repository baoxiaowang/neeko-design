<template>
  <a-popover
    v-if="isSubWidget"
    :content-style="{ width: '300px' }"
    position="bottom"
    trigger="click"
  >
    <div class="arco-input-wrapper image-render__sub" style="height: 32px">
    </div>
    <template #content>
      <location-render></location-render>
    </template>
  </a-popover>
  <a-button v-else long>
    <template #icon>
      <icon-location />
    </template>
    获取位置
  </a-button>
</template>

<script setup lang="ts" name="location-render">
  import useWidgetInject from '@/widgets/hooks/useWidgetInject';
  import { provide } from 'vue';
  import { InputWidget } from '../../types';

  interface RenderProps {
    node: InputWidget;
  }
  defineProps<RenderProps>();
  provide('isSubWidget', false);
  const { isSubWidget } = useWidgetInject();
</script>

<style lang="less">
  // .input-render {
  // }
</style>
