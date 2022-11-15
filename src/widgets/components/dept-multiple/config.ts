// import Editor from "./editor.vue";
import { InputWidget, WidgetConfig, WidgetType } from '../../types';
import { createWidgetKey } from '../../utils';

const type: WidgetType = 'dept-multiple';
export default {
  type,
  title: '部门多选',
  icon: 'icon-t-box-line',
  childrenType: [] as WidgetType[],
  defaultVal() {
    return {
      type,
      label: '部门多选',
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
