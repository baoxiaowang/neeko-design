import { Widget } from '@/widgets/types';
import { onMounted, ref } from 'vue';
import DesignChannel, {
  KeyChangeEvent,
  SelectChangeEvent,
  WidgetChangeEvent,
} from '../design-channel';

export default function useWatchDesign() {
  const designChannel = new DesignChannel(window.parent);
  const selfChannel = new DesignChannel(window);
  const selectWidget = ref<Widget | undefined>();
  const hoverKey = ref<string>('');

  function selectKeyChange(e = '') {
    if (selectWidget.value?.key !== e) {
      selfChannel.$emit('selectKeyChange', e);
    }
  }
  function hoverKeyChange(e = '') {
    if (hoverKey.value !== e) {
      selfChannel.$emit('hoverKeyChange', e);
    }
  }

  onMounted(() => {
    if (window.parent) {
      designChannel.$on('selectChange', (e) => {
        selectWidget.value = (e as SelectChangeEvent).detail;
      });
      designChannel.$on('hoverKeyChange', (e) => {
        hoverKey.value = (e as KeyChangeEvent).detail;
      });
    }
  });
  return {
    selectWidget,
    hoverKey,
    selectKeyChange,
    hoverKeyChange,
  };
}
