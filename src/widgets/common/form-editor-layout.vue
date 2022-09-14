<template>
  <div class="form-editor-layout">
    <a-tabs
      v-model="activeName"
      direction="horizontal"
      justify
      class="editor-expanded__tabs"
    >
      <a-tab-pane v-if="$slots.attrs" key="config" title="字段属性">
        <el-scrollbar :wrap-style="{ padding: '0 12px' }">
          <slot name="attrs"></slot>
          <AttrKeyVue :node-key="nodeKey"></AttrKeyVue>
        </el-scrollbar>
      </a-tab-pane>

      <a-tab-pane v-if="$slots.form" key="config" title="表单属性">
        <el-scrollbar :wrap-style="{ padding: '0 12px' }">
          <slot name="form"></slot>
          <AttrKeyVue :node-key="nodeKey"></AttrKeyVue>
        </el-scrollbar>
      </a-tab-pane>

      <a-tab-pane key="ext" title="高级配置">
        <el-scrollbar :wrap-style="{ padding: '0 12px' }">
          <slot name="ext"></slot>
        </el-scrollbar>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup lang="ts" name="form-editor-layout">
  import { ref } from 'vue';
  import { Widget } from '../types';

  defineProps<{
    node: Widget;
    nodeKey: string;
  }>();
  // const emit = defineEmits([]);

  const activeName = ref('config');
</script>

<style lang="less">
  .form-editor-layout {
    height: 100%;
  }

  .editor-expanded__tabs {
    height: 100%;
    overflow: hidden;

    .arco-tabs-content {
    }

    .arco-tabs {
      height: 100%;
    }
  }
</style>
