// import Editor from "./editor.vue";
import { InputWidget, WidgetConfig, WidgetType } from '../../types';
import { createWidgetKey } from '../../utils';

const type: WidgetType = 'checkbox-group';
export default {
  type,
  title: '复选框组',
  icon: 'icon-text',
  childrenType: [] as WidgetType[],
  defaultVal() {
    return {
      type,
      label: '复选框组',
      key: createWidgetKey(type),
      codeStyle: '',
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
      placeholder: '',
      rules: {
        required: 0,
      },
      block: 0,
    };
  },
} as WidgetConfig<InputWidget>;