<template>
  <a-textarea
    class="textarea-render"
    :class="{ 'textarea-render--sub': isSubWidget }"
    :rows="4"
    type="textarea"
  ></a-textarea>
</template>

<script setup lang="ts" name="textarea-render">
  import useWidgetInject from '@/widgets/hooks/useWidgetInject';
  import { InputWidget } from '../../types';

  const { isSubWidget } = useWidgetInject();
  defineProps<{
    node: InputWidget;
  }>();
</script>

<style lang="less">
  .textarea-render {
    .arco-textarea {
      min-height: 76px;
    }
  }

  .textarea-render--sub {
    .arco-textarea {
      height: 28px;
      min-height: 28px;
    }
  }
</style>
