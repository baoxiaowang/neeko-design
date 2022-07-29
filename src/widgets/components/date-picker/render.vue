<template>
  <a-date-picker style="width: 100%" />
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
