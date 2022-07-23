<template>
  <BaseEditor
    v-bind="$attrs"
    :value="value"
    class="css-editor"
    :options="options"
    :hint-func="hintFunc"
  ></BaseEditor>
</template>

<script setup lang="ts" name="CssEditor">
  import BaseEditor from '@/components/codemirror-editor/base.vue';
  import Codemirror from 'codemirror';
  import './hint/css-hint';

  const options = {
    mode: 'css',
  };
  const hintFunc = (Codemirror.hint as any).css;
  defineProps<{
    value: string;
  }>();
</script>

<style lang="less">
  .css-editor {
    height: 100%;
  }
</style>
