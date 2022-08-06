<template>
  <ConfigBlockVue required label="标题">
    <a-space direction="vertical" fill>
      <a-input
        :model-value="label"
        placeholder="请输入字段标题"
        @update:model-value="changeAttr"
      />
      <a-checkbox
        :model-value="!!node.hideLabel"
        @update:model-value="changeHideLabel"
      >
        标题隐藏</a-checkbox
      >
    </a-space>
  </ConfigBlockVue>
</template>

<script setup lang="ts" name="attr-label">
  import ConfigBlockVue from '../common/config-block.vue';
  import { FormWidget, NumBoolean } from '../types';

  const props = defineProps<{
    label?: string;
    node: FormWidget;
    change: (e: Partial<FormWidget>) => void;
  }>();
  const emit = defineEmits<{
    (n: 'change', e: string): void;
  }>();
  function changeAttr(val: string) {
    emit('change', val);
  }
  function changeHideLabel(val: any) {
    props.change({
      hideLabel: +val as NumBoolean,
    });
  }
</script>

<style lang="less">
  // .attr-label {
  // }
</style>
