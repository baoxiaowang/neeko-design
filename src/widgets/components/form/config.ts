// import Editor from "./editor.vue";
import { WidgetConfig, WidgetType } from '../../types';
import { createWidgetKey } from '../../utils';

const type: WidgetType = 'form';
export default {
  type,
  // editor: Editor,
  title: '表单',
  icon: 'icon-image',
  childrenType: ['input', 'textarea'],
  canCopy: false,
  canDel: false,
  defaultVal() {
    return {
      type,
      title: '表单',
      key: createWidgetKey(type),
      codeStyle: {},
      config: {},
    };
  },
} as WidgetConfig;
