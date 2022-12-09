<template>
  <teleport to="body">
    <div
      v-for="(item, index) in selectMarkList"
      :key="'selector' + index"
      class="selector"
      :style="{
        top: item.top + 'px',
        left: item.left + 'px',
        width: item.width + 'px',
        height: item.height + 'px',
        borderRadius: item.borderRadius,
      }"
    >
    </div>
    <div
      v-if="firstActive"
      class="selector-tool"
      :style="{
        top: firstActive.top + 'px',
        left: firstActive.left + 'px',
        width: firstActive.width + 'px',
        height: firstActive.height + 'px',
      }"
    >
      <a-button-group
        size="mini"
        :style="toolStyle"
        class="tool-actions"
        @mouseenter="hoverTools"
      >
        <a-dropdown trigger="hover">
          <a-button
            class="widget-node__type"
            :title="selectWidgetConfig?.title"
            type="primary"
          >
            {{ selectWidgetConfig?.title }}
          </a-button>
          <template #content>
            <a-doption>Option 1</a-doption>
            <a-doption>Option 2</a-doption>
            <a-doption>Option 3</a-doption>
          </template>
        </a-dropdown>

        <a-button
          v-for="t in toolActions"
          :key="t.key"
          :title="t.title"
          type="primary"
          :icon="t.icon"
          @click="handler(t)"
        >
          <template #icon>
            <component :is="t.icon"></component>
          </template>
        </a-button>
      </a-button-group>
    </div>
    <div
      v-for="(item, index) in hoverMarkList"
      :key="'hover' + index"
      class="hover-selector"
      :style="{
        top: item.top + 'px',
        left: item.left + 'px',
        width: item.width + 'px',
        height: item.height + 'px',
        borderRadius: item.borderRadius,
      }"
    />
  </teleport>
</template>

