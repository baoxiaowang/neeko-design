<template>
  <div :style="style" class="container-render" :data-key="node.key">
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
  import { useRenderStyle } from '@/widgets/hooks/useRenderHelp';
  import { Widget } from '@/widgets/types';
  import { getRenderWidget } from '../../render';

  const props = defineProps<{
    node: Widget;
    state: any;
    meta: any;
  }>();
  const emit = defineEmits([]);
  const style = useRenderStyle(props.node);
</script>

<style lang="less">
  .design-mode {
    .container-render {
      &:empty {
        width: 100%;
        min-height: 60px;
        background: #eee;

        &::after {
          display: block;
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
