<template>
  <a-checkbox-group direction="vertical">
    <a-checkbox value="1">选项一</a-checkbox>
    <a-checkbox value="2">选项二</a-checkbox>
    <a-checkbox value="3">选项三</a-checkbox>
  </a-checkbox-group>
</template>

<script setup lang="ts" name="input-render">
  import FormWidgetLayout from 'src/widgets/common/form-widget-layout.vue';
  import { InputWidget } from '../../types';

  interface RenderProps {
    node: InputWidget;
  }
  defineProps<RenderProps>();
</script>

<style lang="less">
  // .input-render {
  // }
</style>
