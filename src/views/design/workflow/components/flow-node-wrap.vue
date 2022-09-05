<template>
  <div
    class="node-block__wrap"
    :class="{ 'condition-block__branch': node.type === 'branch' }"
  >
    <div v-if="preNode" class="node-block__arrow node-block__arrow-top"></div>
    <ConditionBlock
      v-if="node.type === 'condition'"
      :pre-node="preNode"
      :node="node"
    ></ConditionBlock>
    <NodeBlock v-else :pre-node="preNode" :node="node"></NodeBlock>

    <div v-if="node.type === 'branch'" class="node-block__arrow"></div>
  </div>

  <div v-if="node.next" class="node-block__next">
    <!-- 下一个节点 -->
    <flow-node-wrap :pre-node="node" :node="node.next"></flow-node-wrap>
  </div>
</template>

<script setup lang="ts" name="flow-node-wrap">
  import { FlowNode, flowNodeMap } from '../constant';
  // const emit = defineEmits();
  import NodeBlock from './node-block.vue';
  import ConditionBlock from './condition-block.vue';

  const props = defineProps<{
    preNode?: FlowNode;
    node: FlowNode;
  }>();
</script>

<style lang="less">
  @line-color: var(--color-neutral-3);
  @arrow-size: 8px;

  .node-block__wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .node-block__arrow--bottom {
    position: relative;
    width: 2px;
    height: var(--arrow-hegiht);
    background: #eee;
  }

  .node-block__arrow {
    position: relative;
    width: 2px;
    height: var(--arrow-hegiht);
    background: var(--color-neutral-3);

    &::after {
      position: absolute;
      bottom: -@arrow-size;
      display: block;
      margin-top: -50%;
      margin-left: 50%;
      border: @arrow-size solid transparent;
      border-top-color: @line-color;
      border-right-width: calc(@arrow-size / 1.4);
      border-left-width: calc(@arrow-size / 1.4);
      transform: translateX(-50%);
      content: ' ';
    }
  }

  .condition-block__branch {
    margin: 0 20px;

    .node-block__arrow {
      &::after {
        display: none;
      }

      &-top {
        height: calc(var(--arrow-hegiht) - 20px);
      }
    }
  }
</style>
