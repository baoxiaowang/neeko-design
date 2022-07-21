<template>
  <CodemirrorEditor
    v-bind="$attrs"
    class="css-editor"
    :options="options"
    value=""
    :hint-func="hintFunc"
  ></CodemirrorEditor>
</template>

<script setup lang="ts" name="CssEditor">
  import CodemirrorEditor from '@/components/codemirror-editor/index.vue';
  import Codemirror from 'codemirror';
  import './hint/css-hint';

  const options = {
    mode: 'css',
  };
  const hintFunc = (Codemirror.hint as any).css;
</script>

<style lang="less">
  .css-editor {
    height: 100%;
  }
</style>
