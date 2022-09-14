<template>
  <formEditorLayoutVue :node="node" :node-key="node.key" class="editor">
    <template #attrs>
      <AttrLabelVue
        :label="node.label"
        :node="node"
        :change="change"
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
      <AttrOptionsVue :node="node" :change="change" />
      <AttrRulesVue :node="node" :change="change"></AttrRulesVue>

      <AttrKeyVue :node-key="node.key"></AttrKeyVue>
    </template>
    <template #ext>
      <AttrPermissionVue :node="node" :change="change"></AttrPermissionVue>
    </template>
  </formEditorLayoutVue>
</template>

<script setup lang="ts" name="input-editor">
  import formEditorLayoutVue from '@/widgets/common/form-editor-layout.vue';
  import ConfigBlock from '@/widgets/common/config-block.vue';
  import AttrLabelVue from '@/widgets/attr-blocks/attr-label.vue';
  import AttrWidthVue from '@/widgets/attr-blocks/attr-width.vue';
  import AttrKeyVue from '@/widgets/attr-blocks/attr-key.vue';
  import AttrRulesVue from '@/widgets/attr-blocks/attr-rules.vue';
  import AttrPermissionVue from '@/widgets/attr-blocks/attr-permission.vue';
  import AttrDirectionVue from '@/widgets/attr-blocks/attr-direction.vue';
  import AttrOptionsVue from '@/widgets/attr-blocks/attr-options.vue';

  import { CheckboxGroupWidget, InputWidget, WidgetChange } from '../../types';

  const props = defineProps<{
    node: CheckboxGroupWidget;
    change: WidgetChange<InputWidget>;
  }>();
  function changeAttr(key: keyof CheckboxGroupWidget, val: any) {
    props.change({
      [key]: val,
    });
  }
</script>

<style lang="less"></style>
