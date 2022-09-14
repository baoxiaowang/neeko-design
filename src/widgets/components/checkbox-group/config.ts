// import Editor from "./editor.vue";
import { CheckboxGroupWidget, WidgetConfig, WidgetType } from '../../types';
import { createWidgetKey } from '../../utils';

const type: WidgetType = 'checkbox-group';
export default {
  type,
  title: '复选框组',
  icon: 'icon-checkbox-multiple-line',
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
      },
      placeholder: '',
      rules: {
        required: 0,
      },
      block: 0,
      optionConfig: {
        options: [
          { defaultCheck: 0, label: '选项一' },
          { defaultCheck: 0, label: '选项二' },
          { defaultCheck: 0, label: '选项三' },
        ],
        direction: 'vertical',
      },
    };
  },
} as WidgetConfig<CheckboxGroupWidget>;
