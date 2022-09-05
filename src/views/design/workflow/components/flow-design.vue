<template>
  <div class="flow-design">
    <FlowNodeBlock :node="flowConfig"></FlowNodeBlock>
  </div>
</template>

<script setup lang="ts" name="flow-design">
  import { FlowNode } from '../constant';
  import FlowNodeBlock from './flow-node-wrap.vue';

  const props = defineProps<{
    flowConfig: FlowNode;
  }>();
  // const emit = defineEmits();
</script>

<style lang="less">
  .flow-design {
    --node-width: 180px;
    --node-height: 80px;
    --arrow-hegiht: 80px;
  }

  .flow-design {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 20px;
  }
</style>
