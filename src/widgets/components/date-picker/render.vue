<template>
  <a-date-picker :size="size" style="width: 100%" />
</template>

<script setup lang="ts" name="input-render">
  import useWidgetInject from '@/widgets/hooks/useWidgetInject';
  import { InputWidget } from '../../types';

  const { size } = useWidgetInject();
  interface RenderProps {
    node: InputWidget;
  }
  defineProps<RenderProps>();
</script>

<style lang="less">
  // .input-render {
  // }
</style>
