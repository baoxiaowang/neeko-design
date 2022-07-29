<template>
  <a-divider orientation="left"></a-divider>
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
