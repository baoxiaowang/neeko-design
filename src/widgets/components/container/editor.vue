<template>
  <EditorLayout :change="change" :value="value">
    <config-block required title="内容"> </config-block>
  </EditorLayout>
</template>

<script lang="ts" name="ContainerEditor">
  import { defineComponent } from 'vue';
  import { CommonEditorProps } from '@/widgets/common/widget-options';
  import ConfigBlock from '@/widgets/common/config-block.vue';
  import EditorLayout from '@/widgets/common/form-editor-layout.vue';

  // defineProps(CommonEditorProps)
  export default defineComponent({
    name: 'ContainerEditor',
    components: {
      EditorLayout,
      ConfigBlock,
    },
    props: CommonEditorProps,
    setup() {},
  });
  // 静态属性，记录可以添加的子部件
</script>

<style lang="less"></style>
