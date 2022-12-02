import { WidgetConfig, WidgetType } from '../../types';
import { createWidgetKey } from '../../utils';

const type: WidgetType = 'image';
export default {
  type,
  title: '图片',
  icon: 'icon-image-add-line',
  childrenType: [] as WidgetType[],
  defaultVal() {
    return {
      type,
      key: createWidgetKey(type),
      title: '图片',
      codeStyle: '',
      config: {
        url: 'http://cdn.neeko-design.com/5b276263daea72465ce45a7f02256c6d.jpeg',
      },
    };
  },
} as WidgetConfig;
