<template>
  <div v-if="selectedWidget" class="editor-wrap">
    <component
      :is="getEditorComp(selectedWidget.type)"
      :value="selectedWidget"
      :change="change"
    ></component>
  </div>
</template>

<script setup lang="ts" name="EditorWrap">
  import { Widget, WidgetType } from '@/widgets/types';
  import { computed } from 'vue';
  import WidgetCompMap from '@/widgets/editor.index';
  import { useDesignStore } from '@/store';

  const store = useDesignStore();
  const selectedWidget = computed(() => store.selectWidget);
  defineEmits<{
    (e: 'change'): void;
  }>();
  const change = (newWidget: Widget) => {
    store.handlerWidgetUpdate({ ...newWidget, key: selectedWidget.value?.key });
  };
  const getEditorComp = (type: WidgetType) => {
    return WidgetCompMap[type];
  };
</script>

<style lang="less">
  .editor-wrap {
    padding: 0 12px;
  }
</style>
