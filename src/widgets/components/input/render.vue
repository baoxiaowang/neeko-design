<template>
  <a-input
    :placeholder="node.placeholder"
    :model-value="value"
    @change="(val) => emit('update:value', val)"
  ></a-input>
</template>

<script setup lang="ts" name="input-render">
  import useWidgetInject from '@/widgets/hooks/useWidgetInject';
  import { InputWidget } from '../../types';

  const { isSubWidget } = useWidgetInject();
  interface RenderProps {
    node: InputWidget;
    value: string;
  }
  withDefaults(defineProps<RenderProps>(), {
    value: '',
  });
  const emit = defineEmits<{
    (e: 'update:value', d: string): void;
  }>();
</script>

<style lang="less">
  // .input-render {
  // }
</style>
