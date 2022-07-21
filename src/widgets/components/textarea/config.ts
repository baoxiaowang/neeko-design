import { WidgetConfig, WidgetType } from '../../types';
import { createWidgetKey } from '../../utils';

const type: WidgetType = 'textarea';
export default {
  type,
  title: '多行文本',
  icon: 'icon-text',
  childrenType: [] as WidgetType[],
  defaultVal() {
    return {
      type,
      label: '多行文本',
      key: createWidgetKey(type),
      style: {},
      config: {},
    };
  },
} as WidgetConfig;
