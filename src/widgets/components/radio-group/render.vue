<template>
  <a-select v-if="isSubWidget" size="small" readonly>
    <template #arrow-icon><icon-record /></template>
    <a-option value="A"><icon-record />选项一</a-option>
    <a-option value="B"><icon-record />选项二</a-option>
    <a-option value="C"><icon-record />选项三</a-option>
  </a-select>
  <a-radio-group v-else :direction="node.direction">
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
  }
  const props = defineProps<RenderProps>();
  const options = computed(() => {
    return props.node.options;
  });
</script>

<style lang="less">
  // .input-render {
  // }
</style>
