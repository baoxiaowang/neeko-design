import { computed, nextTick, Ref } from 'vue';
import WidgetSourceMap from '@/widgets/config.index';
import MessageChannelBus from 'src/utils/message-channel';
import { Widget, WidgetType } from '../types';

const messageChannel = new MessageChannelBus(window.parent);

export default function useDraggable(node: Ref<Widget>) {
  const mapChildren = computed<Widget[]>({
    get() {
      const children = node.value.children || [];
      return [...children];
    },
    set(val) {
      messageChannel.emit('update', {
        ...node.value,
        children: val,
      });
    },
  });

  async function dragEnd() {
    await nextTick();
    document.body.classList.remove('dragging');
  }
  function onAdd(arg: any) {
    console.log(arg);
    if (node.value.children) {
      // const newItem = node.value.children[newIndex];
      messageChannel.emit('select', {
        // eslint-disable-next-line no-underscore-dangle
        key: arg.item._underlying_vm_?.key,
      });
      messageChannel.emit('hover', {
        // eslint-disable-next-line no-underscore-dangle
        key: '',
      });
    }

    // const type: WidgetType = clone.dataset?.type;
    // const newItem = WidgetSourceMap[type].defaultVal();
    // if (node.value.children) {
    //   const childrenData = [...node.value.children] || [];
    //   childrenData.splice(newIndex, 1, newItem);
    //   messageChannel.emit('hover', {
    //     key: newItem.key,
    //   });
    //   messageChannel.emit('select', {
    //     key: newItem.key,
    //   });
    // }
  }
  function dragStart() {
    document.body.classList.add('dragging');
  }
  function onUpdate({ newIndex }: any) {
    setTimeout(() => {
      messageChannel.emit('hover', {
        key: '',
      });
    });
  }
  return {
    list: mapChildren,
    dragEnd,
    onAdd,
    dragStart,
    onUpdate,
  };
}
