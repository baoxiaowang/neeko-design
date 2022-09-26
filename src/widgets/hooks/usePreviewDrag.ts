import { computed, nextTick, Ref } from 'vue';
import WidgetSourceMap from '@/widgets/config.index';
import DesignEventBus from 'src/utils/design-event';
import { Widget, WidgetType } from '../types';

// const iframeChannel = new DesignChannel(window);
const designEventBus = new DesignEventBus(window.parent);
export default function usePreviewDrag(node: Ref<Widget>) {
  const mapChildren = computed<Widget[]>({
    get() {
      const children = node.value.children || [];
      return [...children];
    },
    set(val: any) {
      console.log(val);
    },
  });

  async function dragEnd() {
    await nextTick();
    document.body.classList.remove('dragging');
  }
  function onAdd({ clone, newIndex }: any) {
    nextTick(() => {
      debugger;
      const newData = node.value.children![newIndex];
      designEventBus.emit('select', {
        key: newData.key,
      });
    });

    // const type: WidgetType = clone.dataset?.type;
    // const newItem = WidgetSourceMap[type].defaultVal();

    // if (node?.value?.children) {
    //   const childrenData = [...node.value.children] || [];
    //   childrenData.splice(newIndex, 1, newItem);
    //   const newData: Widget = {
    //     ...node.value,
    //     children: childrenData,
    //   };
    //   designEventBus.emit('update', newData).emit('select', {
    //     key: newItem.key,
    //   });
    // }
  }
  function dragStart() {
    document.body.classList.add('dragging');
  }
  function onUpdate({ newIndex }: any) {
    const children = node.value?.children || [];
    const current = children[newIndex];
    if (current) {
      // store.setSelectKey(current.key);
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
