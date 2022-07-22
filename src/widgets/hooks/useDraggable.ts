import { useDesignStore } from '@/store';
import { computed, nextTick } from 'vue';
import WidgetSourceMap from '@/widgets/config.index';
import { Widget, WidgetType } from '../types';

export default function useDraggable(node: Widget) {
  const mapChildren = computed<Widget[]>({
    get() {
      const children = node.children || [];
      return [...children];
    },
    set(val) {
      useDesignStore().handlerWidgetUpdate({
        key: node.key,
        children: val,
      });
    },
  });

  async function dragEnd() {
    await nextTick();
    document.body.classList.remove('dragging');
  }
  function onAdd({ clone, newIndex }: any) {
    const type: WidgetType = clone.dataset?.type;
    const newItem = WidgetSourceMap[type].defaultVal();

    // eslint-disable-next-line vue/no-mutating-props
    const childrenData = node.children || [];
    childrenData.splice(newIndex, 1, newItem);
    // const { key, children } = node;
  }
  function dragStart() {
    document.body.classList.add('dragging');
  }

  return {
    list: mapChildren,
    dragEnd,
    onAdd,
    dragStart,
  };
}
