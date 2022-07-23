<template>
  <EditorLayout :change="change" :node="node">
    <config-block required label="布局"> </config-block>
  </EditorLayout>
</template>

<script setup lang="ts" name="RowEditor">
  import ConfigBlock from '@/widgets/common/config-block.vue';
  import EditorLayout from '@/widgets/common/element-editor-layout.vue';
  import { Widget } from '@/widgets/types';

  const props = defineProps<{
    node: Widget;
    change: (e: Partial<Widget>) => void;
  }>();
</script>

<style lang="less"></style>
