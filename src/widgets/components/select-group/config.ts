// import Editor from "./editor.vue";
import { InputWidget, WidgetConfig, WidgetType } from '../../types';
import { createWidgetKey } from '../../utils';

const type: WidgetType = 'select-group';
export default {
  type,
  title: '下拉复选',
  icon: 'icon-select-group',
  childrenType: [] as WidgetType[],
  defaultVal() {
    return {
      type,
      label: '下拉复选',
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
