import { defineStore } from 'pinia';
import { InputWidget, Widget, WidgetType } from '@/widgets/types';
// eslint-disable-next-line import/no-cycle
// import router from '@/router';

import WidgetSourceMap from '@/widgets/config.index';
import { getWidgetCloned } from '@/widgets/utils';
import { DesignState, defaultState } from './types';
import { createFormData, createCustomePage } from './constants';

function formatData(widget: Widget[]): {
  node: Record<string, Widget>;
  parent: Record<string, Widget | undefined>;
} {
  const res = {} as Record<string, Widget>;
  const parentMap = {} as Record<string, Widget | undefined>;
  const flat = (node: Widget, parent?: Widget) => {
    res[node.key] = node;
    parentMap[node.key] = parent;
    if (node.children) {
      node.children.forEach((c) => {
        flat(c, node);
      });
    }
    if (node.slot && Object.keys(node.slot)) {
      Object.keys(node.slot).forEach((k) => {
        if (node.slot && node.slot[k as WidgetType]) {
          const s = node.slot[k as WidgetType];
          if (s) {
            flat(s, node);
          }
        }
      });
    }
  };
  //
  widget.forEach((item) => flat(item, undefined));
  return {
    node: res,
    parent: parentMap,
  };
}
const useDesignStore = defineStore('design', {
  state: (): DesignState => ({
    widgetList: [
      {
        type: 'form',
        key: 'form',
        codeStyle: {
          minHeight: '100vh',
        },
        children: [
          {
            label: '姓名',
            type: 'input',
            key: 'input_1',
          } as InputWidget,
          {
            label: '班级',
            type: 'input',
            key: 'input_2',
          } as InputWidget,
        ],
      },
    ],
    widgetMap: {},
    widgetParentMap: {},
    selectWidget: null,
    selectedKey: '',
    hoveredKey: '',
    addDialogShow: false,
    currentActionWidget: null,
  }),

  getters: {
    widgetLev() {
      const res: Widget[] = [];
      const getParent = (key: string) => {
        const self = this.widgetMap[key];
        let parent = this.widgetParentMap[key];
        if (self) {
          res.push(self);
        }
        while (parent) {
          res.push(parent);
          parent = this.widgetParentMap[parent.key];
        }
      };
      getParent(this.selectedKey);
      return res;
    },
  },

  actions: {
    getParentWidget<T extends Widget = Widget>(key: string): undefined | T {
      return this.widgetParentMap[key] as T;
    },
    // 初始化
    initState(type: 'form' | 'page') {
      let widgetList: Widget[] = [];
      if (type === 'form') {
        widgetList = createFormData();
      } else {
        widgetList = createCustomePage();
      }
      const { node, parent } = formatData(widgetList);
      const selectKey = widgetList[0] ? widgetList[0].key : '';
      this.$patch({
        ...defaultState,
        widgetList,
        widgetMap: node,
        widgetParentMap: parent,
        selectedKey: selectKey,
      });
    },
    setSelectKey(key: string) {
      this.selectedKey = key;
      this.selectWidget = this.widgetMap[key];
    },
    setHoverKey(k: string) {
      this.hoveredKey = k;
    },
    setSelcetWidget(data: Widget) {
      this.selectWidget = data;
      this.selectedKey = data.key;
    },
    async createPage(type: 'form' | 'page') {
      // this.$dispose('init', type);
      this.initState(type);
      // router.push({
      //   path: '/design',
      //   query: { type },
      // });
    },

    async showAddDialog(data: Widget) {
      this.currentActionWidget = data;
      this.addDialogShow = true;
    },
    async hanlderWidgetAdd(type: WidgetType) {
      const addWidget = WidgetSourceMap[type]?.defaultVal();
      if (this.currentActionWidget) {
        const children: Widget[] = this.currentActionWidget?.children || [];
        if (addWidget) {
          children.push(addWidget);
          this.currentActionWidget.children = children;
          this.addDialogShow = false;
          this.setSelcetWidget(addWidget);

          this.widgetMap[addWidget.key] = addWidget;
          this.widgetParentMap[addWidget.key] = this.currentActionWidget;
        }
      }
    },
    async handlerWidgetDelete(data: Widget) {
      const currentParent: Widget | undefined = this.widgetParentMap[data.key];
      const index = currentParent?.children?.findIndex(
        (c) => c.key === data.key
      );
      if (index && index > -1) {
        currentParent?.children?.splice(index, 1);
        // this.widgetMap[data.key] = null
        delete this.widgetMap[data.key];
      }
    },
    async handlerWidgetCopy(data: Widget) {
      const currentParent: Widget | undefined = this.widgetParentMap[data.key];
      const index = currentParent?.children?.findIndex(
        (c) => c.key === data.key
      );
      const copyData: Widget = getWidgetCloned(data);
      if (index && index > -1) {
        currentParent?.children?.splice(index + 1, 0, copyData);
        this.selectedKey = copyData.key;
        this.hoveredKey = copyData.key;
      }
    },
    async handlerWidgetUpdate<T extends Widget = Widget>(data: Partial<T>) {
      if (!data.key) throw Error('更新节点必须传递key参数');
      const currentWidget = this.widgetMap[data.key];
      Object.assign(currentWidget, data);
    },
  },
});

export default useDesignStore;
