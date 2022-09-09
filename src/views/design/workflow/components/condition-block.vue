<template>
  <div class="condition-block__add">
    <a-button type="outline" shape="round" @click="addBranch">
      添加分支
    </a-button>
  </div>
  <div class="condition-block">
    <div class="condition-boder boder-mark__top"></div>

    <VueDraggable
      v-model="branchList"
      tag="transition-group"
      item-key="uid"
      class="condition-block__branch-wrap"
      ghost-class="branch-item--ghost"
      drag-class="branch-item--drag"
      chosen-class=""
      :component-data="{
        tag: 'div',
        type: 'transition-group',
        name: 'flow-branch',
      }"
      @update="onUpdate"
    >
      <template #item="{ element }">
        <div class="condition-block__branch-item">
          <flowNodeWrapVue :node="element" :pre-node="node"></flowNodeWrapVue>
        </div>
      </template>
    </VueDraggable>
    <div class="condition-boder boder-mark__bottom"></div>
  </div>
</template>

<script setup lang="ts" name="condition-block">
  // const props = defineProps();
  // const emit = defineEmits();
  import { computed } from 'vue';
  import VueDraggable from '@/components/vue-draggable/src/vuedraggable';
  import { FlowNode } from '../constant';
  import flowNodeWrapVue from './flow-node-wrap.vue';
  import nodeBlockVue from './node-block.vue';

  const props = defineProps<{
    preNode?: FlowNode;
    node: FlowNode;
  }>();

  const branchList = computed({
    get: () => props.node.branchList || [],
    set(val) {
      // eslint-disable-next-line vue/no-mutating-props
      props.node.branchList = val;
    },
  });
  function addBranch() {
    // eslint-disable-next-line vue/no-mutating-props
    props.node.branchList?.push({
      preUid: props.node.uid,
      uid: `branch_${props.node.branchList.length}${1}`,
      type: 'branch',
      title: `分支${props.node.branchList.length + 1}`,
      data: {},
      conditionId: props.node.uid,
    });
  }
  function onUpdate() {
    //
  }
</script>

<style lang="less">
  .condition-block {
    position: relative;
    display: flex;
    border-top: 2px solid var(--color-neutral-3);
    border-bottom: 2px solid var(--color-neutral-3);

    .condition-block__warp {
      &:first-child {
        margin-left: 0;
      }

      &:last-child {
        margin-right: 0;
      }
    }
  }

  .condition-block__branch-item {
    display: flex;
    flex-direction: column;

    .node-block__wrap {
      &:last-child {
        flex: 1;
      }
    }
  }

  .condition-block__branch-wrap {
    display: flex;
  }

  .condition-boder {
    position: absolute;
    z-index: 99;
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 2px;

    &::before {
      display: block;
      width: calc(var(--node-width) / 2 + 19px);
      height: 4px;
      background: #f9fafc;
      content: ' ';
    }

    &::after {
      z-index: 100;
      display: block;
      width: calc(var(--node-width) / 2 + 19px);
      height: 4px;
      background: #f9fafc;
      content: ' ';
    }
  }

  .boder-mark__top {
    top: -2px;
  }

  .boder-mark__bottom {
    bottom: -2px;
  }

  .condition-block__add {
    position: relative;
    z-index: 200;
    margin-bottom: -16px;

    .arco-btn {
      padding-right: 12px;
      padding-left: 12px;
      color: var(--color-neutral-10);
      font-size: 12px;
      background-color: #fff;
      border-color: var(--color-neutral-3);
      border-width: 2px;

      &:hover {
        color: rgb(var(--arcoblue-6));
        background-color: #fff;
      }
    }
  }

  .branch-item--ghost {
    .node-block {
      background-color: transparent !important;
      border: 1px dashed rgb(var(--arcoblue-6));
    }

    .node-block__arrow {
      border-color: rgb(var(--arcoblue-6)) !important;
      border-style: dashed !important;
      opacity: 1 !important;
    }
  }

  .branch-item--drag {
    .node-block__arrow {
      opacity: 0;
    }

    .node-block {
      background: #fff;
    }
  }

  .flow-branch-move, /* 对移动中的元素应用的过渡 */
  .flow-branch-enter-active,
  .flow-branch-leave-active {
    transition: all 0.5s ease;
  }

  .flow-branch-enter-from,
  .flow-branch-leave-to {
    transform: translateY(-30px);
    opacity: 0;
  }

  /* 确保将离开的元素从布局流中删除
  以便能够正确地计算移动的动画。 */

  .flow-branch-leave-active {
    position: absolute;
  }
</style>
