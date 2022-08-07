<template>
  <ConfigBlockVue required label="表单布局">
    <a-radio-group v-model="layout" type="button">
      <a-radio value="vertical">垂直</a-radio>
      <a-radio value="horizontal">横向</a-radio>
    </a-radio-group>
  </ConfigBlockVue>
  <ConfigBlockVue v-if="layout === 'horizontal'" label="标签对齐">
    <a-radio-group v-model="labelAlign" type="button">
      <a-radio value="left">左对齐</a-radio>
      <a-radio value="right">右对齐</a-radio>
    </a-radio-group>
  </ConfigBlockVue>
</template>

<script setup lang="ts" name="attr-form-layout">
  import { computed, ref } from 'vue';
  import ConfigBlockVue from '../common/config-block.vue';
  import { FormRootWidget, FormWidget, NumBoolean } from '../types';

  const props = defineProps<{
    node: FormRootWidget;
    change: (e: Partial<FormRootWidget>) => void;
  }>();

  const layout = computed({
    get() {
      return props.node.layout || 'vertical';
    },
    set(val) {
      props.change({
        layout: val,
      });
    },
  });
  const labelAlign = computed({
    get() {
      return props.node.labelAlign || 'right';
    },
    set(val) {
      props.change({
        labelAlign: val,
      });
    },
  });
</script>

<style lang="less">
  // .attr-label {
  // }
</style>
