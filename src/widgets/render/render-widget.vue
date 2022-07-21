<template>
  <PageProvider>
    <template #default="{ state }">
      <component
        :is="getRenderWidget(node)"
        :meta="meta"
        :state="state"
        :node="node"
      >
      </component>
    </template>
  </PageProvider>
</template>

<script setup lang="ts" name="RenderWidget">
  import { toRefs } from 'vue';
  import { Widget } from '../types';
  import PageProvider from './page-provider.vue';
  import { getRenderWidget } from '../render';

  const props = defineProps<{
    node: Widget;
    meta: Record<string, any>;
  }>();

  const { node, meta } = toRefs(props);
</script>

<style lang="less">
  .render-widget {
    background: red;
  }
</style>
