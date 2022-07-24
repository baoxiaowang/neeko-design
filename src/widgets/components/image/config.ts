import { WidgetConfig, WidgetType } from '../../types';
import { createWidgetKey } from '../../utils';

const type: WidgetType = 'image';
export default {
  type,
  title: '图片',
  icon: 'icon-image',
  childrenType: [] as WidgetType[],
  defaultVal() {
    return {
      type,
      key: createWidgetKey(type),
      title: '图片',
      codeStyle: '',
      config: {
        url: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
      },
    };
  },
} as WidgetConfig;
