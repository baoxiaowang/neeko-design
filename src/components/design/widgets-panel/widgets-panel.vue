<template>
  <div class="widgets-panel">
    <draggable
      item-key="key"
      :list="types"
      :move="move"
      :group="group"
      class="widgets-panel__draggable"
      @end="dragEnd"
      @start="dragStart"
    >
      <template #item="{ element }">
        <WidgetItem class="widget-item" :type="element"> </WidgetItem>
      </template>
    </draggable>
  </div>
</template>

<script setup lang="ts" name="widgets-panel">
  import { WidgetType } from '@/widgets/types';
  import { onMounted, ref } from 'vue';
  import draggable from 'src/components/vue-draggable/src/vuedraggable.js';
  import WidgetItem from './widget-item.vue';

  const props = defineProps({});
  const emit = defineEmits([]);
  const types: WidgetType[] = [
    // 'form',
    'input',
    'textarea',
    'text',
    'container',
  ];
  const group = { name: 'form-widget', pull: 'clone', put: false };

  function move() {}
  function dragStart() {
    (window as any).preview?.document.body.classList.add('dragging');
  }
  function dragEnd() {
    (window as any).preview?.document.body.classList.remove('dragging');
  }
  const drag = ref(false);
</script>

<style lang="less">
  .widgets-panel {
    .widgets-panel__draggable {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin-top: 10px;
      padding: 10px;
    }

    .widget-item {
      width: calc(50% - 4px);
    }
  }
</style>
