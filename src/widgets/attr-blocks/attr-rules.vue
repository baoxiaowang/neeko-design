<template>
  <ConfigBlockVue v-if="node.rules" label="校验" class="attr-rules">
    <a-space direction="vertical">
      <a-checkbox :model-value="!!node.rules.required" @change="onChange">
        必填
      </a-checkbox>
      <a-checkbox :model-value="!!node.rules.noRepeat" @change="repateChange">
        不允许重复
      </a-checkbox>
    </a-space>
  </ConfigBlockVue>
</template>

<script setup lang="ts" name="attr-rules">
  import { FormWidget } from '../types';
  import ConfigBlockVue from '../common/config-block.vue';

  const props = defineProps<{
    node: FormWidget;
    change: (e: Partial<FormWidget>) => void;
  }>();

  function onChange(e: boolean | (string | number | boolean)[]) {
    props.change({
      rules: {
        ...props.node.rules,
        required: +e,
      },
    });
  }
  function repateChange(e: boolean | (string | number | boolean)[]) {
    props.change({
      rules: {
        ...props.node.rules,
        noRepeat: +e,
      } as any,
    });
  }
</script>

<style lang="less">
  .attr-rules {
  }
</style>
