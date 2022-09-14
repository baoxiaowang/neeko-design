// import Editor from "./editor.vue";
import { RadioGroupWidget, WidgetConfig, WidgetType } from '../../types';
import { createWidgetKey } from '../../utils';

const type: WidgetType = 'radio-group';
export default {
  type,
  title: '单选框组',
  icon: 'icon-radio-button-line',
  childrenType: [] as WidgetType[],
  defaultVal() {
    const data: RadioGroupWidget = {
      type,
      label: '单选框组',
      key: createWidgetKey(type),
      codeStyle: '',
      width: '100',
      config: {},
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
    return data;
  },
} as WidgetConfig<RadioGroupWidget>;
