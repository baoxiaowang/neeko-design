<template>
  <div :style="style" :data-key="node.key" class="widget-form-render">
    <a-form :model="{}" :layout="layout">
      <draggable
        v-model="list"
        item-key="key"
        class="form-body__panel"
        ghost-class="ghost-widget-item"
        drag-class="drag-item-class"
        chosen-class="chosen-class"
        fallback-class="fallback-class"
        :force-fallback="false"
        :fallback-on-body="true"
        :group="group"
        @end="dragEnd"
        @add="onAdd"
        @update="onUpdate"
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
  import { onMounted, ref, nextTick, computed, toRefs } from 'vue';
  import WidgetSourceMap from '@/widgets/config.index';
  import draggable from '@/components/vue-draggable/src/vuedraggable';
  import { Widget, WidgetType } from '@/widgets/types';
  import useDraggable from '@/widgets/hooks/useDraggable';
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

  const { node } = toRefs(props);
  const { list, onUpdate, onAdd } = useDraggable(node);

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
</script>

<style lang="less">
  .drag-item-class {
    background: red !important;
  }

  .widget-form-render {
    box-sizing: border-box;
    padding: 10px;
    background: #fff;
    background: #f9fafc;
    // border-radius: 8px;
    .widget-form__draggable {
      padding-bottom: 20px;
    }

    .ghost-widget-item {
      width: 100%;
      height: 50px !important;
      background: #fff !important;
      border: 1px dashed;
      border-color: rgb(var(--arcoblue-6));
      border-radius: 0;

      & > div {
        visibility: hidden;
      }
    }

    .fallback-class {
      background: red !important;
    }

    .chosen-class {
      // background: red !important;
    }

    .form-body__panel {
      display: flex;
      flex-wrap: wrap;
      padding: 24px 12px;
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
