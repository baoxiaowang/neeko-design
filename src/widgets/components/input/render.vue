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
    <a-input :placeholder="node.placeholder"></a-input>
  </FormWidgetLayout>
</template>

<script setup lang="ts" name="input-render">
  import FormWidgetLayout from 'src/widgets/common/form-widget-layout.vue';
  import { InputWidget } from '../../types';

  interface RenderProps {
    node: InputWidget;
  }
  const props = defineProps<RenderProps>();
  const emit = defineEmits([]);
</script>

<style lang="less">
  .render {
  }

  .input-render {
  }
</style>
