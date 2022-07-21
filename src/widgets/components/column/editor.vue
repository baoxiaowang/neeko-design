<template>
  <EditorLayout :change="change" :value="value">
    <config-block required title="布局"> </config-block>
  </EditorLayout>
</template>

<script setup lang="ts" name="ColumnEditor">
  import { CommonEditorProps } from '@/widgets/common/widget-options';
  import ConfigBlock from '@/widgets/common/config-block.vue';
  import EditorLayout from '@/widgets/common/form-editor-layout.vue';

  defineProps(CommonEditorProps);
</script>

<style lang="less">
  .column-editor {
  }
</style>
