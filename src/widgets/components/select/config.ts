// import Editor from "./editor.vue";
import { SelectWidget, WidgetConfig, WidgetType } from '../../types';
import { createWidgetKey } from '../../utils';

const type: WidgetType = 'select';
export default {
  type,
  title: '下拉单选',
  icon: 'icon-select',
  childrenType: [] as WidgetType[],
  defaultVal() {
    return {
      type,
      label: '下拉单选',
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
      options: [
        { defaultCheck: 0, label: '选项一' },
        { defaultCheck: 0, label: '选项二' },
        { defaultCheck: 0, label: '选项三' },
      ],
      placeholder: '',
      rules: {
        required: 0,
      },
      block: 0,
    };
  },
} as WidgetConfig<SelectWidget>;
