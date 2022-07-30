import { WidgetConfig, WidgetType } from '../../types';
import { createWidgetKey } from '../../utils';

const type: WidgetType = 'textarea';
export default {
  type,
  title: '多行文本',
  icon: 'icon-input-method-line',
  childrenType: [] as WidgetType[],
  defaultVal() {
    return {
      type,
      label: '多行文本',
      key: createWidgetKey(type),
      codeStyle: '',
      config: {},
    };
  },
} as WidgetConfig;
