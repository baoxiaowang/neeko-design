import { computed, nextTick, Ref } from 'vue';
import WidgetSourceMap from '@/widgets/config.index';
import MessageChannelBus from 'src/utils/message-channel';
import { Widget, WidgetType } from '../types';

const messageChannelBus = new MessageChannelBus(window.parent);

let currentList: Widget[] = [];
export default function usePreviewDrag(node: Ref<Widget>) {
  const mapChildren = computed<Widget[]>({
    get() {
      const children = node.value.children || [];
      return [...children];
    },
    set(val: any) {
      messageChannelBus.emit<Widget>('update', {
        ...node.value,
        children: val,
      });
      currentList = val;
    },
  });

  async function dragEnd() {
    await nextTick();
    document.body.classList.remove('dragging');
  }
  function onAdd({ clone, newIndex }: any) {
    nextTick(() => {
      setTimeout(() => {
        const newData = currentList![newIndex];
        messageChannelBus.emit('select', {
          key: newData?.key,
        });
        messageChannelBus.emit('update', {
          ...newData,
        });
      }, 3000);
    });
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
