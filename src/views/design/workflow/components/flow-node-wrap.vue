<template>
  <div
    class="node-block__wrap"
    :class="{ 'condition-block__branch': node.type === 'branch' }"
  >
    <div
      v-if="nodeType === 'branch'"
      class="node-block__arrow node-block__arrow-top"
    >
    </div>
    <ConditionBlock
      v-if="nodeType === 'condition'"
      :pre-node="preNode"
      :node="node"
    />
    <NodeBlock v-else :pre-node="preNode" :node="node"></NodeBlock>

    <div
      v-if="nextNode || node.conditionId"
      class="node-block__arrow-wrap"
      :class="{
        'node-pop-visible': popVisible,
      }"
    >
      <div
        class="node-block__arrow"
        :class="{
          'node-block__arrow-line': !nextNode,
        }"
      >
        <a-popover
          v-model:popup-visible="popVisible"
          trigger="click"
          position="rt"
        >
          <template #content>
            <nodePopContentVue @click="addFlowNode"></nodePopContentVue>
          </template>
          <a-button
            size="small"
            class="node-arrow__btn"
            type="primary"
            shape="circle"
          >
            <icon-plus />
          </a-button>
        </a-popover>
      </div>
    </div>
  </div>

  <flow-node-wrap
    v-if="nextNode"
    :pre-node="node"
    :node="nextNode"
  ></flow-node-wrap>
</template>

<script setup lang="ts" name="flow-node-wrap">
  import { computed, ref, inject, ComputedRef } from 'vue';
  import { FlowNode, FlowNodeType } from '../constant';
  import NodeBlock from './node-block.vue';
  import ConditionBlock from './condition-block.vue';
  import nodePopContentVue from './node-pop-content.vue';

  const props = defineProps<{
    preNode?: FlowNode;
    node: FlowNode;
  }>();
  const nodeType = computed(() => props.node.type);
  const popVisible = ref<boolean>(false);

  const flowNodeNextMap =
    inject<ComputedRef<Record<string, FlowNode>>>('flowNodeNextMap');
  const nextNode = computed(() => flowNodeNextMap!.value[props.node.uid]);

  const addNodeFn =
    inject<(e: FlowNode, t: FlowNodeType) => void | undefined>('addNodeFn');
  function addFlowNode(type: FlowNodeType) {
    if (addNodeFn) {
      addNodeFn(props.node, type);
    }
    popVisible.value = false;
  }
</script>

<style lang="less">
  @line-color: var(--color-neutral-3);
  @arrow-size: 8px;

  .node-block__wrap {
    display: flex;
    flex-direction: column;
    align-items: center;

    &:hover {
      .node-arrow__btn {
        opacity: 1;
      }
    }

    .node-arrow__btn {
      position: absolute;
      margin-top: calc(var(--arrow-hegiht) / 2 - @arrow-size / 4);
      margin-left: 50%;
      color: rgb(var(--arcoblue-6));
      transform: translate(-50%, -50%) scale(0.3);
      opacity: 0;
      transition: all 0.3s;
    }
  }

  .node-block__arrow-wrap {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: var(--node-width);

    &:hover {
      .node-arrow__btn {
        color: #fff;
        transform: translate(-50%, -50%) scale(1);
      }
    }
  }

  .node-pop-visible {
    .node-arrow__btn {
      display: block;
      transform: translate(-50%, -50%) scale(1) !important;
      opacity: 1;
    }
  }

  .node-block__arrow--bottom {
    position: relative;
    width: 2px;
    height: var(--arrow-hegiht);
  }

  .node-block__arrow {
    position: relative;
    width: 0;
    height: 100%;
    min-height: var(--arrow-hegiht);
    border-right: 1px solid var(--color-neutral-3);
    // background: var(--color-neutral-3);
    border-left: 1px solid var(--color-neutral-3);

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
      // &::after {
      //   display: none;
      // }
      &-top {
        height: calc(var(--arrow-hegiht) - 20px);

        &::after {
          display: none;
        }
      }
    }
  }

  .node-block__arrow-line {
    &::after {
      display: none;
    }
  }
</style>
