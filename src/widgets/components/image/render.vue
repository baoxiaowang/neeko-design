<template>
  <div class="">
    <img :data-key="node.key" :style="style" :src="src" alt="" srcset="" />
  </div>
</template>

<script setup lang="ts" name="ImageRender">
  import { computed } from 'vue';
  import { ImageWidget } from '@/widgets/types';
  import { compileExp } from '@/widgets/utils';

  export interface Options {
    node: ImageWidget;
    state: Record<string, any>;
    meta: Record<string, any>;
  }
  const props = defineProps<Options>();

  const src = computed(() => {
    return compileExp(
      props.node.config.url,
      {
        state: props.state,
        meta: props.meta,
      },
      (error) => {
        console.error('用户表达式解析错误', error, props.node);
      }
    );
  });
  const style = computed<any>(() => {
    return {
      ...props.node.style,
    };
  });
</script>

<style lang="less"></style>
