// import Editor from "./editor.vue";
import { WidgetConfig, WidgetType } from '../../types';
import { createWidgetKey } from '../../utils';

const type: WidgetType = 'root';
export default {
  type,
  // editor: Editor,
  icon: 'icon-page',
  title: '页面',
  childrenType: ['container', 'text', 'image', 'column', 'row'] as WidgetType[],
  defaultVal() {
    return {
      type,
      key: createWidgetKey(type),
      title: '页面',
      style: {},
      config: {},
    };
  },
} as WidgetConfig;
