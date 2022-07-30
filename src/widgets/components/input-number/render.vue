<template>
  <a-input-number :placeholder="node.placeholder"></a-input-number>
</template>

<script setup lang="ts" name="input-render">
  import useWidgetInject from '@/widgets/hooks/useWidgetInject';
  import { InputWidget } from '../../types';

  interface RenderProps {
    node: InputWidget;
  }
  const { size } = useWidgetInject();

  defineProps<RenderProps>();
</script>

<style lang="less">
  // .input-render {
  // }
</style>
