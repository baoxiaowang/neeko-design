<template>
  <EditorLayout :change="change" :value="value">
    <config-block required label="布局"> </config-block>
  </EditorLayout>
</template>

<script setup lang="ts" name="RowEditor">
  import { CommonEditorProps } from '@/widgets/common/widget-options';
  import ConfigBlock from '@/widgets/common/config-block.vue';

  defineProps(CommonEditorProps);
</script>

<style lang="less"></style>
