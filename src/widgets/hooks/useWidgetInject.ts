import { inject } from 'vue';
import { designModeSymbol } from '../render/type';
import { DesignMode } from '../types';

export default function useWidgetInject() {
  const designMode = inject<DesignMode>(designModeSymbol, 'runtime');
  const isSubWidget = inject<boolean>('isSubWidget', false);
  const isDesign = designMode === 'design';
  return {
    designMode,
    isDesign,
    isSubWidget,
  };
}
