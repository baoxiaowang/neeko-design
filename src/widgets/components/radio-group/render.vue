<template>
  <a-select v-if="isSubWidget" readonly>
    <a-option value="A"><icon-record />选项一</a-option>
    <a-option value="B"><icon-record />选项二</a-option>
    <a-option value="C"><icon-record />选项三</a-option>
    <template #arrow-icon><icon-record /></template>
  </a-select>
  <a-radio-group v-else direction="vertical">
    <a-radio value="A">选项一</a-radio>
    <a-radio value="B">选项二</a-radio>
    <a-radio value="C">选项三</a-radio>
  </a-radio-group>
</template>

<script setup lang="ts" name="input-render">
  import useWidgetInject from '@/widgets/hooks/useWidgetInject';
  import { InputWidget } from '../../types';

  const { isSubWidget } = useWidgetInject();
  interface RenderProps {
    node: InputWidget;
  }
  defineProps<RenderProps>();
</script>

<style lang="less">
  // .input-render {
  // }
</style>
