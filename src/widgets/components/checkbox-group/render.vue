<template>
  <a-select
    v-if="isSubWidget"
    :max-tag-count="1"
    size="small"
    multiple
    readonly
  >
    <a-option value="A">选项一</a-option>
    <a-option value="B">选项二</a-option>
    <a-option value="C">选项三</a-option>
    <template #arrow-icon>
      <IconFont type="icon-checkbox-multiple-line" :size="14"></IconFont>
    </template>
  </a-select>
  <a-checkbox-group v-else direction="vertical">
    <a-checkbox value="1">选项一</a-checkbox>
    <a-checkbox value="2">选项二</a-checkbox>
    <a-checkbox value="3">选项三</a-checkbox>
  </a-checkbox-group>
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
