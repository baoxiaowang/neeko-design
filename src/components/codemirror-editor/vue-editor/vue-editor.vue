<template>
  <AceEditor
    v-bind="$attrs"
    :value="value"
    class="vue-editor"
    language="html"
    :options="options"
  ></AceEditor>
</template>

<script setup lang="ts" name="VueEditor">
  import BaseEditor from '@/components/codemirror-editor/base.vue';
  import AceEditor from '@/components/ace-editor/index.vue';
  // :hint-func="hintFunc"
  const options = {
    mode: 'vue',
    lineNumbers: true,
    styleActiveLine: true,
    foldGutter: true, // 可折叠的块
  };
  // const hintFunc = (Codemirror.hint as any).css;
  defineProps<{
    value: string;
    height?: string;
  }>();
</script>

<style lang="less">
  .vue-editor {
    height: 100%;
  }
</style>
