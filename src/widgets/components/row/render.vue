<template>
  <draggable
    v-model="list"
    force-fallback
    :class="{ 'child-empty': !list?.length }"
    :data-key="node.key"
    item-key="key"
    class="row-render"
    ghost-class="ghost-row-item"
    :group="group"
    @end="dragEnd"
    @add="Add"
    @dragstart="dragStart"
  >
    <template #item="{ element }">
      <component
        :is="getRenderWidget(element)"
        :node="element"
        :state="{}"
        :meta="{}"
      >
      </component>
    </template>
  </draggable>
</template>

<script setup lang="ts" name="row-render">
  import { nextTick, computed, toRefs } from 'vue';
  import draggable from '@/components/vue-draggable/src/vuedraggable';
  import useDraggable from '@/widgets/hooks/useDraggable';
  import { Widget } from '@/widgets/types';
  import { useRenderStyle } from '@/widgets/hooks/useRenderHelp';
  import { getRenderWidget } from '../../render';

  const props = defineProps<{
    node: Widget;
  }>();
  const { node } = toRefs(props);
  const { list } = useDraggable(node);
  const style = useRenderStyle(node);
  function dragStart() {
    document.body.classList.add('dragging');
  }
  async function dragEnd() {
    await nextTick();
    document.body.classList.remove('dragging');
  }
  const group = { name: 'form-widget' };

  function Add({ clone, newIndex }: any) {
    // eslint-disable-next-line no-console
    console.log(clone, newIndex);
    // const type = clone.dataset?.type;
    // const newItem = WidgetSourceMap[type].defaultVal();
    // const _children = props.node.children || [];
    // _children.splice(newIndex, 1, newItem);
    // props.node.children = _children;
    // const { key, children } = props.node;
    // msgPipe.emitSelf(
    //   'updateWidget',
    //   JSON.stringify({ key, children: toRaw(children), newKey: newItem.key })
    // );
  }
</script>

<style lang="less" scoped>
  .row-render {
    display: flex;
    // justify-content: stretch;
    width: 100%;
    height: 100%;
  }

  .design-mode {
    .row-render {
      &:empty {
        &::after {
          content: 'row';
        }
      }

      .ghost-row-item {
        width: 20px;
        height: 100%;
        overflow: hidden;
        border: 1px solid rgb(var(--arcoblue-6));

        & > * {
          display: none;
          // visibility: hidden;
          height: 100%;
          overflow: hidden;
          opacity: 0;
        }
      }
    }

    .child-empty {
      // height: 100%;
      width: 100%;
      min-height: 60px;
      background: #e9e9e9;

      &::after {
        display: block;
        flex: 1;
        font-size: 12px;
        line-height: 60px;
        text-align: center;
        content: '可拖拽或添加子元素到此';
      }
    }
  }
</style>
