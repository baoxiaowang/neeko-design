<template>
  <FormWidgetLayout
    :node="node"
    :node-key="node?.key"
    :data-key="node?.key"
    :label="node?.label || ''"
    :width="node.width"
    :block="node.block"
  >
    <a-textarea :rows="4" type="textarea"></a-textarea>
  </FormWidgetLayout>
</template>

<script setup lang="ts" name="textarea-render">
  import FormWidgetLayout from 'src/widgets/common/form-widget-layout.vue';
  import { InputWidget } from '../../types';

  defineProps<{
    node: InputWidget;
  }>();
</script>

<style lang="less">
  // .textarea-render {

  // }
</style>
