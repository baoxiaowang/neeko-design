<template>
  <div class="widget-grid">
    <div v-for="t in types" :key="t" class="widget-grid-item">
      <WidgetItemCard
        :label="getLabel(t)"
        :icon="getIcon(t)"
        @click="widgetClick(t)"
      >
      </WidgetItemCard>
    </div>
  </div>
</template>

<script setup lang="ts" name="widget-grid">
  import { PropType } from 'vue';
  import WidgetSourceMap from '@/widgets/config.index';
  import { WidgetType } from '@/widgets/types';
  import WidgetItemCard from './widget-item-card.vue';

  defineProps({
    types: {
      type: Array as PropType<WidgetType[]>,
      default: () => [],
    },
  });
  const emit = defineEmits<{
    (e: 'click', t: WidgetType): void;
  }>();
  const getIcon = (type: WidgetType) => {
    return WidgetSourceMap[type]?.icon;
  };
  const getLabel = (type: WidgetType) => {
    return WidgetSourceMap[type]?.title;
  };
  const widgetClick = (t: WidgetType) => {
    emit('click', t);
  };
</script>

<style lang="less">
  .widget-grid {
    display: flex;
    flex-wrap: wrap;

    &-item {
      display: flex;
      flex-shrink: 0;
      align-items: center;
      justify-content: center;
      width: 20%;
      cursor: pointer;
    }
  }
</style>
