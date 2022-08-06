<template>
  <ConfigBlockVue label="输入提示" class="attr-placeholder">
    <a-input
      :model-value="node.placeholder"
      @update:model-value="(val) => changeAttr('placeholder', val)"
    />
  </ConfigBlockVue>
</template>

<script setup lang="ts" name="attr-placeholder">
  import { FormWidget } from '../types';
  import ConfigBlockVue from '../common/config-block.vue';

  const props = defineProps<{
    node: FormWidget;
    change: (e: Partial<FormWidget>) => void;
  }>();
  function changeAttr(key: keyof FormWidget, val: string) {
    props.change({
      [key]: val,
    });
  }
</script>

<style lang="less">
  .attr-placeholder {
  }
</style>
