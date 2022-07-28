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
    <a-checkbox-group direction="vertical">
      <a-checkbox value="1">选项一</a-checkbox>
      <a-checkbox value="2">选项二</a-checkbox>
      <a-checkbox value="3">选项三</a-checkbox>
    </a-checkbox-group>
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
