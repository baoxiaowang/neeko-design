<template>
  <a-select
    v-if="isSubWidget"
    :max-tag-count="1"
    size="small"
    multiple
    readonly
  >
    <a-option v-for="(item, index) in options" :key="index" :value="item.label">
      {{ item.label }}
    </a-option>
    <template #arrow-icon>
      <IconFont type="icon-checkbox-multiple-line" :size="14"></IconFont>
    </template>
  </a-select>
  <a-checkbox-group v-else :direction="node.direction">
    <a-checkbox
      v-for="(item, index) in options"
      :key="index"
      :value="item.label"
    >
      {{ item.label }}
    </a-checkbox>
  </a-checkbox-group>
</template>

<script setup lang="ts" name="input-render">
  import useWidgetInject from '@/widgets/hooks/useWidgetInject';
  import { computed } from 'vue';
  import { CheckboxGroupWidget } from '../../types';

  const { isSubWidget } = useWidgetInject();
  interface RenderProps {
    node: CheckboxGroupWidget;
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
