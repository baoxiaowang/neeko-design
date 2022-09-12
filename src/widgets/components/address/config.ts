// import Editor from "./editor.vue";
import {
  IAddressValue,
  InputWidget,
  WidgetConfig,
  WidgetType,
} from '../../types';
import { createWidgetKey } from '../../utils';

const type: WidgetType = 'address';
export default {
  type,
  title: '地址',
  icon: 'icon-map-pin-range-line',
  childrenType: [] as WidgetType[],
  defaultVal() {
    return {
      type,
      label: '地址',
      key: createWidgetKey(type),
      codeStyle: '',
      width: '100',
      config: {},
      default: {
        type: 'custom',
        exp: '',
        linkInfo: {
          linkFormId: '',
          condition: [],
          linkField: '',
        },
      },
      placeholder: '',
      rules: {
        required: 0,
      },
      block: 0,
    };
  },
  toString(val: IAddressValue): string {
    console.log(val);
    if (!val) return '';
    return `${val.province}${val.city}${val.district}${val.address}`;
  },
} as WidgetConfig<InputWidget>;
