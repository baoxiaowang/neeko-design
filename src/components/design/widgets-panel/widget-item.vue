<template>
  <div :data-type="config?.type" class="widget-item">
    <div class="widget-icon">
      <!-- <svg-icon
        color="rgb(var(--arcoblue-6))"
        :name="config?.icon"
        size="14px"
      /> -->
      <!-- <IconFont :type="config?.icon" :size="14"></IconFont> -->
      <span class="iconfont" :class="config?.icon"></span>
    </div>
    <div class="widget-name">
      {{ config?.title }}
    </div>
  </div>
</template>

<script setup lang="ts" name="widget-item">
  import { WidgetConfig } from '@/widgets/types';

  const props = defineProps<{
    config: WidgetConfig;
  }>();
  const emit = defineEmits({});
</script>

<style lang="less">
  .widget-item {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    height: 32px;
    margin-bottom: 8px;
    padding-left: 8px;
    color: var(--color-neutral-8);
    border: 1px solid var(--color-neutral-3);
    border-radius: 4px;
    cursor: move;

    &:hover {
      color: rgba(rgb(var(--arcoblue-6)), 0.7);
      color: rgb(var(--arcoblue-6));
      border-color: rgb(var(--arcoblue-5));
      border-style: dashed;
    }

    .widget-icon {
      display: flex;
      align-items: center;
      margin-right: 8px;
      color: rgb(var(--color-neutral-3));
      font-size: 14px;

      &:hover {
        color: rgb(var(--arcoblue-6));
      }
    }

    .widget-name {
      font-size: 12px;
    }
  }
</style>
