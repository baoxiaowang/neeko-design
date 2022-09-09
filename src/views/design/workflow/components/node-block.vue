<template>
  <div class="node-block__warp" @click="handlerClick">
    <a-button
      v-if="node.type === 'start'"
      shape="round"
      size="large"
      type="primary"
      class="node-block__start"
    >
      <template #icon>
        <icon-user :stroke-width="6" />
      </template>
      <span class="node-start__text">发起</span>
      <icon-right />
    </a-button>
    <div v-else-if="node.type === 'end'" class="node-block--end">
      <span class="node-start__text">结束</span>
    </div>
    <div
      v-else
      class="node-block"
      :class="`node-block--${node.type}`"
      :style="`--node-color: ${flowNodeMap[node.type].color}`"
    >
      <div class="node-block__tools">
        <a-button type="primary" size="mini">
          <template #icon>
            <icon-copy />
          </template>
        </a-button>

        <a-button type="primary" size="mini" @click.stop="handleDel">
          <template #icon>
            <icon-delete />
          </template>
        </a-button>
      </div>
      <div class="node-block__title">
        <i>
          <component :is="flowNodeMap[node.type].icon"></component>
        </i>
        {{ node.title || flowNodeMap[node.type].title }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="node-block">
  import { inject } from 'vue';
  import { FlowNode, flowNodeMap } from '../constant';

  const props = defineProps<{
    preNode?: FlowNode;
    node: FlowNode;
  }>();
  const emitClick = inject<(e: FlowNode) => void>('emitClick');
  function handlerClick() {
    if (emitClick) {
      emitClick(props.node);
    }
  }
  const delNodeFn = inject<(e: FlowNode) => void>('delNodeFn');
  function handleDel() {
    if (delNodeFn) {
      delNodeFn(props.node);
    }
  }
</script>

<style lang="less">
  .node-block {
    position: relative;
    box-sizing: border-box;
    width: var(--node-width);
    height: var(--node-height);
    // padding: 6px 10px;
    background: #fff;
    // border-radius: 8px;
    box-shadow: 0 1px 4px 0 rgb(10 30 65 / 16%);
    cursor: pointer;

    &:hover {
      background-color: var(--color-neutral-2);

      .node-block__tools {
        display: block;
      }
    }

    &--branch {
      .node-block__title {
        color: var(--color-neutral-10);
      }
    }

    .node-block__tools {
      position: absolute;
      top: -24px;
      right: 0;
      z-index: 99;
      display: none;
      width: 100px;
      height: 30px;
      text-align: right;

      & > button {
        width: 22px;
        height: 22px;
        margin-right: 4px;
      }
    }
  }

  .node-block--start,
  .node-block--end {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 98px;
    height: 40px;
    color: #fff;
    font-weight: 500;
    font-size: 14px;
    border-radius: 20px;
    cursor: pointer;
  }

  .node-block--start {
    padding-left: 6px;
    background-color: rgb(87, 106, 149); //rgb(var(--arcoblue-6));
  }

  .node-block__warp {
    .node-block__start {
      width: 98px;
      height: 40px;
      border-radius: calc(40px * 0.5);
    }
  }

  .node-block--end {
    background-color: var(--color-neutral-8);
  }

  .node-start__text {
    margin: 0 2px;
  }

  .node-block__title {
    display: flex;
    align-items: center;
    height: 24px;
    padding: 0 10px;
    color: #fff;
    font-size: 12px;
    text-align: left;
    background-color: var(--node-color);

    & > i {
      margin-right: 6px;
    }
  }
</style>
