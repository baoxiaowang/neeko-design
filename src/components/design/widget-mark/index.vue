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
        <a-dropdown trigger="click">
          <a-button
            class="widget-node__type"
            :title="selectWidgetConfig?.title"
            type="primary"
          >
            {{ selectWidgetConfig?.title }}
          </a-button>
          <template #content>
            <a-button
              v-for="item in widgetLev"
              :key="item.key"
              class="widget-lev__dop arco-btn-size-mini arco-btn-primary"
              @click="handlerLevClick(item)"
            >
              {{ WidgetConfigs[item.type]?.title }}
            </a-button>
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
    watch,
  } from 'vue';
  import WidgetConfigs from '@/widgets/config.index';
  import { Widget, WidgetConfig, WidgetType } from '@/widgets/types';
  import DesignEventBus from 'src/utils/design-event';
  import { usePreviewStore } from '@/store-preview';

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
  const previewStore = usePreviewStore();

  const selectKey = computed<string>(() => {
    return previewStore.selectKey || '';
  });
  const selectWidget = computed<Widget | null>(() => {
    return previewStore.selectWidget;
  });

  const selectType = computed<WidgetType | undefined>(() => {
    return previewStore.selectWidget?.type;
  });
  const hoverKey = computed<string>(() => {
    return previewStore.hoveredKey || '';
  });
  const widgetLev = computed<Widget[]>(() => {
    const [_, ...arr] = previewStore.widgetLev || [];
    return arr;
  });

  const handlerLevClick = (item: Widget) => {
    previewStore.setSelectKey(item.key);
  };
  const createHoverSelectorBorder: (e: string, log: any) => Promise<IMark[]> = (
    key: string,
    log: any
  ) => {
    if (!key) return Promise.resolve([]);
    return new Promise((resolve, reject) => {
      const elArr = document.querySelectorAll<HTMLHtmlElement>(
        `[data-key=${key}]`
      );
      const arr = Array.from(elArr);
      const list: IMark[] = arr.map((el: HTMLHtmlElement) => {
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
      console.log(key, list, log);
      resolve(list);
    });
  };
  const hoverTools = () => {
    // designEventBus.emit('hover', {
    //   key: selectKey.value,
    // });
  };

  // const hoverMarkList = computed<IMark[]>(() => {
  //   if (!hoverKey.value) {
  //     return [];
  //   }
  //   const key = hoverKey.value;
  //   return createHoverSelectorBorder(key);
  // });
  // const selectMarkList = computed<IMark[]>(() => {
  //   if (!selectKey.value) {
  //     return [];
  //   }
  //   const key = selectKey.value;
  //   return createHoverSelectorBorder(key);
  // });

  const hoverMarkList = ref<IMark[]>([]);
  const selectMarkList = ref<IMark[]>([]);
  const watcher = [
    watch(
      () => previewStore.widgetList,
      async () => {
        selectMarkList.value = await createHoverSelectorBorder(
          selectKey.value,
          1
        );
        hoverMarkList.value = await createHoverSelectorBorder(
          hoverKey.value,
          2
        );
      },
      {
        flush: 'post',
      }
    ),
    watch(
      hoverKey,
      async () => {
        if (!hoverKey.value) {
          hoverMarkList.value = [];
          return;
        }
        const key = hoverKey.value;
        hoverMarkList.value = await createHoverSelectorBorder(key, 3);
      },
      {
        flush: 'post',
      }
    ),

    watch(
      selectKey,
      async () => {
        if (!selectKey.value) {
          selectMarkList.value = [];
          return;
        }
        console.log(previewStore.selectKey, '33');
        const key = selectKey.value;
        selectMarkList.value = await createHoverSelectorBorder(key, 4);
      },
      {
        flush: 'post',
      }
    ),
    watch(
      selectWidget,
      async () => {
        const arr = await createHoverSelectorBorder(selectKey.value || '', 5);
        selectMarkList.value = arr;
      },
      {
        deep: true,
        flush: 'post',
      }
    ),
  ];

  onBeforeUnmount(() => {
    watcher.forEach((w) => w());
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
      // designEventBus.emit('delete', {
      //   key: selectKey.value,
      // });
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
          previewStore.setHoverKey(targetEl?.dataset?.key);
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
          // designEventBus.emit('select', {
          //   key: targetEl?.dataset?.key,
          // });
          previewStore.setSelectKey(targetEl?.dataset?.key);
        }
      };
      rootEl.addEventListener('click', fn, false);
      onUnmounted(() => {
        rootEl?.removeEventListener('mouseover', fn);
      });
    });
  };
  function initRefreshEvent() {
    const fn = async () => {
      debugger;
      const key = selectKey.value;
      selectMarkList.value = await createHoverSelectorBorder(key, 6);
    };
    window.addEventListener('widget-update', fn);
    onBeforeUnmount(() => {
      window.removeEventListener('widget-update', fn);
    });
  }

  function initWindowResize() {
    const fn = async () => {
      selectMarkList.value = await createHoverSelectorBorder(
        selectKey.value,
        7
      );
      hoverMarkList.value = await createHoverSelectorBorder(hoverKey.value, 8);
    };
    window.addEventListener('resize', fn);
    onBeforeUnmount(() => {
      window.removeEventListener('resize', fn);
    });
  }

  initHoverObserver();
  initSelectedObserver();
  initRefreshEvent();
  initWindowResize();
</script>

<style lang="less">
  @select-color: rgb(var(--arcoblue-6));
  @hover-color: rgb(var(--arcoblue-5));

  .dragging {
    .selector,
    .hover-selector,
    .selector-tool {
      display: none !important;
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
    z-index: 99;
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

    .widget-lev__dop {
      padding: 0;
    }
  }
</style>
