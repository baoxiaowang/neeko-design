<template>
  <a-select
    :model-value="value"
    style="width: 100%"
    placeholder=""
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
  import { InputWidget, SelectWidget } from '../../types';

  const { isSubWidget } = useWidgetInject();
  interface RenderProps {
    node: SelectWidget;
    value?: string;
  }
  const props = defineProps<RenderProps>();
  const emit = defineEmits<{
    (e: 'update:value', d: string | undefined): void;
  }>();
  const options = computed(() => {
    return props.node.options;
  });
  function handleChange(val: any) {
    emit('update:value', val);
  }
</script>

<style lang="less">
  // .input-render {
  // }
</style>
