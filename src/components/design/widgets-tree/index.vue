<template>
  <div class="widgets-tree">
    <a-input-search
      v-model="searchKey"
      size="medium"
      placeholder="输入标题/唯一标识"
      style="max-width: 240px; margin-bottom: 8px"
    />
    <!-- v-model:expanded-keys="expandedKeys" -->
    <a-tree
      ref="treeRef"
      v-model:selected-keys="selectWidgetProps"
      size="mini"
      block-node
      draggable
      :data="page"
      :show-line="true"
      :default-expand-selected="true"
      :default-expanded-keys="defaltExpanded"
      :allow-drop="allowDrop"
      @select="handleNodeClick"
      @drag-start="dragStart"
      @drop="onDrop"
    >
      <template #drag-icon></template>
      <template #title="data">
        <TreeNode :actived="data.key === selectKey" :node="data" :data="data">
        </TreeNode>
      </template>
      <template #extra="nodeData">
        <div class="widget-node-action">
          <a-button type="text" size="mini" @click="onAdd(nodeData)">
            <IconPlus />
          </a-button>
          <a-dropdown @select="(type: any) => handleSelect(type, nodeData)">
            <a-button type="text" size="mini">
              <IconMoreVertical />
            </a-button>
            <template #content>
              <a-doption value="copy">复制</a-doption>
              <a-doption value="del">删除</a-doption>
            </template>
          </a-dropdown>
        </div>
      </template>
    </a-tree>
  </div>
</template>

