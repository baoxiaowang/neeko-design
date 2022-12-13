<template>
  <draggable
    :model-value="list"
    force-fallback
    :class="{ 'child-empty': !list.length }"
    :data-key="node.key"
    item-key="key"
    ghost-class="ghost-row-item"
    :group="group"
    class="root-render"
    @update:model-value="modelChange"
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
  import { nextTick, onMounted, toRefs } from 'vue';
  import draggable from '@/components/vue-draggable/src/vuedraggable';
  import usePreviewDrag from '@/widgets/hooks/usePreviewDrag';
  // import { useRenderStyle } from '@/widgets/hooks/useRenderHelp';
  import DesignEventBus from 'src/utils/design-event';
  import useRenderStyle from '@/widgets/hooks/useRenderStyle';
  import { getRenderWidget } from '../../render';
  import { Widget } from '../../types';

  const designEventBus = new DesignEventBus(window.parent);
  interface IPropType {
    node: Widget;
    state: any;
    meta: any;
  }
  const emit = defineEmits<{
    (e: 'widgetMounted', k: string): void;
  }>();
  const props = defineProps<IPropType>();
  const { node } = toRefs(props);
  const { list, onAdd } = usePreviewDrag(node);

  useRenderStyle(node);
  // const style = useRenderStyle(node);
  const group = { name: 'form-widget' };

  function dragStart() {
    document.body.classList.add('dragging');
  }
  async function dragEnd() {
    await nextTick();
    document.body.classList.remove('dragging');
  }

  function modelChange(val: any) {
    const newWidget: Widget = {
      ...props.node,
      children: val,
    };
    designEventBus.emit('update', newWidget);
  }
  onMounted(() => {
    emit('widgetMounted', 'root');
  });
</script>

<style lang="less">
  .design-mode {
    .root-render {
      min-height: 100vh;
    }
  }

  .root-render {
    position: relative;
    display: flex;
    flex-direction: column;
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
