import { useDesignStore } from '@/store';
import { computed, nextTick, Ref } from 'vue';
import WidgetSourceMap from '@/widgets/config.index';
import { Widget, WidgetType } from '../types';

export default function useDraggable(node: Ref<Widget>) {
  const store = useDesignStore();
  const mapChildren = computed<Widget[]>({
    get() {
      const children = node.value.children || [];
      return [...children];
    },
    set(val) {
      store.handlerWidgetUpdate({
        key: node.value.key,
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

    if (node.value.children) {
      const childrenData = [...node.value.children] || [];
      childrenData.splice(newIndex, 1, newItem);
      store.handlerWidgetUpdate(
        {
          key: node.value.key,
          children: JSON.parse(JSON.stringify(childrenData)),
        },
        true
      );
      store.setSelectKey(newItem.key);
    }
  }
  function dragStart() {
    document.body.classList.add('dragging');
  }
  function onUpdate({ newIndex }: any) {
    const children = node.value?.children || [];
    const current = children[newIndex];
    if (current) {
      store.setSelectKey(current.key);
    }
  }
  return {
    list: mapChildren,
    dragEnd,
    onAdd,
    dragStart,
    onUpdate,
  };
}
