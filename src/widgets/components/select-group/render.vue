<template>
  <a-select
    multiple
    style="width: 100%"
    placeholder=""
    :max-tag-count="isSubWidget ? 1 : 3"
  >
    <a-option>选项一</a-option>
    <a-option>选项二</a-option>
    <a-option>选项三</a-option>
  </a-select>
</template>

<script setup lang="ts" name="input-render">
  import useWidgetInject from '@/widgets/hooks/useWidgetInject';
  import { InputWidget } from '../../types';

  const { isSubWidget, size } = useWidgetInject();
  interface RenderProps {
    node: InputWidget;
  }
  defineProps<RenderProps>();
</script>

<style lang="less">
  // .input-render {
  // }
</style>
