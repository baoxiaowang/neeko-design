<template>
  <div class="widgets-panel">
    <div
      v-for="(item, gIndex) in toolWidgetGroup"
      :key="gIndex"
      class="widget-panel__group-item"
    >
      <div class="widget__group-title">{{ item.label }}</div>
      <draggable
        item-key="key"
        :list="item.list"
        :move="move"
        :group="group"
        class="widgets-panel__draggable"
        :clone="createCloneWidget"
        @end="dragEnd"
        @start="dragStart"
      >
        <template #item="{ element, index }">
          <WidgetItem
            :config="item.list[index]"
            class="widget-item"
            :type="element"
            @click="clickWidget(element)"
          >
          </WidgetItem>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script setup lang="ts" name="widgets-panel">
  import {
    FormWidget,
    Widget,
    WidgetConfig,
    WidgetType,
  } from '@/widgets/types';
  import { computed, onMounted, ref } from 'vue';
  import draggable from 'src/components/vue-draggable/src/vuedraggable.js';
  import { useDesignStore } from '@/store';
  import widgetConfigMap from '@/widgets/config.index';
  import WidgetItem from './widget-item.vue';

  const store = useDesignStore();
  // const props = defineProps({});
  const emit = defineEmits([]);
  const types: WidgetType[] = [
    // 'form',
    'input',
    'textarea',
    'text',
    'container',
  ];
  const group = {
    name: 'form-widget',
    pull(_a: any, _b: any, c: any) {
      // const { type } = c.dataset;
      // const config = widgetConfigMap[type as WidgetType];
      return 'clone';
    },
    put: false,
  };
  const toolWidgetGroup = computed(() => store.toolWidgetGroup);
  const designType = computed(() => store.designType);
  console.log();

  function move() {}
  function dragStart() {
    (window as any).preview?.document.body.classList.add('dragging');
  }
  function dragEnd() {
    (window as any).preview?.document.body.classList.remove('dragging');
  }
  const drag = ref(false);
  function createCloneWidget(origin: WidgetConfig) {
    return origin.defaultVal();
  }
  function clickWidget(widget: WidgetConfig) {
    if (designType.value === 'form') {
      //
      const { selectWidget } = store;
      const selectParentWidget =
        store.widgetParentMap[selectWidget?.key as string];
      if (selectParentWidget) {
        const currentIndex = selectParentWidget.children?.findIndex(
          (item) => item.key === selectWidget?.key
        );
        if (currentIndex !== undefined) {
          const newWidget: Widget = widget.defaultVal();
          const itemChildren = [...(selectParentWidget.children || [])];
          itemChildren.splice(currentIndex + 1, 0, newWidget);
          store.handlerWidgetUpdate(
            {
              ...selectParentWidget,
              children: itemChildren,
            },
            true
          );
          store.setSelectKey(newWidget.key);
        }
      } else {
        //
      }
    }
  }
</script>

<style lang="less">
  .widgets-panel {
    padding: 20px 10px;

    .widget-panel__group-item {
      margin-bottom: 10px;
    }

    .widget__group-title {
      color: #1f2d3d;
      font-weight: 700;
      line-height: 22px;
    }

    .widgets-panel__draggable {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin-top: 10px;
    }

    .widget-item {
      width: calc(50% - 4px);
    }
  }
</style>
