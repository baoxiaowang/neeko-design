<template>
  <a-form-item
    field="name"
    v-bind="$attrs"
    class="form-widget-layout"
    :class="{
      'form-widget-layout__design': isDesign,
    }"
    :style="widthStyle"
    :label="node?.label || ''"
    :required="!!node.rules?.required"
    :hide-label="!!node.hideLabel"
  >
    <div class="widget-layout__body">
      <slot></slot>
    </div>
  </a-form-item>
</template>

<script setup lang="ts" name="form-widget-layout">
  import { computed } from 'vue';
  // import { usePreviewStore } from '@/store-preview';
  import useWidgetInject from '../hooks/useWidgetInject';
  import { FormWidget } from '../types';

  // const store = usePreviewStore();
  const props = defineProps<{
    node: FormWidget;
    nodeKey: string;
    width: string;
    block?: number;
  }>();
  const { isDesign } = useWidgetInject();
  // const actived = computed(() => {
  //   return props.nodeKey === store.selectKey;
  // });
  // const hovered = computed(() => {
  //   return props.nodeKey === store.hoveredKey;
  // });
  const widthStyle = computed(() => {
    const width = +props.width || 100;
    const marginRight = props.block ? `${100 - width}%` : 0;
    return {
      'width': `${width}%`,
      'margin-right': marginRight,
    };
  });
  // function formWidgetClick() {
  //   if (!isDesign) return;
  //   store.setSelectKey(props.node.key);
  // }
  // function deleteFormWidget() {
  //   //
  //   store.handlerWidgetDelete(props.node);
  // }
</script>

<style lang="less">
  .form-widget-layout {
    position: relative;
    box-sizing: border-box;
    margin-bottom: 0 !important;
    padding: 12px 12px;
    background: #fff;
    // transition: all 0.1s;
    .widget-layout__body {
      width: 100%;
      text-align: left;
    }

    &__design {
      &:hover {
        // background: #fafafb;
        cursor: move;
      }

      .widget-layout__body {
        pointer-events: none;
      }
    }

    // 标签
    .arco-form-item-label {
      color: #1f2d3d;
      font-weight: 600;
    }

    .form-widget__tools {
      position: absolute;
      top: 4px;
      right: 12px;
      display: flex;
      display: none;
      align-items: center;
      justify-content: space-evenly;
      width: 60px;
      height: 24px;
      padding: 0;
      font-size: 12px;
      background: #fff;
      border-radius: 14px;
      box-shadow: 0 4px 6px #0c1f500a;

      .form-widget__tool-item {
        display: flex;
        // border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50%;
        height: 100%;
        color: #767e89;
        cursor: pointer;
        transition: 1ms all;

        &--copy {
          padding-left: 4px;
        }

        &-del {
          padding-right: 4px;
        }

        &:hover {
          background-color: var(--color-neutral-2);

          [i-copy] {
            color: #00bd77;
          }

          [i-del] {
            color: #fb4b51;
          }
        }
      }

      .tool-split {
        width: 1px;
        height: 14px;
        background: #e9eaec;
        border-radius: 1px;
        content: '';
      }
    }
  }

  .form-widget__active {
    // background: #eff3fd !important;
    background: rgb(var(--arcoblue-1)) !important;

    .form-widget__tools {
      display: flex;
    }
  }
</style>
