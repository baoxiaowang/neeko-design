<template>
  <div :data-key="node.key" :style="style" class="image-render">
    <img :preview="false" :src="src" hide-footer />
  </div>
</template>

<script setup lang="ts" name="ImageRender">
  import { computed, toRefs } from 'vue';
  import { ImageWidget } from '@/widgets/types';
  import { compileExp } from '@/widgets/utils';
  import { useRenderStyle } from '@/widgets/hooks/useRenderHelp';
  import { Image } from '@arco-design/web-vue';

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
  const style = useRenderStyle(node);
</script>

<style lang="less">
  .image-render {
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
