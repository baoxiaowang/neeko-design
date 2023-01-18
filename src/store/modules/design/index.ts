import { defineStore } from 'pinia';
import { Widget, WidgetType } from '@/widgets/types';
import { reactive } from 'vue';
import WidgetSourceMap from '@/widgets/config.index';
import { getWidgetCloned } from '@/widgets/utils';
import { Message } from '@arco-design/web-vue';
import { PageTypeEnum } from '@/api/page';
import {
  DesignState,
  defaultState,
  ToolWidgetGroupItem,
  tools,
  WidgetTreeTool,
  WidgetPanelTool,
  WidgetDataTool,
} from './types';
import * as DesignConst from './constants';

function formatData(
  widget: Widget[],
  root?: Widget
): {
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
  widget.forEach((item) => flat(item, root));
  return {
    node: reactive(res),
    parent: reactive(parentMap),
  };
}
const useDesignStore = defineStore('design', {
  state: (): DesignState => ({
    designType: PageTypeEnum.form,
    widgetList: [],
    widgetMap: reactive({}),
    widgetParentMap: reactive({}),
    // selectWidget: null,
    selectedKey: '',
    hoveredKey: '',
    addDialogShow: false,
    currentActionWidget: null,
    previewDialogShow: false,
    toolWidgetGroup: [],
    tools,
    windowType: 'pc',
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
    selectWidget(): Widget | null {
      if (this.selectedKey) {
        return this.widgetMap[this.selectedKey as string];
      }
      return null;
    },
  },

  actions: {
    getParentWidget<T extends Widget = Widget>(key: string): undefined | T {
      return this.widgetParentMap[key] as T;
    },
    // 初始化
    initState(type: PageTypeEnum, widgetList: Widget[]) {
      // let widgetList: Widget[] = [];
      let toolWidgetGroup: ToolWidgetGroupItem[] = [];
      let designTools = [WidgetTreeTool, WidgetPanelTool, WidgetDataTool];
      if (type === PageTypeEnum.form) {
        // widgetList = DesignConst.createFormData();
        toolWidgetGroup = DesignConst.toolWidgetGroupMap.form;
        designTools = [WidgetPanelTool, WidgetTreeTool, WidgetDataTool];
      } else {
        // widgetList = DesignConst.createCustomePage();
        toolWidgetGroup = DesignConst.toolWidgetGroupMap.page;
        designTools = [WidgetTreeTool, WidgetPanelTool, WidgetDataTool];
      }
      const { node, parent } = formatData(widgetList);

      const first = widgetList[0];
      const selectKey = first ? first.key : '';
      this.$patch({
        ...defaultState,
        widgetList,
        widgetMap: node,
        widgetParentMap: parent,
        selectedKey: selectKey,
        toolWidgetGroup,
        designType: type,
        tools: designTools,
      });
    },
    setSelectKey(key: string) {
      this.selectedKey = key;
      // this.selectWidget = this.widgetMap[key];
    },
    setHoverKey(k: string) {
      this.hoveredKey = k;
    },
    setSelcetWidget(data: Widget) {
      // this.selectWidget = data;
      this.selectedKey = data.key;
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
    async handlerWidgetDelete(data: Pick<Widget, 'key'>) {
      const currentParent: Widget | undefined = this.widgetParentMap[data.key];
      const index = currentParent?.children?.findIndex(
        (c) => c.key === data.key
      );
      if (index !== undefined && index > -1) {
        currentParent?.children?.splice(index, 1);
        // this.widgetMap[data.key] = null
        delete this.widgetMap[data.key];
        this.setSelectKey(currentParent?.key || '');
      }
    },
    async handlerWidgetCopy(data: Widget) {
      const currentParent: Widget | undefined = this.widgetParentMap[data.key];
      if (currentParent) {
        const children = currentParent.children || [];
        const index = children.findIndex((c) => c.key === data.key);
        const copyData: Widget = getWidgetCloned(data);
        if (index > -1) {
          const { node, parent } = formatData([copyData], currentParent);

          currentParent.children?.splice(index + 1, 0, copyData);

          Object.assign(this.widgetMap, node);
          Object.assign(this.widgetParentMap, parent);
          this.selectedKey = copyData.key;
          this.hoveredKey = copyData.key;
        }
      } else {
        Message.warning('未找到父节点');
      }
    },
    async handlerWidgetUpdate<T extends Widget = Widget>(
      data: Partial<T>,
      updateChildren = false
    ) {
      const key = data.key || this.selectedKey;
      if (!key) {
        // alert('更新节点必须传递key参数');
        throw Error('更新节点必须传递key参数');
      }
      const currentWidget = this.widgetMap[key];
      Object.assign(currentWidget, data);
      if (updateChildren) {
        const currentParent = this.widgetParentMap[key];
        const { node, parent } = formatData([currentWidget], currentParent);
        Object.assign(this.widgetMap, node);
        Object.assign(this.widgetParentMap, parent);
      }
    },
  },
});

export default useDesignStore;
