<template>
  <div
    class="tree-node"
    :data-node-key="node.key"
    @mouseleave.stop="mouseleave"
    @mouseover.stop="mouseover"
  >
    <div class="node-label">{{ nodeLabel || node.type }}</div>
  </div>
</template>

<script setup lang="ts">
  import { Widget } from '@/widgets/types';
  import WidgetSourceMap from '@/widgets/config.index';
  import { computed } from 'vue';

  const props = defineProps<{
    node: Widget;
  }>();

  const emit = defineEmits<{
    (e: 'mouseleave', d: Widget): void;
    (e: 'mouseover', d: Widget): void;
  }>();

  const WidgetConfig = computed(() => {
    return WidgetSourceMap[props.node.type];
  });

  function mouseover() {
    emit('mouseover', props.node);
  }
  function mouseleave() {
    emit('mouseleave', props.node);
  }

  const nodeLabel = computed(() => {
    return WidgetConfig.value?.title || props.node.type;
  });
</script>

<style lang="less">
  .tree-node {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding-right: 5px;

    .node-label {
      font-size: 12px;
    }

    &:hover {
      .node-actions {
        display: block !important;
      }
    }

    .node-action__add {
      margin-right: 10px;
      // color: rgb(var(--arcoblue-6));
      padding: 5px;
      font-size: 14px;

      :hover {
        color: rgb(var(--arcoblue-6));
      }
    }

    .node-action__more {
      margin-left: 0;
      padding: 5px;
      transform: rotate(90deg);
    }
  }

  .widget-tree__dropdown {
    .el-dropdown-menu__item {
      padding: 5px 12px;
    }
  }

  .action-item--del {
    color: rgb(var(--red-6));

    .el-icon {
      color: rgb(var(--red-6));
    }
  }

  .drop-action-item {
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
      margin-top: 2px;
      font-size: 12px;
    }
  }
</style>
