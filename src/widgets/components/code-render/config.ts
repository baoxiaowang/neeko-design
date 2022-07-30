import { WidgetConfig, WidgetType } from '../../types';
import { createWidgetKey } from '../../utils';

const type: WidgetType = 'code-render';
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
      codeStyle: '',
    };
  },
} as WidgetConfig;
export default Text;
