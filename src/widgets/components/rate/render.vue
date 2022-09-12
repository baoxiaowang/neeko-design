<template>
  <a-rate :model-value="value" @change="handleChange" />
</template>

<script setup lang="ts" name="input-render">
  import { InputWidget } from '../../types';

  interface RenderProps {
    node: InputWidget;
    value?: number;
  }
  defineProps<RenderProps>();
  const emit = defineEmits<{
    (e: 'update:value', d: number | undefined): void;
  }>();
  function handleChange(val: number) {
    emit('update:value', val);
  }
</script>

<style lang="less">
  // .input-render {
  // }
</style>
