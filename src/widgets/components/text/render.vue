<template>
  <p class="widget-text" :class="node.key" :data-key="node.key">
    {{ compileText }}
  </p>
</template>

<script setup lang="ts" name="text-render">
  import { Widget } from '@/widgets/types';
  import { computed, toRefs, watchEffect } from 'vue';
  import { compileExp } from '../../utils';

  const props = defineProps<{
    node: Widget;
    state: any;
    meta: any;
  }>();
  const styleText = computed<any>(() => {
    return props.node.codeStyle
      ?.toString()
      .replace(/::node/g, `[data-key=${props.node.key}]`);
  });
  const { node } = toRefs(props);
  const compileText = computed<any>(() => {
    return compileExp(
      props.node.config?.text,
      {
        state: props.state,
        meta: props.meta,
      },
      (error) => {
        // eslint-disable-next-line no-console
        console.error('用户表达式解析错误', error, props.node);
      }
    );
  });
  watchEffect(() => {
    const nodeStyle = document.querySelector(
      `style[node-hash=${props.node.key}]`
    );
    if (nodeStyle) {
      nodeStyle.textContent = styleText.value;
    } else {
      const style = document.createElement('style');
      style.setAttribute('node-hash', props.node.key);
      style.textContent = styleText.value;
      document.head.appendChild(style);
    }
  });
</script>

<style lang="less">
  .text_rLsO :hover {
    color: blue;
  }
</style>
