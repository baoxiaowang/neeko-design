<template>
  <formEditorLayoutVue :node="node" :node-key="node.key" class="editor">
    <template #form>
      <attrFormLayoutVue :node="node" :change="change"></attrFormLayoutVue>
      <AttrKeyVue :node-key="node.key"></AttrKeyVue>
    </template>
    <template #ext> </template>
  </formEditorLayoutVue>
</template>

<script setup lang="ts" name="editor">
  import { FormRootWidget, FormWidget } from '@/widgets/types';
  import formEditorLayoutVue from '@/widgets/common/form-editor-layout.vue';
  import attrFormLayoutVue from '@/widgets/attr-blocks/attr-form-layout.vue';
  import AttrKeyVue from '@/widgets/attr-blocks/attr-key.vue';
  import { computed } from 'vue';
  import ConfigBlockVue from '../../common/config-block.vue';

  const props = defineProps<{
    node: FormRootWidget;
    change: (e: Partial<FormRootWidget>) => void;
  }>();
  const labelAlign = computed({
    get() {
      return props.node.labelAlign || 'right';
    },
    set(val) {
      props.change({
        labelAlign: val,
      });
    },
  });
</script>

<style lang="less">
  .editor {
  }
</style>
