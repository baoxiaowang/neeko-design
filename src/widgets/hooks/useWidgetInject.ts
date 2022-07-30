import { inject } from 'vue';
import { designModeSymbol } from '../render/type';
import { DesignMode } from '../types';

type WidgetInject = {
  designMode: 'design' | 'runtime';
  isDesign: boolean;
  isSubWidget: boolean;
  size: 'small' | 'medium';
};
export default function useWidgetInject(): WidgetInject {
  const designMode = inject<DesignMode>(designModeSymbol, 'runtime');
  const isSubWidget = inject<boolean>('isSubWidget', false);
  const isDesign = designMode === 'design';
  const size = isSubWidget ? 'small' : 'medium';
  return {
    designMode,
    isDesign,
    isSubWidget,
    size,
  };
}
