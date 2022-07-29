<template>
  <slot :state="state"> </slot>
</template>

<script setup lang="ts" name="render-provider" inheritAttrs="false">
  import { provide, ref } from 'vue';
  import { DesignMode, Widget } from '../types';
  import { designModeSymbol } from './type';

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
  provide(designModeSymbol, props.mode);
</script>

<style lang="less"></style>
