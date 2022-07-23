// import Render from "./render";
// import Editor from "./editor.vue";
import { WidgetConfig, WidgetType } from '../../types';
import { createWidgetKey } from '../../utils';
import { formWidgetTypes } from '../../common/common';

const type: WidgetType = 'column';
export default {
  type,
  // editor: Editor,
  title: '列块',
  icon: 'icon-column',
  childrenType: ['container', 'text', 'image', 'row', 'column'].concat(
    formWidgetTypes
  ) as WidgetType[],
  defaultVal() {
    return {
      type,
      key: createWidgetKey(type),
      title: '列块',
      codeStyle: {},
      config: {},
    };
  },
} as WidgetConfig;
