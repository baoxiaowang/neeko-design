import { computed } from 'vue';
import { styleToString } from '@/widgets/utils';
import { Widget } from '../types';

export function useRenderStyle(node: Widget) {
  const style = computed<any>(() => {
    return styleToString(node.codeStyle);
  });
  return style;
}
export function b() {
  //
}
