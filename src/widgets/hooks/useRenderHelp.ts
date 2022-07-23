import { computed, Ref } from 'vue';
import { styleToString, codeToStyle } from '@/widgets/utils';
import { Widget } from '../types';

interface IProp {
  node: Widget;
}
export function useRenderStyle(node: Ref<Widget>) {
  const style = computed<any>(() => {
    // return styleToString(node.value.codeStyle);
    return codeToStyle(node.value.codeStyle || '');
  });
  return style;
}
export function b() {
  //
}
