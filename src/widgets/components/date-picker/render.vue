<template>
  <a-date-picker
    :placeholder="node.placeholder || ' '"
    :size="size"
    style="width: 100%"
    :model-value="value"
    value-format="timestamp"
    @change="dateChange"
  />
</template>

<script setup lang="ts" name="input-render">
  import useWidgetInject from '@/widgets/hooks/useWidgetInject';
  import { InputWidget } from '../../types';

  const { size } = useWidgetInject();
  interface RenderProps {
    node: InputWidget;
    value?: number;
  }
  defineProps<RenderProps>();
  const emit = defineEmits<{
    (e: 'update:value', d: number | undefined): void;
  }>();
  function dateChange(val: any) {
    emit('update:value', val);
  }
</script>

<style lang="less">
  // .input-render {
  // }
</style>
