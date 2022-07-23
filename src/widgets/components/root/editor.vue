<template>
  <EditorLayout :node-key="value.key" :change="change" :node="value">
    <config-block required label="内容"> </config-block>
    <template #ext>
      <!-- <CssEditor></CssEditor> -->
    </template>
  </EditorLayout>
</template>

<script setup lang="ts" name="PageEditor">
  import ConfigBlock from '@/widgets/common/config-block.vue';
  import EditorLayout from '@/widgets/common/element-editor-layout.vue';
  // import CssEditor from 'src/components/codemirror-editor/css-editor/index.vue';
  import { FormWidget } from '@/widgets/types';

  defineProps<{
    value: FormWidget;
    change: (e: Partial<FormWidget>) => void;
  }>();
</script>

<style lang="less"></style>
