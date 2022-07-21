<template>
  <div ref="el" class="codemirror-editor">
    <textarea class="codemirror-editor-textarea"></textarea>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  // 核心
  import codeMirror, {
    AsyncHintFunction,
    Editor,
    EditorConfiguration,
    HintFunction,
    HintFunctionResolver,
    ShowHintOptions,
  } from 'codemirror';
  import 'codemirror/lib/codemirror.css';

  // 主题 theme style
  // import "codemirror/theme/base16-light.css";
  // import "codemirror/theme/base16-dark.css";

  // 语言 mode
  import 'codemirror/mode/javascript/javascript';
  import 'codemirror/mode/css/css';

  // 括号/标签 匹配
  import 'codemirror/addon/edit/matchbrackets';
  import 'codemirror/addon/edit/matchtags';

  // 括号/标签 自动关闭
  import 'codemirror/addon/edit/closebrackets';
  import 'codemirror/addon/edit/closetag';

  // 代码折叠
  import 'codemirror/addon/fold/foldgutter.css';
  import 'codemirror/addon/fold/brace-fold';
  import 'codemirror/addon/fold/foldcode';
  import 'codemirror/addon/fold/foldgutter';
  import 'codemirror/addon/fold/comment-fold';

  // 缩进文件
  import 'codemirror/addon/fold/indent-fold';
  // 光标行背景高亮
  import 'codemirror/addon/selection/active-line';

  // 引入keymap
  import 'codemirror/addon/comment/comment';
  // import "codemirror/keymap/sublime";

  // 引入代码提示
  import 'codemirror/addon/hint/show-hint.css';
  import 'codemirror/addon/hint/show-hint';
  import 'codemirror/addon/hint/javascript-hint';

  type HintFunc = HintFunction | AsyncHintFunction | HintFunctionResolver;
  const defaultEditorOptions = {
    mode: 'text/javascript',
    readOnly: false,
    theme: 'default',
    matchBrackets: true,
    lineWrapping: false,
    tabSize: 2,
    codeHandler: undefined,
    styleActiveLine: false,
    lineNumbers: false,
    autofocus: false,
    hint: codeMirror.hint.javascript,
  };
  const props = defineProps<{
    value: string;
    options?: Partial<EditorConfiguration>;
    hintFunc?: HintFunc;
    delay?: number;
  }>();
  const emit = defineEmits<{
    (e: 'update:value', d: string): void;
  }>();

  function initCodemirror() {
    const megeOpt = {
      ...defaultEditorOptions,
      ...props.options,
    };
    const {
      tabSize,
      theme,
      matchBrackets,
      styleActiveLine,
      lineNumbers,
      mode,
      autofocus,
    } = megeOpt;
    const el = ref<HTMLElement | null>(null);
    // codeEditor?.toTextArea();
    const codeEditor: codeMirror.EditorFromTextArea = codeMirror.fromTextArea(
      el.value?.querySelector('textarea') as HTMLTextAreaElement,
      {
        value: props.value || '',
        lineNumbers, // 显示行号
        mode: mode || 'text/javascript', // 编辑器语言, //语法高亮   MIME-TYPE
        gutters: ['codeMirror-linenumbers', 'codeMirror-foldgutter'], // 左侧边栏css
        lineWrapping: true, // 长行时文字是换行  换行(wrap)/滚动(scroll)
        styleActiveLine, // 高亮选中行
        indentUnit: 2,
        tabSize, // tab 字符的宽度
        theme: theme || 'default', // 设置主题
        autoCloseBrackets: true, // 括号自动关闭
        autoCloseTags: true, // 标签自动关闭
        matchTags: true, // 标签匹配
        matchBrackets, // 括号匹配
        foldGutter: true, // 代码折叠
        readOnly: false,
        showCursorWhenSelecting: true,
        // keyMap: "sublime",
        smartIndent: true,
        autofocus,
        showHint: true,
        hintOptions: {
          completeSingle: false,
          alignWithWord: true,
          hint: props.hintFunc || codeMirror.hint.javascript,
        },
      }
    );
    codeEditor.setOption('extraKeys', {
      // eslint-disable-next-line func-names
      'Cmd-S': function (cm) {
        // eslint-disable-next-line no-console
        console.log('自动保存');
      },
      // eslint-disable-next-line func-names
      'Ctrl-S': function (_cm) {
        // eslint-disable-next-line no-console
        console.log('自动保存');
      },
    });
    // codeEditor.setValue("");
    // 使用 prop function 替换 onChange 事件
    codeEditor.on('change', (instance, change) => {
      // console.log(change.origin, change.text);
      // 自动补全的时候，也会触发change事件，所有坐下判断，以免死循环，正则是为了不让空格，换行之类的也提示
      // 通过change对象你可以自定义一些规则去判断是否提示
      // && /\w|\./g.test(change.text[0])
      if (change.origin !== 'complete') {
        instance.showHint();
      }
      // const val = instance.getValue()
      // if (val !== this.value) {
      //   this.$emit("update:value", val);
      // }
    });
    codeEditor.on('blur', (instance, change) => {
      const val = instance.getValue();
      if (val !== props.value) {
        emit('update:value', val);
      }
    });

    // codeEditor.on("mousedown", (cm) => {
    //   // this.selection.from = cm.getCursor()
    // });
    // watchEffect(() => {
    //   const val = this.value || '';
    //   const currentVal = codeEditor.getValue()
    //   if (val !== currentVal) {
    //     codeEditor.setValue(this.value);
    //   }
    // });
  }
  // const CodemirrorEditor = defineComponent({
  //   name: 'CodemirrorEditor',
  //   watch: {
  //     value: {
  //       immediate: true,
  //       handler(val = '') {
  //         if (!this.codeEditor) return;
  //         const currentVal = this.codeEditor.getValue();
  //         if (val !== currentVal) {
  //           this.codeEditor.setValue(this.value);
  //         }
  //       },
  //     },
  //   },
  //   mounted() {
  //     setTimeout(() => {
  //       this.initCodemirror();
  //     }, this.delay || 0);
  //   },
  //   methods: {
  //     initCodemirror() {
  //       const megeOpt = {
  //         ...defaultEditorOptions,
  //         ...this.options,
  //       };
  //       let codeEditor: codeMirror.EditorFromTextArea | null;
  //       const {
  //         tabSize,
  //         theme,
  //         matchBrackets,
  //         styleActiveLine,
  //         lineNumbers,
  //         mode,
  //         autofocus,
  //       } = megeOpt;
  //       codeEditor?.toTextArea();
  //       codeEditor = codeMirror.fromTextArea(
  //         this.$el.querySelector('textarea'),
  //         {
  //           value: this.value || '',
  //           lineNumbers, // 显示行号
  //           mode: mode || 'text/javascript', // 编辑器语言, //语法高亮   MIME-TYPE
  //           gutters: ['codeMirror-linenumbers', 'codeMirror-foldgutter'], // 左侧边栏css
  //           lineWrapping: true, // 长行时文字是换行  换行(wrap)/滚动(scroll)
  //           styleActiveLine, // 高亮选中行
  //           indentUnit: 2,
  //           tabSize, // tab 字符的宽度
  //           theme: theme || 'default', // 设置主题
  //           autoCloseBrackets: true, // 括号自动关闭
  //           autoCloseTags: true, // 标签自动关闭
  //           matchTags: true, // 标签匹配
  //           matchBrackets, // 括号匹配
  //           foldGutter: true, // 代码折叠
  //           readOnly: false,
  //           showCursorWhenSelecting: true,
  //           // keyMap: "sublime",
  //           smartIndent: true,
  //           autofocus,
  //           showHint: true,
  //           hintOptions: {
  //             completeSingle: false,
  //             alignWithWord: true,
  //             hint: this.hintFunc || codeMirror.hint.javascript,
  //           },
  //         }
  //       );
  //       codeEditor.setOption('extraKeys', {
  //         'Cmd-S': function (cm) {
  //           console.log('自动保存');
  //         },
  //         'Ctrl-S': function (_cm) {
  //           console.log('自动保存');
  //         },
  //       });
  //       // codeEditor.setValue("");
  //       // 使用 prop function 替换 onChange 事件
  //       codeEditor.on('change', (instance, change) => {
  //         // console.log(change.origin, change.text);
  //         // 自动补全的时候，也会触发change事件，所有坐下判断，以免死循环，正则是为了不让空格，换行之类的也提示
  //         // 通过change对象你可以自定义一些规则去判断是否提示
  //         // && /\w|\./g.test(change.text[0])
  //         if (change.origin !== 'complete') {
  //           instance.showHint();
  //         }
  //         // const val = instance.getValue()
  //         // if (val !== this.value) {
  //         //   this.$emit("update:value", val);
  //         // }
  //       });
  //       codeEditor.on('blur', (instance, change) => {
  //         const val = instance.getValue();
  //         if (val !== this.value) {
  //           this.$emit('update:value', val);
  //         }
  //       });

  //       this.codeEditor = codeEditor;
  //       this.$watch(
  //         this.value,
  //         (val) => {
  //           if (!this.codeEditor) return;
  //           const currentVal = this.codeEditor.getValue();
  //           if (val !== currentVal) {
  //             this.codeEditor.setValue(this.value);
  //             // codeEditor.setCursor(1, 0)
  //           }
  //         },
  //         {
  //           immediate: true,
  //         }
  //       );
  //       // codeEditor.on("mousedown", (cm) => {
  //       //   // this.selection.from = cm.getCursor()
  //       // });
  //       // watchEffect(() => {
  //       //   const val = this.value || '';
  //       //   const currentVal = codeEditor.getValue()
  //       //   if (val !== currentVal) {
  //       //     codeEditor.setValue(this.value);
  //       //   }
  //       // });
  //     },
  //   },
  // });
</script>

<style lang="less">
  .codemirror-editor {
    .CodeMirror {
      height: 200px;
      // .codeMirror-linenumbers {
      // }
      border: 1px solid var(--color-field-border, rgba(31, 56, 88, 0.3));
      border-radius: 3px;

      .CodeMirror-gutters {
        border-right: 0;
      }
    }

    .codemirror-editor-textarea {
      display: none;
    }
  }
</style>
