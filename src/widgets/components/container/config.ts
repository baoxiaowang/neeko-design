import { WidgetConfig, WidgetType } from '../../types';
import { createWidgetKey } from '../../utils';

const type: WidgetType = 'container';
export default {
  type,
  title: '容器',
  icon: 'icon-container',
  childrenType: ['container', 'text', 'image', 'row', 'column'] as WidgetType[],
  defaultVal() {
    return {
      type: 'container',
      key: createWidgetKey('container'),
      title: '图片',
      style: {},
      config: {},
    };
  },
} as WidgetConfig;
