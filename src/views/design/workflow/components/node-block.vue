<template>
  <div class="node-block">
    <div class="node-block__title">
      {{ node.title || flowNodeMap[node.type].title }}
    </div>
  </div>
</template>

<script setup lang="ts" name="node-block">
  import { FlowNode, flowNodeMap } from '../constant';

  const props = defineProps<{
    preNode?: FlowNode;
    node: FlowNode;
  }>();
</script>

<style lang="less">
  .node-block {
    box-sizing: border-box;
    width: var(--node-width);
    height: var(--node-height);
    padding: 6px 10px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 1px 4px 0 rgb(10 30 65 / 16%);
    cursor: pointer;

    &:hover {
      background-color: var(--color-neutral-2);
    }
  }
</style>
