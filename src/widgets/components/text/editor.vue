<template>
  <div class="text-edtior">
    <EditorLayout :change="change" :value="value">
      <config-block required label="内容">
        <CodemirrorEditor
          :options="options"
          class="text-value-editor"
          :value="value?.config?.text || ''"
          :hint-func="hint"
          @update:value="changeValue"
        />
        <a-input
          :model-value="value.config.text"
          @update:model-value="changeText"
        ></a-input>
      </config-block>
    </EditorLayout>
  </div>
</template>

<script lang="ts" setup>
  import codeMirror, {
    EditorConfiguration,
    Editor,
    ShowHintOptions,
  } from 'codemirror';

  import ConfigBlock from '@/widgets/common/config-block.vue';
  import CodemirrorEditor from '@/components/codemirror-editor/index.vue';
  import EditorLayout from '@/widgets/common/element-editor-layout.vue';
  import { TextWidget } from '@/widgets/types';

  const props = defineProps<{
    value: TextWidget;
    change: (e: Partial<TextWidget>) => void;
  }>();
  function change() {}
  function changeValue() {}
  function changeText(val: string) {
    props.change({
      config: {
        text: val,
      },
    });
  }
  const options: EditorConfiguration = {};
  const hint = (editor: Editor, _: ShowHintOptions) => {
    const WORD = /[\w+.$]+/;
    const cursor = editor.getCursor(); // 光标
    const curLine = editor.getLine(cursor.line); // 行内容
    let start = cursor.ch;
    const end = cursor.ch;
    while (start && WORD.test(curLine.charAt(start - 1))) {
      start -= 1;
    }
    const old = editor.getRange(
      {
        line: cursor.line,
        ch: start,
      },
      {
        line: cursor.line,
        ch: end,
      }
    );
    return {
      from: codeMirror.Pos(cursor.line, start),
      to: codeMirror.Pos(cursor.line, end),
      list: ['state', 'state.name', 'Date', ''].filter((i) => {
        if (!old.trim()) return false;
        return new RegExp(old).test(i);
      }),
    };
  };
</script>

<style lang="less">
  .text-edtior {
    height: 100%;

    .text-value-editor .CodeMirror {
      height: 100px !important;
    }
  }
</style>