<script setup lang="ts" name="WidgetsTree">
  import { useDesignStore } from '@/store';
  import { Widget, WidgetType } from '@/widgets/types';
  import {
    computed,
    ref,
    watchEffect,
    onMounted,
    onUnmounted,
    watch,
    nextTick,
  } from 'vue';
  import TreeNode from './tree-node.vue';

  const store = useDesignStore();
  const searchKey = ref('');

  const handleNodeClick = ([selectKey]: Array<string | number>) => {
    store.setSelectKey(selectKey.toString());
  };
  const selectWidgetProps = computed({
    get() {
      return [store.selectedKey];
    },
    set(keys: Array<string | number>) {
      const [item = ''] = keys;
      store.setSelectKey(item.toString());
    },
  });
  const defaltExpanded = ref<Array<string | number>>([]);
  const treeRef = ref<any>(null);
  // watchEffect(() => {});
  watch(
    () => store.selectedKey,
    () => {
      const { widgetLev } = store;
      const arr = [...widgetLev];
      arr.shift();
      arr.forEach((item) => {
        treeRef.value?.expandNode(item.key, true);
      });
    }
  );

  // 选中当前节点并且开启新增弹窗
  function onAdd(nodeData: Widget) {
    store.setSelcetWidget(nodeData);
    store.showAddDialog(nodeData);
  }

  function searchData(keyword: string) {
    const loop = (data: Widget[]) => {
      const result: Widget[] = [];
      data.forEach((item: Widget) => {
        if (item.key.toLowerCase().indexOf(keyword.toLowerCase()) > -1) {
          result.push({ ...item });
        } else if (item.children) {
          const filterData = loop(item.children);
          if (filterData.length) {
            result.push({
              ...item,
              children: filterData,
            });
          }
        }
      });
      return result;
    };

    return loop(store.widgetList);
  }
  const widgetData = computed<Widget[]>(() => {
    if (!searchKey.value) return store.widgetList;
    return searchData(searchKey.value);
  });
  function handleSelect(type: 'copy' | 'del', node: Widget) {
    if (type === 'copy') {
      // console.log(node);
      store.handlerWidgetCopy(node);
    } else {
      store.handlerWidgetDelete(node);
    }
  }

  const selectKey = computed(() => store.selectedKey);

  const widgetTree = ref(null);
  // const page = ref([
  //   {
  //     key: 'root',
  //     type: 'root',
  //     children: [
  //       {
  //         key: 'text_1',
  //         type: 'image',
  //       },
  //       {
  //         key: 'text_2',
  //         type: 'text',
  //       },
  //     ],
  //   },
  // ]);
  const page = computed(() => {
    function format(node: Widget) {
      const slotChildren: Widget[] = [];
      if (node.slot && Object.keys(node.slot).length) {
        Object.keys(node.slot).forEach((k) => {
          if (node.slot) {
            if (node.slot[k as WidgetType]) {
              slotChildren.push();
            }
          }
        });
      }

      const children = node.children || [];
      const childWidgets: Widget[] = [...slotChildren, ...children].map((i) =>
        format(i)
      );
      return {
        ...node,
        childWidgets,
      };
    }
    return widgetData.value.map((item) => format(item));
  });
  const dragKey = ref('');
  function allowDrop({ dropNode, dropPosition }: any) {
    const dropKey = dropNode.key;
    const parentNode = store.widgetParentMap[dragKey.value];
    const children = parentNode?.children || [];

    // 不能拖成子集，且只能在同级拖拽
    return dropPosition !== 0 && children.some((item) => item.key === dropKey);
  }
  function dragStart(event: any) {
    const { nodeKey } = event.target.querySelector('.tree-node')?.dataset || {};
    dragKey.value = nodeKey;
    // store.setSelectKey('');
  }
  function onDrop({ dragNode, dropNode, dropPosition }: any) {
    console.log(dragNode.key, dropNode.key, dropPosition, '##');
    const parent = store.widgetParentMap[dragNode.key];
    const dragIndex = parent?.children?.findIndex(
      (item) => item.key === dragNode.key
    );

    if (parent?.children && dragIndex !== undefined) {
      const newChildren = [...parent?.children];
      // newChildren.splice(dragIndex, 1);
      // 放到了目标上面
      // if (dropPosition === -1) {
      //   console.log('放到了上面');
      //   newChildren.splice(dropIndex, 0, dragNode);
      //   newChildren.splice(dragIndex + 1, 1);
      // } else if (dropPosition === 1) {
      //   console.log('放到了下面');
      //   newChildren.splice(dropIndex + 1, 0, dragNode);
      //   newChildren.splice(dragIndex, 1);
      // }
      newChildren.splice(dragIndex, 1);
      const dropIndex = newChildren.findIndex(
        (item) => item.key === dropNode.key
      );
      newChildren.splice(
        dropPosition < 0 ? dropIndex : dropIndex + 1,
        0,
        dragNode
      );
      console.log(newChildren.map((item) => item.key));
      store.handlerWidgetUpdate({
        ...parent,
        children: newChildren,
      });
      store.setSelectKey(parent.key);
      nextTick(() => {
        store.setSelectKey(dragNode.key);
      });
    }

    // console.log(dragNode.key, dropNode.key);
    // const treeData = page.value;
    // const loop = (data: Widget[], key: string, callback: any) => {
    //   data.some((item, index, arr) => {
    //     if (item.key === key) {
    //       callback(item, index, arr);
    //       return true;
    //     }
    //     if (item.children) {
    //       return loop(item.children, key, callback);
    //     }
    //     return false;
    //   });
    // };

    // loop(treeData, dragNode.key, (_: any, index: any, arr: any) => {
    //   // const parent = store.widgetParentMap;
    //   // const children = parent.children || [];
    //   // children.splice(index, 1);
    //   arr.splice(index, 1);
    // });
    // if (dropPosition === 0) {
    //   loop(treeData, dropNode.key, (item: any) => {
    //     item.children = item.children || [];
    //     item.children.push(dragNode);
    //   });
    // } else {

    // loop(treeData, dropNode.key, (_: any, index: any, arr: any) => {
    //   arr.splice(dropPosition < 0 ? index : index + 1, 0, dragNode);
    // });
    // }
  }

  watchEffect(() => {
    (widgetTree.value as any)?.setCurrentKey(selectKey.value);
  });

  const initHoverObserver = () => {
    const hoverHandler = (e: any) => {
      let targetEl = e.target;
      while (targetEl?.parentNode && !targetEl?.dataset?.key) {
        targetEl = targetEl?.parentNode;
      }
      if (!targetEl?.dataset?.key) {
        return;
      }
      store.setHoverKey(targetEl?.dataset?.key);
    };
    const leaveHandler = () => {
      store.setHoverKey('');
    };
    (widgetTree.value as any)?.$el.addEventListener(
      'mouseover',
      hoverHandler,
      true
    );
    (widgetTree.value as any)?.$el.addEventListener(
      'mouseleave',
      leaveHandler,
      true
    );
    onUnmounted(() => {
      (widgetTree.value as any)?.$el?.removeEventListener(
        'mouseover',
        hoverHandler
      );
      (widgetTree.value as any)?.$el?.removeEventListener(
        'mouseleave',
        leaveHandler
      );
    });
  };

  onMounted(() => {
    initHoverObserver();
  });
</script>

<style lang="less">
  .widgets-tree {
    margin-top: 8px;
    // padding-left: 2px;
    padding: 0 6px;

    .arco-tree-node-switcher {
      // margin-right: 2px;
    }

    .arco-tree-node-indent {
      .arco-tree-node-indent-block {
        width: 6px;
      }
    }

    .el-tree-node__content {
      display: flex;
      align-items: center;
      width: auto;

      .tree-node {
        flex: 1;
      }
    }

    .widget-node-action {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 48px;
      margin: 0 2px;

      .arco-btn {
        padding: 5px;
        line-height: 1;
      }
    }
  }
</style>
