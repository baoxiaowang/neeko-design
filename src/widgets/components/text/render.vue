<template>
  <span class="widget-text" :style="style" :data-key="node.key">
    {{ compileText }}
  </span>
</template>

<script setup lang="ts" name="text-render">
  import { Widget } from '@/widgets/types';
  import { computed } from 'vue';
  import { compileExp, styleToString } from '../../utils';

  const props = defineProps<{
    node: Widget;
    state: any;
    meta: any;
  }>();
  const style = computed<any>(() => {
    return styleToString(props.node.codeStyle);
  });
  const compileText = computed<any>(() => {
    return compileExp(
      props.node.config?.text,
      {
        state: props.state,
        meta: props.meta,
      },
      (error) => {
        console.error('用户表达式解析错误', error, props.node);
      }
    );
  });
</script>

<style lang="less"></style>
