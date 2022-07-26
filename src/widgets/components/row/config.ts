import { WidgetConfig, WidgetType } from '../../types';
import { createWidgetKey } from '../../utils';

const type: WidgetType = 'row';
export default {
  type,
  title: '行',
  icon: 'icon-row',
  canDel: false,
  childrenType: ['container', 'text', 'image', 'row', 'column'] as WidgetType[],
  defaultVal() {
    return {
      type,
      key: createWidgetKey(type),
      codeStyle: '',
      config: {},
      children: [],
    };
  },
} as WidgetConfig;
