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
    <a-divider orientation="left"></a-divider>
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
