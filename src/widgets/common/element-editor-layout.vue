<template>
  <a-tabs v-model="activeName" direction="horizontal" justify>
    <a-tab-pane key="config" title="配置">
      <slot></slot>
      <WidgetKey :node-key="value.key"></WidgetKey>
    </a-tab-pane>
    <a-tab-pane key="style" title="样式">
      <!-- <el-scrollbar> -->
      <slot name="style">
        <EditorStyle :value="value" @update:value="styleChange"></EditorStyle>
      </slot>
      <!-- </el-scrollbar> -->
    </a-tab-pane>
    <a-tab-pane key="ext" title="高级">
      <slot name="ext"></slot>
    </a-tab-pane>
  </a-tabs>
</template>

<script lang="ts" setup name="EditorLayout">
  import { ref, toRaw } from 'vue';
  import WidgetKey from '@/widgets/attr-blocks/attr-key.vue';
  import EditorStyle from '@/widgets/common/editor-style.vue';
  import { Widget } from '@/widgets/types';
  import { codeToStyle, styleObjToCode } from '@/widgets/utils';

  const props = defineProps<{
    value: Widget;
    change: (e: Widget) => void;
  }>();
  const activeName = ref('config');

  function styleChange(str: string) {
    const style = codeToStyle(toRaw(str));
    // props.value.style = style;
    // Object.assign(props.value.style, style)
    props.change(props.value);
  }
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
