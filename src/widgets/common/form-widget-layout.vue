<template>
  <a-form-item
    field="name"
    class="form-widget-layout"
    :class="{ 'form-widget__active': actived }"
    :style="widthStyle"
    :label="node?.label || ''"
    @click="formWidgetClick"
  >
    <div class="widget-layout__body">
      <slot></slot>
    </div>

    <div class="form-widget__tools">
      <div class="form-widget__tool-item">
        <a-tooltip
          mini
          class="box-item"
          effect="dark"
          content="复制"
          placement="top"
        >
          <icon-copy stroke-width="5" i-copy />
        </a-tooltip>
      </div>
      <div class="tool-split"></div>

      <div class="form-widget__tool-item">
        <a-tooltip
          mini
          class="box-item"
          effect="dark"
          content="删除"
          placement="top"
        >
          <icon-delete stroke-width="5" i-del />
        </a-tooltip>
      </div>
    </div>
  </a-form-item>
</template>

<script setup lang="ts" name="form-widget-layout">
  import { useDesignStore } from '@/store';
  import { computed } from 'vue';
  import { FormWidget } from '../types';

  const store = useDesignStore();
  const props = defineProps<{
    node: FormWidget;
    nodeKey: string;
    width: string;
    block?: number;
  }>();
  // const emit = defineEmits({});
  const actived = computed(() => {
    return props.nodeKey === store.selectedKey;
  });
  const widthStyle = computed(() => {
    const width = +props.width || 100;
    const marginRight = props.block ? `${100 - width}%` : 0;
    return {
      'width': `${width}%`,
      'margin-right': marginRight,
    };
  });
  function formWidgetClick() {
    store.setSelectKey(props.node.key);
  }
</script>

<style lang="less">
  .form-widget-layout {
    position: relative;
    box-sizing: border-box;
    padding: 12px;
    background: #fff;
    border-radius: 8px;
    cursor: pointer;
    pointer-events: all;
    // &:hover {
    //   background: rgba(rgb(var(--arcoblue-6)), .1);
    // }
    .widget-layout__title {
      margin-bottom: 8px;
      font-weight: 600;
      font-size: 14px;
    }

    &:hover {
      background: #fafafb;
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
      padding: 0 4px;
      font-size: 12px;
      background: #fff;
      border-radius: 14px;
      box-shadow: 0 4px 6px #0c1f500a;

      .form-widget__tool-item {
        display: flex;
        align-items: center;
        color: #767e89;
        cursor: pointer;
        // .i-copy {
        //   &:hover {
        //     color: var(--);
        //   }
        // }
        &:hover {
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
    background: #eff3fd !important;

    .form-widget__tools {
      display: flex;
    }
  }

  .widget-layout__body {
    width: 100%;
    pointer-events: none;
  }
</style>
