<template>
  <a-input-number
    v-model="modelValue"
    :placeholder="node.placeholder"
  ></a-input-number>
</template>

<script setup lang="ts" name="input-render">
  import useWidgetInject from '@/widgets/hooks/useWidgetInject';
  import { computed } from 'vue';
  import { InputWidget } from '../../types';

  interface RenderProps {
    node: InputWidget;
    value?: number;
  }
  const { size } = useWidgetInject();
  const emit = defineEmits<{
    (e: 'update:value', d: number | undefined): void;
  }>();

  const props = defineProps<RenderProps>();
  const modelValue = computed({
    get() {
      return props.value;
    },
    set(val: any) {
      emit('update:value', val);
    },
  });
</script>

<style lang="less">
  // .input-render {
  // }
</style>