<script setup lang="ts" name="widget-mark">
  import {
    computed,
    nextTick,
    onBeforeUnmount,
    onMounted,
    onUnmounted,
    ref,
  } from 'vue';
  import WidgetConfigs from '@/widgets/config.index';
  import { Widget, WidgetConfig, WidgetType } from '@/widgets/types';
  import DesignEventBus from 'src/utils/design-event';

  interface IMark {
    left: number;
    top: number;
    width: number;
    height: number;
    borderRadius: string;
  }

  interface ToolItem {
    key: 'add' | 'del' | 'copy';
    title: string;
    icon: string;
  }
  const designEventBus = new DesignEventBus(window.parent);

  const selectKey = ref<string>('');
  const selectType = ref<WidgetType>();
  const hoverKey = ref<string>('');

  designEventBus.on('hover', (widget) => {
    hoverKey.value = widget.key;
  });
  designEventBus.on('select', (widget) => {
    selectKey.value = widget.key;
    selectType.value = (widget as Widget).type;
    setTimeout(() => {
      selectKey.value = widget.key;
      selectType.value = (widget as Widget).type;
    }, 200);
  });
  const createHoverSelectorBorder = (elArr: HTMLHtmlElement[]) => {
    const list: IMark[] = elArr.map((el: HTMLHtmlElement) => {
      const { left, width, height } = el.getBoundingClientRect();
      const { borderRadius } = getComputedStyle(el);
      const sTop = el.offsetTop;
      return {
        left,
        top: sTop,
        width,
        height: Math.floor(height),
        borderRadius,
      };
    });
    return list;
  };
  const hoverTools = () => {
    designEventBus.emit('hover', {
      key: selectKey.value,
    });
  };
  const hoverMarkList = computed<IMark[]>(() => {
    if (!hoverKey.value) {
      return [];
    }
    const key = hoverKey.value;
    const elArr =
      document.querySelectorAll<HTMLHtmlElement>(`[data-key=${key}]`) || [];
    return createHoverSelectorBorder(Array.from(elArr));
  });
  const selectMarkList = computed<IMark[]>(() => {
    if (!selectKey.value) {
      return [];
    }
    const key = selectKey.value;
    const elArr =
      document.querySelectorAll<HTMLHtmlElement>(`[data-key=${key}]`) || [];
    return createHoverSelectorBorder(Array.from(elArr));
  });
  const selectWidgetConfig = computed<WidgetConfig | null>(() => {
    if (selectType.value) {
      return WidgetConfigs[selectType.value];
    }
    return null;
  });

  const firstActive = computed(() => {
    return selectMarkList.value[0];
  });
  const toolStyle = computed(() => {
    const first = firstActive.value;
    const { innerHeight } = window;
    const style: Record<string, any> = {
      position: 'absolute',
    };
    if (first) {
      if (innerHeight / 2 < first.top + first.height) {
        style.top = '-25px';
      } else {
        style.bottom = '-25px';
      }
      if (first.left + first.width < 90) {
        style.left = '1px';
      } else {
        style.right = '1px';
      }
      return style;
    }
    return null;
  });
  const toolActions = computed<Array<ToolItem>>(() => {
    const toolAdd: ToolItem = {
      key: 'add',
      title: '添加子节点',
      icon: 'icon-plus',
    };
    const toolCopy: ToolItem = {
      key: 'copy',
      title: '复制节点',
      icon: 'icon-copy',
    };
    const toolDel: ToolItem = {
      key: 'del',
      title: '删除节点',
      icon: 'icon-delete',
    };

    const config = { canCopy: true, canDel: true, childrenType: ['text'] };
    const { canCopy = true, canDel = true } = config || {};
    const res = [];
    if (config.childrenType?.length) {
      res.push(toolAdd);
    }
    if (canCopy) {
      res.push(toolCopy);
    }
    if (canDel) {
      res.push(toolDel);
    }
    return res;
  });
  function handler(e: ToolItem) {
    if (e.key === 'add') {
      //
      //  emitSelectKeyChange(targetEl?.dataset?.key);
    } else if (e.key === 'del') {
      //
      designEventBus.emit('delete', {
        key: selectKey.value,
      });
    } else if (e.key === 'copy') {
      //
    }
  }
  const initHoverObserver = () => {
    onMounted(() => {
      const rootEl = document;
      const hoverHandler = (e: Event) => {
        let targetEl: any = e.target;
        while (targetEl?.parentNode && !targetEl?.dataset?.key) {
          targetEl = targetEl?.parentNode;
        }
        if (!targetEl?.dataset?.key) {
          return;
        }
        if (targetEl?.dataset?.key) {
          designEventBus.emit('hover', {
            key: targetEl?.dataset?.key,
          });
        }
      };
      rootEl.addEventListener('mouseover', hoverHandler, true);
      const fn = () => {
        //
      };
      rootEl.addEventListener('mouseleave', fn);
      onUnmounted(() => {
        rootEl?.removeEventListener('mouseover', hoverHandler);
        rootEl?.removeEventListener('mouseleave', fn);
      });
    });
  };

  const initSelectedObserver = () => {
    onMounted(() => {
      const rootEl = document;
      const fn = (e: any) => {
        let targetEl = e.target;
        while (targetEl?.parentNode && !targetEl?.dataset?.key) {
          targetEl = targetEl?.parentNode;
        }
        if (!targetEl?.dataset?.key) {
          return;
        }
        e.stopImmediatePropagation();
        // 触发给iframeWrap
        if (targetEl?.dataset?.key) {
          designEventBus.emit('select', {
            key: targetEl?.dataset?.key,
          });
        }
      };
      rootEl.addEventListener('click', fn, false);
      onUnmounted(() => {
        rootEl?.removeEventListener('mouseover', fn);
      });
    });
  };
  function initRefreshEvent() {
    const fn = () => {
      const temp = selectKey.value;
      selectKey.value = '';
      nextTick(() => {
        selectKey.value = temp;
      });
    };
    window.addEventListener('widget-update', fn);
    onBeforeUnmount(() => {
      window.removeEventListener('widget-update', fn);
    });
  }

  initHoverObserver();
  initSelectedObserver();
  initRefreshEvent();
</script>

<style lang="less">
  @select-color: rgb(var(--arcoblue-6));
  @hover-color: rgb(var(--arcoblue-5));

  .dragging {
    .selector,
    .hover-selector {
      display: none;
    }
  }

  .selector,
  .hover-selector {
    position: absolute;
    z-index: 999;
    box-sizing: border-box;
    // background-color: rgba(skyblue, 0.01);
    background-color: rgba(var(--arcoblue-6), 0.01);
    border: 2px solid @select-color;
    cursor: default;
    pointer-events: none;
  }

  .hover-selector {
    background-color: rgba(var(--arcoblue-5), 0.01);
    border: 2px dotted @hover-color;
    pointer-events: none;
  }

  .selector-tool {
    position: absolute;
    display: flex;
    pointer-events: none;

    & > .tool-actions {
      pointer-events: all;
    }
  }

  .tool-actions {
    // bottom: -24px;
    // right: -2px;
    z-index: 1000;
    display: flex;
    cursor: pointer;

    .el-button--small {
      padding: 5px 8px;
    }

    .action-hidden {
      visibility: hidden;
    }

    .widget-node__type {
      // margin-right: 6px;
    }
  }
</style>
