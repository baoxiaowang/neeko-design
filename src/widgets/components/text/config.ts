import { WidgetConfig, WidgetType } from '../../types';
import { createWidgetKey } from '../../utils';

const type: WidgetType = 'text';
const Text = {
  type,
  icon: 'icon-text',
  title: '文本',
  childrenType: [] as WidgetType[],
  defaultVal() {
    return {
      type,
      key: createWidgetKey(type),
      config: {
        text: '文本',
      },
      style: {},
    };
  },
} as WidgetConfig;
export default Text;
