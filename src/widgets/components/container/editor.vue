<template>
  <EditorLayout :change="change" :node="node">
    <config-block required label="内容"> // </config-block>
    <template #ext>
      <!-- <CssEditor
        :value="node.config.text"
        :hint-func="hint"
        @update:value="changeValue"
      ></CssEditor> -->
      <CssEditor
        :value="styleCode"
        :delay="200"
        class="css-editor-warp"
        @update:value="codeChange"
      ></CssEditor>
    </template>
  </EditorLayout>
</template>

<script lang="ts" setup name="ContainerEditor">
  import ConfigBlock from '@/widgets/common/config-block.vue';
  import EditorLayout from '@/widgets/common/element-editor-layout.vue';
  import { Widget } from '@/widgets/types';
  import { codeToStyle, styleObjToCode } from '@/widgets/utils';
  import CssEditor from 'src/components/codemirror-editor/css-editor/index.vue';
  import { computed } from 'vue';

  const props = defineProps<{
    node: Widget;
    change: (e: Partial<Widget>) => void;
  }>();

  const styleCode = computed<string>(() => {
    return styleObjToCode(props.node.codeStyle);
  });

  function codeChange(str: string) {
    const style = codeToStyle(str);
    // Object.assign(props.value.style, style)
    props.change({
      codeStyle: style,
    });
  }
  // 静态属性，记录可以添加的子部件
</script>

<style lang="less"></style>
