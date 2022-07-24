<template>
  <draggable
    v-model="list"
    force-fallback
    :class="{ 'child-empty': !list.length }"
    :data-key="node.key"
    item-key="key"
    ghost-class="ghost-row-item"
    :group="group"
    :style="style"
    class="root-render"
    @end="dragEnd"
    @add="onAdd"
    @dragstart="dragStart"
  >
    <template #item="{ element }">
      <component
        :is="getRenderWidget(element)"
        :node="element"
        :state="state"
        :meta="meta"
      ></component>
    </template>
  </draggable>
</template>

<script setup lang="ts" name="root-render">
  import { nextTick, toRefs } from 'vue';
  import WidgetSourceMap from '@/widgets/config.index';
  import draggable from '@/components/vue-draggable/src/vuedraggable';
  import useDraggable from '@/widgets/hooks/useDraggable';
  import { useRenderStyle } from '@/widgets/hooks/useRenderHelp';
  import { getRenderWidget } from '../../render';
  import { Widget, WidgetType } from '../../types';

  interface IPropType {
    node: Widget;
    state: any;
    meta: any;
  }
  const props = defineProps<IPropType>();
  const { node } = toRefs(props);
  const { list } = useDraggable(node);
  const style = useRenderStyle(node);
  const group = { name: 'form-widget' };

  function dragStart() {
    document.body.classList.add('dragging');
  }
  async function dragEnd() {
    await nextTick();
    document.body.classList.remove('dragging');
  }
  function onAdd({ clone, newIndex }: any) {
    const type = clone.dataset?.type as WidgetType;
    const newItem = WidgetSourceMap[type].defaultVal();
    const itemChildren = props.node.children || [];
    itemChildren.splice(newIndex, 1, newItem);
    // eslint-disable-next-line vue/no-mutating-props
    props.node.children = itemChildren;
    // const { key, children } = props.node;
    // msgPipe.emitSelf(
    //   'updateWidget',
    //   JSON.stringify({ key, children: toRaw(children), newKey: newItem.key })
    // );
  }
</script>

<style lang="less">
  .root-render {
    position: relative;
    height: 100%;

    &:empty {
      &::after {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        display: block;
        width: 100px;
        height: max-content;
        margin: auto;
        content: '添加页面元素';
      }
    }
  }
</style>
