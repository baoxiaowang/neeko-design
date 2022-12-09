<template>
  <a-tabs
    v-model="activeName"
    class="editor-expanded__tabs"
    direction="horizontal"
    justify
    animation
    lazy-load
  >
    <a-tab-pane key="config" title="配置">
      <el-scrollbar :wrap-style="{ padding: '0px 12px' }">
        <slot></slot>
      </el-scrollbar>
      <WidgetKey :node-key="node.key"></WidgetKey>
    </a-tab-pane>
    <!-- <a-tab-pane key="style" title="样式">
      <slot name="style">
        <EditorStyle :value="value" @update:value="styleChange"></EditorStyle>
      </slot>
    </a-tab-pane> -->
    <a-tab-pane key="ext" title="高级">
      <el-scrollbar :wrap-style="{ padding: '0px 12px' }">
        <AceCssEditor
          :value="styleCode"
          :delay="200"
          class="css-editor-warp"
          @update:value="codeChange"
        ></AceCssEditor>
        <slot name="ext"></slot>
      </el-scrollbar>
    </a-tab-pane>
  </a-tabs>
</template>

<script lang="ts" setup name="EditorLayout">
  import { computed, ref } from 'vue';
  import WidgetKey from '@/widgets/attr-blocks/attr-key.vue';
  import { Widget } from '@/widgets/types';
  import CssEditor from 'src/components/codemirror-editor/css-editor/index.vue';
  import AceCssEditor from 'src/components/ace-editor/ace-css.vue';

  const props = defineProps<{
    node: Widget;
    change: (e: Partial<Widget>) => void;
  }>();
  const activeName = ref('config');

  function codeChange(str: string) {
    // const style = codeToStyle(toRaw(str));
    // props.value.style = style;
    // Object.assign(props.value.style, style)
    props.change({
      codeStyle: str,
    });
  }
  const styleCode = computed(() => props.node.codeStyle || '::node {\n}');
</script>

<style lang="less">
  .element-editor-layout {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    height: 100%;
    padding-top: 6px;
    overflow: hidden;

    .el-tabs__content {
      flex: 1;

      .el-tab-pane {
        height: 100%;
        overflow: hidden;
      }
      // overflow-y: auto;
    }

    .el-tabs__item {
      padding: 0 6px;
    }

    .el-tabs__header {
      margin-bottom: 0;
      // height: 50px;
    }

    .el-tabs__active-bar {
      height: 3px;
    }

    .el-tabs__nav-wrap {
      ::after {
        background-color: transparent;
      }
    }
  }
</style>
