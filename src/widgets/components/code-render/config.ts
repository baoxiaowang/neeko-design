import { WidgetConfig, WidgetType } from '../../types';
import { createWidgetKey } from '../../utils';

const type: WidgetType = 'code-render';
const Text = {
  type,
  icon: 'icon-code-box-line1',
  title: '代码块',
  childrenType: [] as WidgetType[],
  defaultVal() {
    return {
      type,
      key: createWidgetKey(type),
      config: {
        code: `<template>\n  <div class="demo">\n    <a-button type="primary">{{name}}</a-button>\n  </div>\n</template>\n\x3Cscript>\n  export default {\n    data(){\n      return {\n        name: '按钮',\n      }\n    },\n    created(){\n    }\n  }\n\x3C/script>\n<style>\n  .demo {\n    padding: 10px;\n  }\n</style>`,
      },
      codeStyle: '',
    };
  },
} as WidgetConfig;
export default Text;
