<template>
  <draggable
    v-model="mapChildren"
    force-fallback
    :class="{ 'child-empty': !mapChildren?.length }"
    :data-key="mapChildren"
    item-key="key"
    class="row-render"
    ghost-class="ghost-row-item"
    :group="group"
    @end="dragEnd"
    @add="Add"
    @dragstart="dragStart"
  >
    <template #item="{ element }">
      <div class="">
        <component
          :is="getRenderWidget(element)"
          :node="element"
          :state="state"
          :meta="meta"
        >
        </component>
      </div>
    </template>
  </draggable>
</template>

<script setup lang="ts" name="row-render">
  import { nextTick, toRaw, getCurrentInstance, computed } from 'vue';
  import WidgetSourceMap from '@/widgets/config.index';
  import draggable from '@/components/vue-draggable/src/vuedraggable';
  import MessagePipe from '@/message/message';
  import { CommonPropsOpt } from '../../common/widget-options';
  import { getRenderWidget } from '../../render';

  const vm = getCurrentInstance();
  const props = defineProps(CommonPropsOpt);
  const mapChildren = computed({
    get() {
      const children = props.node?.children || [];
      return [...children];
    },
    set() {
      //
    },
  });

  const msgPipe = vm!.root.data.msgPipe as MessagePipe;

  const emit = defineEmits([]);
  function dragStart() {
    document.body.classList.add('dragging');
  }
  async function dragEnd() {
    await nextTick();
    document.body.classList.remove('dragging');
  }
  const group = { name: 'form-widget' };

  function Add({ clone, newIndex }: any) {
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
    justify-content: stretch;
    width: 100%;
  }

  .design-mode {
    .row-render {
      &:empty {
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
