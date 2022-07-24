// import Editor from "./editor.vue";
import { WidgetConfig, WidgetType } from '../../types';
import { createWidgetKey } from '../../utils';

const type: WidgetType = 'row';
export default {
  type,
  // editor: Editor,
  title: 'row',
  icon: 'icon-row',
  canDel: false,
  childrenType: ['container', 'text', 'image', 'row', 'column'] as WidgetType[],
  defaultVal() {
    return {
      type,
      key: createWidgetKey(type),
      codeStyle: '',
      config: {},
      children: [],
    };
  },
} as WidgetConfig;
