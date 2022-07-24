<template>
  <formEditorLayoutVue :node="node" :node-key="node.key" class="editor">
    <template #attrs>
      <AttrLabelVue
        :label="node.label || ''"
        @change="(val) => changeAttr('label', val)"
      ></AttrLabelVue>
      <ConfigBlock label="输入提示">
        <a-input
          :model-value="node.placeholder"
          @update:model-value="(val) => changeAttr('placeholder', val)"
        />
      </ConfigBlock>
      <AttrWidthVue
        :block="node.block"
        :width="node.width"
        @change-block="(val) => changeAttr('block', val)"
        @change="(val) => changeAttr('width', val)"
      ></AttrWidthVue>
      <AttrKeyVue :node-key="node.key"></AttrKeyVue>
    </template>
  </formEditorLayoutVue>
</template>

<script setup lang="ts" name="input-editor">
  import formEditorLayoutVue from '@/widgets/common/form-editor-layout.vue';
  import ConfigBlock from '@/widgets/common/config-block.vue';
  import AttrLabelVue from '@/widgets/attr-blocks/attr-label.vue';
  import AttrWidthVue from '@/widgets/attr-blocks/attr-width.vue';
  import AttrKeyVue from '@/widgets/attr-blocks/attr-key.vue';
  import { InputWidget, WidgetChange } from '../../types';

  const props = defineProps<{
    node: InputWidget;
    change: WidgetChange<InputWidget>;
  }>();
  function changeAttr(key: keyof InputWidget, val: any) {
    props.change({
      [key]: val,
    });
  }
</script>

<style lang="less"></style>
