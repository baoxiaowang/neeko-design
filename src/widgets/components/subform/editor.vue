<template>
  <formEditorLayoutVue :node="node" :node-key="node.key" class="editor">
    <template #attrs>
      <AttrLabelVue
        :label="node.label"
        :node="node"
        :change="change"
      ></AttrLabelVue>

      <AttrKeyVue :node-key="node.key"></AttrKeyVue>
    </template>
  </formEditorLayoutVue>
</template>

<script setup lang="ts" name="editor">
  import { FormWidget } from '@/widgets/types';
  import formEditorLayoutVue from '@/widgets/common/form-editor-layout.vue';
  import AttrLabelVue from '@/widgets/attr-blocks/attr-label.vue';
  import AttrKeyVue from '@/widgets/attr-blocks/attr-key.vue';

  defineProps<{
    node: FormWidget;
    change: (e: Partial<FormWidget>) => void;
  }>();
</script>

<style lang="less">
  .editor {
  }
</style>
