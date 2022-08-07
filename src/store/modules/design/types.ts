import { Widget, WidgetConfig } from '@/widgets/types';

export type Tool = {
  name: string;
  icon: {
    default: string;
    active: string;
  };
  type: 'tree' | 'widget' | 'data';
};
export const WidgetTreeTool: Tool = {
  name: '结构',
  icon: {
    default: 'icon-tree_outlined',
    active: 'icon-tree_filled',
  },
  type: 'tree',
};
export const WidgetPanelTool: Tool = {
  name: '组件',
  icon: {
    default: 'icon-grid_view_outliend',
    active: 'icon-grid_view_filled',
  },
  type: 'widget',
};
export const WidgetDataTool: Tool = {
  name: '数据',
  icon: {
    default: 'icon-database-cog-outline',
    active: 'icon-database-cog',
  },
  type: 'data',
};
export const tools: Tool[] = [WidgetTreeTool, WidgetPanelTool, WidgetDataTool];
export interface ToolWidgetGroupItem {
  label: string;
  list: WidgetConfig[];
}
export interface DesignState {
  designType: 'page' | 'form';
  tools: Tool[];
  widgetList: Widget[];
  widgetMap: Record<string, Widget>; // key索引指向自身
  widgetParentMap: Record<string, Widget | undefined>; // key索引指向自身父节点

  selectWidget: Widget | null;
  selectedKey: string;
  hoveredKey: string;
  addDialogShow: boolean; // 是否打开添加子节点的弹窗
  previewDialogShow: boolean;
  currentActionWidget: Widget | null; // 当前操作action的 widget
  toolWidgetGroup: ToolWidgetGroupItem[]; // 组件面板中的组件
  windowType: 'pc' | 'mobile'; // 设计窗口类型
}

export const defaultState: DesignState = {
  designType: 'page',
  widgetList: [],
  widgetMap: {},
  widgetParentMap: {},
  tools,

  selectWidget: null,
  selectedKey: '',
  hoveredKey: '',
  addDialogShow: false,
  previewDialogShow: false,
  currentActionWidget: null,
  toolWidgetGroup: [],
  windowType: 'pc',
};
