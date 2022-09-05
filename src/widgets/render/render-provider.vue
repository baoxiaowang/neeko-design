<template>
  <slot :state="state"> </slot>
</template>

<script setup lang="ts" name="render-provider" inheritAttrs="false">
  import { provide, reactive, ref } from 'vue';
  import { DesignMode, Widget } from '../types';
  import { designModeSymbol, widgetMapSymbol } from './type';

  const props = withDefaults(
    defineProps<{
      mode: DesignMode;
      meta: Record<string, any>;
    }>(),
    {
      mode: 'design',
    }
  );
  const state = ref<Record<string, any>>({
    count: 1,
    msg: 'state-msg',
  });
  // 缓存各个组件
  const widgetMap = reactive({});
  provide(designModeSymbol, props.mode);
  provide(widgetMapSymbol, widgetMap);
</script>

<style lang="less"></style>
