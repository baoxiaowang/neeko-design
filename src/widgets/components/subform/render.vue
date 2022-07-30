<template>
  <div :style="style" :data-key="node.key" class="widget-subform-render">
    <div class="subform-index__panel">
      <div class="subform-item__cell-index subform-item__cell">
        <div class="subform-item__title subform__th"></div>
        <div class="subform-item__index subform__td">1</div>
      </div>
    </div>

    <VueDraggable
      v-model="list"
      :disabled="!isDesign"
      item-key="key"
      class="subform-body__panel"
      ghost-class="ghost-subform-item"
      chosen-class="chosen-class"
      :force-fallback="false"
      :fallback-on-body="true"
      :group="group"
      @end="dragEnd"
      @add="onAdd"
      @update="onUpdate"
      @dragstart="dragStart"
    >
      <template #item="{ element }">
        <a-resize-box
          class="subform-item__cell-box"
          style="width: 200px"
          :directions="['right']"
        >
          <!-- <template #resize-trigger>
            <div class="resizebox-demo resizebox-demo-vertical">
              <div class="resizebox-demo-line" />
            </div>
          </template> -->
          <div
            class="subform-item__cell subform-item__cell-widget"
            :class="{
              'subform-item__cell-widget--design': isDesign,
              'subform-item__cell-widget--active':
                isDesign && element.key === store.selectedKey,
            }"
            @click.stop="subWidgetClick(element)"
          >
            <div class="subform-item__title subform__th">
              {{ element.label }}
            </div>
            <div class="subform__td">
              <component
                :is="getRenderWidget(element)"
                :node="element"
                :state="state"
                :meta="meta"
              />
            </div>
          </div>
        </a-resize-box>
      </template>
    </VueDraggable>
  </div>
</template>

<script setup lang="ts" name="subform-render">
  import { getRenderWidget } from '@/widgets/render';
  import { onMounted, ref, nextTick, computed, toRefs, provide } from 'vue';
  import VueDraggable from '@/components/vue-draggable/src/vuedraggable';
  import { Widget } from '@/widgets/types';
  import useDraggable from '@/widgets/hooks/useDraggable';
  import useWidgetInject from '@/widgets/hooks/useWidgetInject';
  import { useDesignStore } from '@/store';
  import { styleToString } from '../../utils';

  const props = defineProps<{
    node: Widget;
    state: any;
    meta: any;
  }>();
  provide('isSubWidget', true);
  const { isDesign } = useWidgetInject();
  const layout = ref<'vertical'>('vertical');
  const style = computed<any>(() => {
    return styleToString(props.node.codeStyle);
  });

  const { node } = toRefs(props);
  const { list, onUpdate, onAdd } = useDraggable(node);
  const store = useDesignStore();

  function dragStart() {
    document.body.classList.add('dragging');
  }
  async function dragEnd() {
    await nextTick();
    document.body.classList.remove('dragging');
  }
  const group = { name: 'form-widget' };
  onMounted(() => {
    //
  });
  function subWidgetClick(widget: Widget) {
    debugger;
    store.setSelectKey(widget.key);
  }
</script>

<style lang="less">
  @index-cell-width: 60px;

  .resizebox-demo {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: var(--color-bg-2);
  }

  .resizebox-demo-line {
    flex: 1;
    background-color: var(--color-neutral-3);
  }

  .resizebox-demo-vertical {
    flex-direction: column;
  }

  .resizebox-demo-vertical .resizebox-demo-line {
    width: 1px;
    height: 100%;
  }

  .widget-subform-render {
    display: flex;
    box-sizing: border-box;
    // padding: 20px 24px 24px 10px;
    padding-bottom: 20px;
    // background: #fff;
    background: transparent;

    .widget-subform {
      padding-bottom: 20px;
    }

    .subform-item {
      width: 100%;
    }

    .subform-item__cell-box {
      flex-shrink: 0;
    }

    .subform-item__cell {
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      width: 100%;
      background: #fff;
      border-top: 1px solid var(--color-neutral-3);
      border-bottom: 1px solid var(--color-neutral-3);

      .subform__th {
        display: flex;
        align-items: center;
        height: 36px;
        padding: 0 6px;
        border-bottom: 1px solid var(--color-neutral-3);
      }

      .subform__td {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 40px;
        padding: 0 6px;
        border-bottom: 1px solid var(--color-neutral-3);

        &:last-child {
          border-bottom: none;
        }
      }

      &:nth-child(1) {
        // border-left: 1px solid var(--color-neutral-3);
      }
    }

    .subform-item__cell-index {
      width: @index-cell-width;
      background: #fff;
    }

    .subform-item__cell-widget {
      border: 1px solid var(--color-neutral-3);
      pointer-events: all;
      // border-left: 1px solid transparent !important;
      // border-right: 1px solid transparent !important;
      &--design {
        &:hover {
          background: #fafafb;
          border: 1px dashed rgb(var(--arcoblue-5));
          cursor: move;
        }

        .subform__td {
          pointer-events: none;
        }
      }

      &--active {
        position: relative;
        z-index: 100;
        border: 1px solid rgb(var(--arcoblue-6)) !important;
      }
    }

    .ghost-subform-item {
      height: 100%;
      background: #fff !important;
      border: 1px dashed;
      border-color: rgb(var(--arcoblue-6));
      border-radius: 0;

      & > div {
        visibility: hidden;
      }
    }

    .subform-index__panel {
      padding-bottom: 20px;

      .subform-item__cell-index {
        border-left: 1px solid var(--color-neutral-3);
      }
    }

    .subform-body__panel {
      display: flex;
      flex-wrap: nowrap;
      width: calc(100% - 60px);
      padding-right: 20px;
      padding-bottom: 20px;
      overflow-x: scroll;
      overflow-y: hidden;
      background: #fff;
      background: transparent;
      pointer-events: all;

      &:empty {
        &::after {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 200px;
          background: #fff;
          border: 1px solid var(--color-neutral-3);
          border-right: 1px solid var(--color-neutral-3);
          border-bottom: 1px solid var(--color-neutral-3);
          content: '添加或拖拽字段到此';
        }
      }
    }
  }
</style>
