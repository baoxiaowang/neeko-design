<template>
  <component
    :is="getRenderWidget(node)"
    :ref="rootWidget"
    :meta="meta"
    :state="{}"
    :node="node"
  >
  </component>
</template>

<script setup lang="ts" name="RenderWidget">
  import { toRefs, ref } from 'vue';
  import { Widget } from '../types';
  import { getRenderWidget } from '../render';

  const props = defineProps<{
    node: Widget;
    meta: Record<string, any>;
  }>();

  const { node, meta } = toRefs(props);
  const rootWidget = ref<any>();
</script>

<style lang="less">
  .render-widget {
    background: red;
  }
</style>
