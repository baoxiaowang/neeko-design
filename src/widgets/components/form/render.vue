<template>
  <div :style="style" :data-key="node.key" class="widget-form-render">
    <a-form
      :model="{}"
      auto-label-width
      :layout="node.layout || 'vertical'"
      :label-align="node.labelAlign"
    >
      <VueDraggable
        v-model="list"
        item-key="key"
        class="form-body__panel"
        ghost-class="ghost-widget-item"
        drag-class="drag-item-class"
        chosen-class="chosen-class"
        :group="group"
        tag="transition-group"
        :component-data="{
          tag: 'ul',
          type: 'transition-group',
          name: 'flip-list',
        }"
        @end="dragEnd"
        @add="onAdd"
        @update="onUpdate"
        @dragstart="dragStart"
      >
        <template #item="{ element }">
          <FormWidgetLayout
            data-mark="false"
            :block="element.block"
            :width="element.width"
            :node="element"
            :data-key="element.key"
            :node-key="element.key"
            :data-type="element.type"
            class="form-widget__item"
            :label="element?.label"
          >
            <component
              :is="getRenderWidget(element)"
              :node="element"
              :state="state"
              :meta="meta"
            />
          </FormWidgetLayout>
        </template>
      </VueDraggable>
    </a-form>
  </div>
</template>

<script setup lang="ts" name="form-render">
  import { getRenderWidget } from '@/widgets/render';
  import { onMounted, ref, nextTick, computed, toRefs } from 'vue';
  import VueDraggable from '@/components/vue-draggable/src/vuedraggable';
  import { FormRootWidget, Widget } from '@/widgets/types';
  import useDraggable from '@/widgets/hooks/useDraggable';
  import FormWidgetLayout from '@/widgets/common/form-widget-layout.vue';
  import { styleToString } from '../../utils';

  const props = defineProps<{
    node: FormRootWidget;
    state: any;
    meta: any;
  }>();

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
  .widget-form-render {
    box-sizing: border-box;
    // padding: 10px;
    background: #fff;
    // background: #f9fafc;
    // border-radius: 8px;
    .widget-form__draggable {
      padding-bottom: 20px;
    }

    .form-widget__item {
      border-radius: 4px;
    }

    .ghost-widget-item {
      width: 100%;
      // height: 50px !important;
      background: #fff !important;
      border: 1px dashed;
      border-color: rgb(var(--arcoblue-6));
      border-radius: 0;

      & > div {
        visibility: hidden;
      }
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
