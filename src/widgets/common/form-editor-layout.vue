<template>
  <div class="form-editor-layout">
    <a-tabs
      v-model="activeName"
      direction="horizontal"
      justify
      class="editor-expanded__tabs"
    >
      <a-tab-pane key="config" title="字段属性">
        <slot name="attrs"></slot>
      </a-tab-pane>

      <a-tab-pane key="ext" title="高级配置">
        <slot name="ext"></slot>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup lang="ts" name="form-editor-layout">
  import { ref } from 'vue';

  // const props = defineProps({});
  // const emit = defineEmits([]);

  const activeName = ref('config');
</script>

<style lang="less">
  .form-editor-layout {
  }
</style>
