import { PropType } from 'vue';
import { Widget } from '../types';

export const CommonPropsOpt = {
  node: {
    required: true,
    type: Object as PropType<Widget>,
  },
  state: {
    required: true,
    type: Object as any,
  },
  meta: {
    required: true,
    type: Object as any,
  },
};
export interface WidgetRenderProps<T extends Widget> {
  node: T;
  state: any;
  meta: any;
}

export const CommonEditorProps = {
  value: {
    required: true,
    type: Object as PropType<Widget>,
  },
  change: {
    type: Function as PropType<(val: Widget) => void>,
  },
};
export interface IWidgetRenderProps {
  node: Widget;
  state: any;
  meta: any;
}
