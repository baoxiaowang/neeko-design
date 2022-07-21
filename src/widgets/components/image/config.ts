// import Render from "./render.vue";
// import Editor from "./editor.vue";
import { WidgetConfig, WidgetType } from '../../types';
import { createWidgetKey } from '../../utils';

const type: WidgetType = 'image';
export default {
  type,
  // editor: Editor,
  title: '图片',
  icon: 'icon-image',
  childrenType: [] as WidgetType[],
  defaultVal() {
    return {
      type,
      key: createWidgetKey(type),
      title: '图片',
      style: {},
      config: {},
    };
  },
} as WidgetConfig;
