<template>
  <a-input-tag
    :default-value="['test']"
    :style="{ width: '100%' }"
    readonly
    placeholder="请选择用户"
  >
    <template #tag="{ data }"> {{ data.value }} </template>
  </a-input-tag>
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
