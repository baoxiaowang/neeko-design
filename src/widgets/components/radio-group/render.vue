<template>
  <FormWidgetLayout
    data-mark="false"
    :block="node.block"
    :width="node.width"
    :node="node"
    :data-key="node.key"
    :node-key="node.key"
    :data-type="node.type"
    class="input-render"
    :label="node?.label"
  >
    <a-radio-group direction="vertical">
      <a-radio value="A">选项一</a-radio>
      <a-radio value="B">选项二</a-radio>
      <a-radio value="C">选项三</a-radio>
    </a-radio-group>
  </FormWidgetLayout>
</template>

<script setup lang="ts" name="input-render">
  import FormWidgetLayout from 'src/widgets/common/form-widget-layout.vue';
  import { InputWidget } from '../../types';

  interface RenderProps {
    node: InputWidget;
  }
  defineProps<RenderProps>();
</script>

<style lang="less">
  // .input-render {
  // }
</style>
