<template>
  <div class="node-pop-content">
    <div
      v-for="item in nodeEnum"
      :key="item"
      class="pop-content-node"
      @click="handClick(item)"
    >
      <i :style="{ color: flowNodeMap[item].color }">
        <component :is="flowNodeMap[item].icon" />
      </i>
      {{ flowNodeMap[item].title }}
    </div>
  </div>
</template>

<script setup lang="ts" name="node-pop-content">
  import { FlowNodeType, flowNodeMap } from '../constant';

  // const props = defineProps();
  const emit = defineEmits<{
    (e: 'click', d: FlowNodeType): void;
  }>();

  const nodeEnum: FlowNodeType[] = ['approve', 'condition', 'cc', 'action'];
  function handClick(item: FlowNodeType) {
    emit('click', item);
  }
</script>

<style lang="less">
  .node-pop-content {
    display: grid;
    grid-template-rows: repeat(2, 40px);
    grid-template-columns: repeat(2, 130px);
    padding-bottom: 4px;
    font-size: 14px;
    column-gap: 6px;
    row-gap: 6px;
    // font-weight: 500;
    .pop-content-node {
      display: flex;
      align-items: center;
      padding: 0 16px;
      color: var(--color-neutral-10);
      background-color: var(--color-neutral-2);
      cursor: pointer;

      i {
        margin-right: 10px;
        font-size: 18px;
      }

      &:hover {
        color: rgb(var(--arcoblue-6));
        background-color: var(--color-neutral-3);
      }
    }
  }
</style>
