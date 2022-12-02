<template>
  <div :data-key="node.key" class="image-render">
    <img :preview="false" :src="src" hide-footer @load="imageLoad" />
  </div>
</template>

<script setup lang="ts" name="ImageRender">
  import { computed, toRefs } from 'vue';
  import { ImageWidget } from '@/widgets/types';
  import { compileExp } from '@/widgets/utils';
  // import { useRenderStyle } from '@/widgets/hooks/useRenderHelp';

  export interface Options {
    node: ImageWidget;
    state: Record<string, any>;
    meta: Record<string, any>;
  }
  const props = defineProps<Options>();
  const { node } = toRefs(props);
  const src = computed(() => {
    return compileExp(
      props.node.config.url,
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
  function imageLoad() {
    window.dispatchEvent(new Event('widget-update'));
  }
</script>

<style lang="less">
  .image-render {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    width: 100%;
    height: 100%;

    & > img {
      width: 100%;
      height: 100%;
    }

    .arco-image-img {
      width: 100%;
      height: 100%;
    }
  }
</style>
