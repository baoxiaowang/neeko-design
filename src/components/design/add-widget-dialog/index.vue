<template>
  <a-modal
    v-model:visible="dialogVisible"
    :close-on-click-modal="false"
    title="新增组件"
    width="450px"
    draggable
    :align-center="false"
    top="20vh"
  >
    <WidgetGrid :types="childrenType" @click="handlerClick"></WidgetGrid>
    <template #footer>
      <span class="dialog-footer">
        <a-button @click="dialogVisible = false">取消</a-button>
        <!-- <a-button type="primary" @click="dialogVisible = false">确认</a-button> -->
      </span>
    </template>
  </a-modal>
</template>

<script setup lang="ts" name="add-widget-dialog">
  import { computed } from 'vue';
  import WidgetSourceMap from '@/widgets/config.index';
  import { WidgetType } from '@/widgets/types';
  import WidgetGrid from './widget-grid.vue';

  const props = defineProps<{
    show: boolean;
    currentType?: WidgetType;
  }>();
  const emit = defineEmits<{
    (e: 'update:show', s: boolean): void;
    (e: 'onSubmit', s: WidgetType): void;
  }>();
  const dialogVisible = computed({
    get() {
      return props.show;
    },
    set(show) {
      emit('update:show', show);
    },
  });

  const childrenType = computed(() => {
    if (!props.currentType) return [];
    return WidgetSourceMap[props.currentType]?.childrenType || [];
  });
  const handlerClick = (type: WidgetType) => {
    dialogVisible.value = false;
    emit('onSubmit', type);
  };
</script>

<style lang="less"></style>
