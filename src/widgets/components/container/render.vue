<template>
  <div class="container-render" :data-key="node.key">
    <component
      :is="getRenderWidget(child)"
      v-for="child in node.children"
      :key="child.key"
      :node="child"
      :state="state"
      :meta="meta"
    ></component>
  </div>
</template>

<script setup lang="ts" name="container-render">
  import { Widget } from '@/widgets/types';
  import { toRefs } from 'vue';
  import useRenderStyle from '@/widgets/hooks/useRenderStyle';
  import { getRenderWidget } from '../../render';

  const props = defineProps<{
    node: Widget;
    state: any;
    meta: any;
  }>();
  const { node } = toRefs(props);
  useRenderStyle(node);
</script>

<style lang="less">
  .design-mode {
    .container-render {
      &:empty {
        // width: 100%;
        // min-height: 60px;
        // background: #eee;
        &::after {
          display: block;
          height: 60px;
          font-size: 12px;
          line-height: 60px;
          text-align: center;
          content: '容器';
        }
      }
    }
  }

  .container-render {
  }
</style>
