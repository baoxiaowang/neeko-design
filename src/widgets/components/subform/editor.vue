<template>
  <div class="editor">333 </div>
</template>

<script setup lang="ts" name="editor">
  import { FormWidget } from '@/widgets/types';

  defineProps<{
    value: FormWidget;
    change: (e: Partial<FormWidget>) => void;
  }>();
</script>

<style lang="less">
  .editor {
  }
</style>
