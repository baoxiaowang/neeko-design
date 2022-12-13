<!-- eslint-disable import/no-unresolved -->
<template>
  <div class="ace-editor">
    <div ref="editorEl" class="ace-editor-container"></div>
  </div>
</template>

<script setup lang="ts" name="index">
  import ace, { Ace } from 'ace-builds';
  // import 'ace-builds/webpack-resolver';

  import modeCss from 'ace-builds/src-noconflict/worker-css?url';
  import modeHtml from 'ace-builds/src-noconflict/worker-html?url';
  import 'ace-builds/src-noconflict/mode-css';
  import 'ace-builds/src-noconflict/mode-html';
  import 'ace-builds/src-noconflict/theme-chrome';
  import langTools from 'ace-builds/src-noconflict/ext-language_tools';
  import 'ace-builds/src-noconflict/ext-emmet';
  import 'ace-builds/src-noconflict/snippets/css';

  import 'ace-builds/src-noconflict/keybinding-vscode';
  import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';

  ace.config.setModuleUrl('ace/mode/css_worker', modeCss);
  ace.config.setModuleUrl('ace/mode/html_worker', modeHtml);

  langTools.addCompleter({
    // identifierRegexps: [/:?/],
    getCompletions(
      editor: Ace.Editor,
      session: Ace.EditSession,
      pos: Ace.Point,
      prefix: string,
      callback: any
    ) {
      if (prefix.length === 0) {
        callback(null, []);
        return;
      }
      callback([
        null,
        [
          {
            name: 'flex-start',
            value: 'flex-start',
            score: 1000,
            meta: 'value',
          },
        ],
      ]);
    },
  });

  const emit = defineEmits<{
    (e: 'update:value', d: string): void;
  }>();

  const props = defineProps<{
    value?: string;
    theme?: string;
    language?: string;
    readonly?: boolean;
  }>();

  let editor: ace.Ace.Editor | null = null;
  const editorEl = ref();
  const options: Partial<ace.Ace.EditorOptions> = {
    theme: `ace/theme/${props.theme ? props.theme : 'chrome'}`,
    mode: `ace/mode/${props.language || 'css'}`,
    // mode: 'ace-builds/src/mode-css',
    tabSize: 2,
    maxLines: 25,
    minLines: 10,
    showPrintMargin: true,
    fontSize: 12,
    showGutter: false,
    keyboardHandler: 'vscode',
    readOnly: props.readonly ? props.readonly : false,
  };
  // 切换语言
  // editor.getSession().setMode(modelPath)

  function initialize() {
    if (editor) {
      // 实例销毁
      editor.destroy();
    }
    // 初始化
    editor = ace.edit(editorEl?.value || '', options) as ace.Ace.Editor;
    // 代码提示和自动补全
    editor.setOptions({
      enableSnippets: true,
      enableLiveAutocompletion: true,
      enableBasicAutocompletion: true,
    });
    editor.getSession().setUseWrapMode(true);
    // 支持双向绑定
    // editor.on('change', () => {});
    // editor.on('blur', () => {
    //   // emit('update:value', editor!.getValue()?.toString());
    // });
    // 快捷键
    editor.commands.addCommand({
      name: 'formatter',
      bindKey: { win: 'Ctrl-S', mac: 'Command-S' },
      exec: () => {
        emit('update:value', editor!.getValue()?.toString());
      },
    });
    editor.setValue(props.value ? props.value : '');
    editor.clearSelection();
  }
  // watch(
  //   () => props.id,
  //   () => {
  //     initialize();
  //   }
  // );

  watch(
    () => props.value,
    (newVal: any) => {
      console.log('change', newVal);
      // 解决光标移动问题
      const position = editor?.getCursorPosition();
      editor?.getSession().setValue(newVal);
      editor?.clearSelection();
      editor?.moveCursorToPosition(position!);
    }
  );
  onMounted(() => {
    initialize();
  });
  onBeforeUnmount(() => {
    editor?.destroy();
  });
</script>

<style lang="less">
  .ace-editor {
    padding: 4px 0;
    border: 1px solid var(--color-field-border, rgba(31, 56, 88, 0.3));
    border-radius: 2px;
  }
</style>
