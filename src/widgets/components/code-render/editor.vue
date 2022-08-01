<template>
  <div class="text-edtior">
    <EditorLayout :node="node" :change="otherChange">
      <config-block required label="内容">
        <a-button type="text" @click="showEditor">
          <template #icon><icon-code /></template>
        </a-button>
      </config-block>
    </EditorLayout>
    <a-drawer
      :visible="visible"
      width="100%"
      unmount-on-close
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <template #title>代码块</template>

      <a-split
        v-model="size"
        :style="{
          height: '100%',
          width: '100%',
          minWidth: '500px',
          border: '1px solid var(--color-border)',
        }"
        min="80px"
      >
        <template #first>
          <designRenderVue :state="{}" :meta="{}" :node="currentNode" />
        </template>
        <template #second>
          <vueEditorVue
            class="code-render__editor"
            :value="node?.config?.code || ''"
            @update:value="changeValue"
          />
        </template>
      </a-split>
    </a-drawer>
  </div>
</template>

<script lang="ts" setup>
  import codeMirror, {
    EditorConfiguration,
    Editor,
    // ShowHintOptions,
  } from 'codemirror';
  import { ref, computed } from 'vue';
  import ConfigBlock from '@/widgets/common/config-block.vue';
  import CodemirrorEditor from '@/components/codemirror-editor/base.vue';
  import EditorLayout from '@/widgets/common/element-editor-layout.vue';
  import { CodeRenderWidget, TextWidget, Widget } from '@/widgets/types';
  import vueEditorVue from '@/components/codemirror-editor/vue-editor/vue-editor.vue';
  import CodeRender from '@/widgets/components/code-render/render.vue';
  import designRenderVue from './design-render.vue';

  const props = defineProps<{
    node: CodeRenderWidget;
    change: (e: Partial<CodeRenderWidget>) => void;
  }>();

  const visible = ref(false);
  const size = ref(0.5);
  const currentCode = ref('');
  const currentNode = computed(() => {
    return {
      ...props.node,
      key: `${props.node.key}_editor`,
      config: {
        code: currentCode.value,
      },
    };
  });
  function showEditor() {
    currentCode.value = props.node.config.code;
    visible.value = true;
  }
  function otherChange(e: Partial<Widget>) {
    props.change(e as Partial<CodeRenderWidget>);
  }
  function changeValue(val: string) {
    currentCode.value = val;
  }
  function handleOk() {
    props.change({
      config: {
        code: currentCode.value,
      },
    });
    visible.value = false;
  }
  function handleCancel() {
    visible.value = false;
  }
</script>

<style lang="less">
  .text-edtior {
    height: 100%;

    .text-value-editor .CodeMirror {
      height: 100px !important;
    }
  }

  .code-render__editor {
    height: 100%;

    .CodeMirror {
      height: 100%;
    }
  }
</style>
