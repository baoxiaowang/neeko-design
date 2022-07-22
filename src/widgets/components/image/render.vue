<template>
  <div :data-key="node.key" :style="style" class="image-render">
    <a-image :preview="false" :src="src" alt="" srcset="" />
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
        // eslint-disable-next-line no-console
        console.error('用户表达式解析错误', error, props.node);
      }
    );
  });
  const style = computed<any>(() => {
    return {
      ...props.node.codeStyle,
    };
  });
</script>

<style lang="less">
  .image-render {
    width: 100px;
    height: 100px;

    .arco-image-img {
      width: 100%;
      height: 100%;
    }
  }
</style>
