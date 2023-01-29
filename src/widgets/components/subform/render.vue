<!-- eslint-disable vue/no-mutating-props -->
<template>
  <!-- :data-key="node.key" -->
  <div :style="style" class="widget-subform-render">
    <div
      class="widget-subform-render__table"
      :class="{
        'widget-subform-render__table--design': isDesign,
        'widget-subform-render__table--runtime': !isDesign,
      }"
    >
      <div class="subform-index__panel">
        <div class="subform-item__cell-index subform-item__cell">
          <div class="subform-item__title subform__th"></div>
          <div
            v-for="(row, index) in modelValue"
            :key="index"
            class="subform-item__index subform__td"
          >
            {{ index + 1 }}
          </div>
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
          <component
            :is="isDesign ? 'a-resize-box' : 'div'"
            class="subform-item__cell-box"
            :width="element.subWidth || 200"
            :style="{ width: (element.subWidth || 200) + 'px' }"
            :directions="['right']"
            @update:width="(w: number)=> updateWidth(element, w)"
          >
            <div
              class="subform-item__cell subform-item__cell-widget"
              :class="{
                'subform-item__cell-widget--design': isDesign,
                'subform-item__cell-widget--active':
                  isDesign && element.key === selectKey,
              }"
              @click.stop="subWidgetClick(element)"
            >
              <div class="subform-item__title subform__th">
                {{ element.label }}
              </div>

              <div
                v-for="(row, index) in modelValue"
                :key="index"
                class="subform__td"
              >
                <component
                  :is="getRenderWidget(element)"
                  :value="modelValue[index][element.key]"
                  :node="element"
                  :state="state"
                  :meta="meta"
                  @update:value="(val: any) => changeValue(index, element.key, val)"
                />
              </div>
            </div>
          </component>
        </template>
      </VueDraggable>
    </div>

    <div v-if="!isDesign" class="subform-actions">
      <a-button class="subform-btn--add" type="text" @click="addSubRow">
        <template #icon>
          <icon-plus />
        </template>
        <template #default>添加单条</template>
      </a-button>
    </div>
  </div>
</template>

<script setup lang="ts" name="subform-render">
  import { getRenderWidget } from '@/widgets/render';
  import { nextTick, computed, toRefs, provide } from 'vue';
  import VueDraggable from '@/components/vue-draggable/src/vuedraggable';
  import { FormWidget, Widget } from '@/widgets/types';
  import useDraggable from '@/widgets/hooks/useDraggable';

  import useWidgetInject from '@/widgets/hooks/useWidgetInject';
  import { usePreviewStore } from '@/store-preview';
  import { styleToString } from '../../utils';

  const group = { name: 'form-widget' };
  const props = withDefaults(
    defineProps<{
      node: Widget;
      state: any;
      meta: any;
      value: Record<string, any>[];
    }>(),
    {
      value: () => [{}],
    }
  );
  const emit = defineEmits<{
    (e: 'update:value', val: Record<string, any>[]): void;
  }>();
  provide('isSubWidget', true);
  const store = usePreviewStore();
  const selectKey = computed(() => store.selectKey);
  const { isDesign } = useWidgetInject();
  const style = computed<any>(() => {
    return styleToString(props.node.codeStyle);
  });

  const modelValue = computed({
    get() {
      return props.value;
    },
    set(val: Record<string, any>[]) {
      emit('update:value', val);
    },
  });

  const { node } = toRefs(props);
  const { list, onUpdate, onAdd } = useDraggable(node);

  function dragStart() {
    document.body.classList.add('dragging');
  }
  async function dragEnd() {
    await nextTick();
    document.body.classList.remove('dragging');
  }
  function subWidgetClick(widget: Widget) {
    if (!isDesign) return;
    store.setSelectKey(widget.key);
  }
  const updateWidth = function updateWidth(sub: FormWidget, width: number) {
    // store.handlerWidgetUpdate({
    //   key: sub.key,
    //   subWidth: width,
    // } as FormWidget);
  };
  function changeValue(index: number, key: string, val: any) {
    const newVal = [...props.value];
    const oldRow = newVal[index];
    newVal.splice(index, 1, {
      ...oldRow,
      [key]: val,
    });
    modelValue.value = newVal;
  }
  function addSubRow() {
    const newRow = {};
    modelValue.value = [...modelValue.value, newRow];
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

  .widget-subform-render__table {
    display: flex;
    box-sizing: border-box;
    background: transparent;

    &--design {
      padding-bottom: 10px;
    }

    &--runtime {
      .subform-body__panel,
      .subform-index__panel {
        padding-bottom: 12px !important;
      }
    }

    .subform-item {
      width: 100%;
    }

    .subform-item__cell-box {
      flex-shrink: 0;

      &:first-child {
        .subform-item__cell-widget {
          border-left: 1px solid var(--color-neutral-3);
        }
      }

      &:last-child {
        .subform-item__cell-widget {
          border-right: 1px solid var(--color-neutral-3);
        }
      }
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
    }

    .subform-item__cell-index {
      width: @index-cell-width;
      background: #fff;
    }

    .subform-item__cell-box {
      .subform-item__cell-widget {
        border-right: 1px solid var(--color-neutral-3);
        pointer-events: all;

        &--design {
          border-left: 1px dashed transparent;

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
        // z-index: 101;
        position: relative;
        margin-right: 0;
        // border-right: 1px solid var(--color-neutral-3);
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

  .subform-actions {
    .subform-btn--add {
      padding: 0 6px;
    }
  }
</style>
