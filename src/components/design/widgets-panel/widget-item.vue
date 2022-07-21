<template>
  <div :data-type="type" class="widget-item">
    <div class="widget-icon">
      <svg-icon :name="editorConfig?.icon" size="14px" />
    </div>
    <div class="widget-name">
      {{ editorConfig?.title }}
    </div>
  </div>
</template>

<script setup lang="ts" name="widget-item">
  import WidgetEditors from '@/widgets/config.index';
  import { WidgetType } from '@/widgets/types';
  import { computed } from 'vue';

  const props = defineProps<{
    type: WidgetType;
  }>();
  const emit = defineEmits({});
  const editorConfig = computed(() => {
    return WidgetEditors[props.type];
  });
</script>

<style lang="less">
  .widget-item {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    height: 32px;
    margin-bottom: 8px;
    // padding: 0 8px;
    padding-left: 10px;
    color: #666;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    cursor: move;

    &:hover {
      color: rgba(rgb(var(--arcoblue-6)), 0.7);
      border-color: rgba(rgb(var(--arcoblue-6)), 0.7);
      border-style: dashed;
    }

    .widget-icon {
      display: flex;
      align-items: center;
      margin-right: 8px;
      color: rgb(var(--arcoblue-6));
      font-size: 12px;
    }

    .widget-name {
      font-size: 12px;
    }
  }
</style>
