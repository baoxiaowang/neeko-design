<template>
  <a-select
    multiple
    style="width: 100%"
    placeholder=""
    :max-tag-count="isSubWidget ? 1 : 3"
    :model-value="value"
    @change="handleChange"
  >
    <a-option v-for="(item, index) in options" :key="index" :value="item.label">
      {{ item.label }}
    </a-option>
  </a-select>
</template>

<script setup lang="ts" name="input-render">
  import useWidgetInject from '@/widgets/hooks/useWidgetInject';
  import { computed } from 'vue';
  import { SelectGroupWidget } from '../../types';

  const { isSubWidget } = useWidgetInject();
  interface RenderProps {
    node: SelectGroupWidget;
    value?: string[];
  }
  const props = defineProps<RenderProps>();
  const options = computed(() => {
    return props.node.optionConfig?.options || [];
  });

  const emit = defineEmits<{
    (e: 'update:value', d: string | undefined): void;
  }>();
  function handleChange(val: any) {
    emit('update:value', val);
  }
</script>

<style lang="less">
  // .input-render {
  // }
</style>
