import { Widget } from '@/widgets/types';

export interface DesignState {
  widgetList: Widget[];
  widgetMap: Record<string, Widget>; // key索引指向自身
  widgetParentMap: Record<string, Widget | undefined>; // key索引指向自身父节点

  selectWidget: Widget | null;
  selectedKey: string;
  hoveredKey: string;
  addDialogShow: boolean; // 是否打开添加子节点的弹窗
  previewDialogShow: boolean;
  currentActionWidget: Widget | null; // 当前操作action的 widget
}

export const defaultState: DesignState = {
  widgetList: [],
  widgetMap: {},
  widgetParentMap: {},

  selectWidget: null,
  selectedKey: '',
  hoveredKey: '',
  addDialogShow: false,
  previewDialogShow: false,
  currentActionWidget: null,
};
