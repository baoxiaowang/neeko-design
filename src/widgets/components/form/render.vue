<template>
  <div :style="style" :data-key="node.key" class="widget-form-render">
    <a-form :model="{}" :layout="layout">
      <draggable
        v-model="mapChildren"
        item-key="key"
        class="form-body__panel"
        ghost-class="ghost-item"
        :group="group"
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
          >
          </component>
        </template>
      </draggable>
    </a-form>
  </div>
</template>

<script setup lang="ts" name="form-render">
  import { getRenderWidget } from '@/widgets/render';
  import { onMounted, ref, nextTick, computed } from 'vue';
  import WidgetSourceMap from '@/widgets/config.index';
  import draggable from '@/components/vue-draggable/src/vuedraggable';
  // import draggable from 'vuedraggable';
  import { Widget, WidgetType } from '@/widgets/types';
  import { useDesignStore } from '@/store';
  import { styleToString } from '../../utils';

  const props = defineProps<{
    node: Widget;
    state: any;
    meta: any;
  }>();

  const layout = ref<'vertical'>('vertical');
  const style = computed<any>(() => {
    return styleToString(props.node.codeStyle);
  });

  const mapChildren = computed<Widget[]>({
    get() {
      const children = props.node.children || [];
      return [...children];
    },
    set(val) {
      useDesignStore().handlerWidgetUpdate({
        key: props.node.key,
        children: val,
      });
    },
  });

  function dragStart() {
    document.body.classList.add('dragging');
  }
  async function dragEnd() {
    await nextTick();
    document.body.classList.remove('dragging');
  }
  const group = { name: 'form-widget' };
  onMounted(() => {
    //
  });
  function onAdd({ clone, newIndex }: any) {
    const type: WidgetType = clone.dataset?.type;
    const newItem = WidgetSourceMap[type].defaultVal();

    // eslint-disable-next-line vue/no-mutating-props
    const childrenData = props.node.children || [];
    childrenData.splice(newIndex, 1, newItem);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { key, children } = props.node;
  }
</script>

<style lang="less">
  .widget-form-render {
    box-sizing: border-box;
    padding: 16px;
    background: #fff;
    background: #f9fafc;
    border-radius: 8px;

    .widget-form__draggable {
      padding-bottom: 20px;
    }

    .ghost-item {
      width: 100%;
      background: #fff !important;
      border: 1px dashed;
      border-color: rgb(var(--arcoblue-6));

      & > div {
        visibility: hidden;
      }
    }

    .form-body__panel {
      display: flex;
      flex-wrap: wrap;
      padding: 12px;
      background: #fff;
      border-radius: 8px;

      &:empty {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 50px 0;

        &::after {
          color: #777;
          font-weight: 600;
          content: '添加或拖拽组件到此';
        }
      }
    }
  }
</style>
