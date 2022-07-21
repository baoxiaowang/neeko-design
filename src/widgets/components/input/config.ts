// import Editor from "./editor.vue";
import { InputWidget, WidgetConfig, WidgetType } from '../../types';
import { createWidgetKey } from '../../utils';

const type: WidgetType = 'input';
export default {
  type,
  title: '单行文本',
  icon: 'icon-text',
  childrenType: [] as WidgetType[],
  defaultVal() {
    return {
      type,
      label: '单行文本',
      key: createWidgetKey(type),
      style: {},
      width: '100',
      config: {},
      default: {
        type: 'custom',
        exp: '',
        linkInfo: {
          linkFormId: '',
          condition: [],
          linkField: '',
        },
      },
      placeholder: '请输入',
      rules: {
        required: false,
      },
      block: 0,
    };
  },
} as WidgetConfig<InputWidget>;
