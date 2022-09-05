<template>
  <a-select style="width: 100%" placeholder="">
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
