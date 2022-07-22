<template>
  <EditorLayout :change="change" :value="value">
    <config-block required title="内容"> </config-block>
  </EditorLayout>
</template>

<script lang="ts" setup name="ContainerEditor">
  import ConfigBlock from '@/widgets/common/config-block.vue';
  import EditorLayout from '@/widgets/common/form-editor-layout.vue';
  import { Widget } from '@/widgets/types';

  defineProps<{
    value: Widget;
    change: (e: Partial<Widget>) => void;
  }>();

  // 静态属性，记录可以添加的子部件
</script>

<style lang="less"></style>
