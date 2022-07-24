import { Widget, WidgetConfig, WidgetType } from '../../types';
import { createWidgetKey } from '../../utils';

const type: WidgetType = 'container';
export default {
  type,
  title: 'container',
  icon: 'icon-container',
  childrenType: ['container', 'text', 'image', 'row', 'column'] as WidgetType[],
  defaultVal() {
    return {
      type: 'container',
      key: createWidgetKey('container'),
      codeStyle: '',
      config: {},
    };
  },
} as WidgetConfig<Widget>;
