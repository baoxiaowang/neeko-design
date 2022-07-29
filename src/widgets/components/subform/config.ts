// import Editor from "./editor.vue";
import { WidgetConfig, WidgetType } from '../../types';
import { createWidgetKey } from '../../utils';

const type: WidgetType = 'subform';
export default {
  type,
  // editor: Editor,
  title: '子表单',
  icon: 'icon-image',
  childrenType: ['input', 'textarea'],
  canCopy: false,
  canDel: false,
  defaultVal() {
    return {
      type,
      label: '子表单',
      key: createWidgetKey(type),
      codeStyle: '',
      config: {},
    };
  },
} as WidgetConfig;
