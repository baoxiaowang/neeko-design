<template>
  <p class="widget-text" :class="node.key" :data-key="node.key">
    <!-- :style="style" -->
    {{ compileText }}
  </p>
</template>

<script setup lang="ts" name="text-render">
  import { Widget } from '@/widgets/types';
  import { computed, ref, toRefs } from 'vue';
  import { useRenderStyle } from '@/widgets/hooks/useRenderHelp';
  import { compileExp, styleToString } from '../../utils';

  const props = defineProps<{
    node: Widget;
    state: any;
    meta: any;
  }>();
  // const style = computed<any>(() => {
  //   return styleToString(props.node.codeStyle);
  // });
  const { node } = toRefs(props);
  const style = useRenderStyle(node);
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
</script>

<style lang="less">
  .design-mode {
    .widget-text {
      // cursor: pointer;
    }
  }
</style>
