<template>
  <a-select multiple style="width: 100%" placeholder="Please select ...">
    <a-option>选项一</a-option>
    <a-option>选项二</a-option>
    <a-option>选项三</a-option>
  </a-select>
</template>

<script setup lang="ts" name="input-render">
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
