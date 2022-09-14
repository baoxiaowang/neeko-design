<template>
  <a-select
    v-if="isSubWidget"
    :model-value="value"
    size="small"
    readonly
    @update:model-value="change"
  >
    <template #arrow-icon><icon-record /></template>
    <a-option v-for="(item, index) in options" :key="index" :value="item.label">
      <icon-record />{{ item.label }}
    </a-option>
  </a-select>
  <a-radio-group
    v-else
    :model-value="value"
    :direction="optionConfig?.direction"
    @update:model-value="change"
  >
    <a-radio v-for="(item, index) in options" :key="index" :value="item.label">
      {{ item.label }}
    </a-radio>
  </a-radio-group>
</template>

<script setup lang="ts" name="input-render">
  import useWidgetInject from '@/widgets/hooks/useWidgetInject';
  import { computed } from 'vue';
  import { InputWidget, RadioGroupWidget } from '../../types';

  const { isSubWidget } = useWidgetInject();
  interface RenderProps {
    node: RadioGroupWidget;
    value?: string;
  }
  const emit = defineEmits<{
    (e: 'update:value', d: string): void;
  }>();

  const props = defineProps<RenderProps>();
  const optionConfig = computed(() => props.node.optionConfig);
  const options = computed(() => {
    return props.node.optionConfig?.options || [];
  });
  function change(val: any) {
    emit('update:value', val);
  }
</script>

<style lang="less">
  // .input-render {
  // }
</style>
