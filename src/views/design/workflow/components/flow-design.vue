<template>
  <div class="flow-design">
    <FlowNodeBlock :node="startNode"></FlowNodeBlock>
  </div>
</template>

<script setup lang="ts" name="flow-design">
  import { computed, provide, readonly } from 'vue';
  import { FlowNode, FlowNodeType } from '../constant';
  import { flowNodeAdd, flowNodeDel } from '../utils';
  import FlowNodeBlock from './flow-node-wrap.vue';

  const props = defineProps<{
    flowConfig: FlowNode[];
  }>();
  const emit = defineEmits<{
    (e: 'update:flowConfig', d: FlowNode[]): void;
    (e: 'nodeClick', d: FlowNode): void;
  }>();
  const flowNodeMap = computed<Record<string, FlowNode>>(() => {
    const map: Record<string, FlowNode> = {};
    props.flowConfig.forEach((item) => {
      map[item.uid] = item;
    });
    return map;
  });
  const flowNodeNextMap = computed<Record<string, FlowNode>>(() => {
    const map: Record<string, FlowNode> = {};
    props.flowConfig.forEach((item) => {
      map[item.preUid] = item;
    });
    return map;
  });
  const startNode = computed(() => flowNodeNextMap.value['-1']);
  provide('flowNodeMap', flowNodeMap);
  provide('flowNodeNextMap', flowNodeNextMap);
  provide('addNodeFn', (current: FlowNode, type: FlowNodeType) => {
    const newList = flowNodeAdd(props.flowConfig, current, type);
    emit('update:flowConfig', newList);
  });
  provide('emitClick', (node: FlowNode) => {
    emit('nodeClick', node);
  });
  provide('delNodeFn', (current: FlowNode) => {
    const newList = flowNodeDel(props.flowConfig, current);
    emit('update:flowConfig', newList);
  });
</script>

<style lang="less">
  .flow-design {
    --node-width: 180px;
    --node-height: 68px;
    --arrow-hegiht: 56px;
  }

  .flow-design {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 20px;
    color: var(--color-neutral-10);
  }
</style>
