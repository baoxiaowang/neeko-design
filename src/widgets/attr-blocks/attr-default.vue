<template>
  <ConfigBlockVue class="attr-default">
    <!-- <el-input :model-value="label" @update:model-value="changeAttr"
      placeholder="Please input" /> -->
  </ConfigBlockVue>
</template>

<script setup lang="ts" name="attr-default">
  import ConfigBlockVue from '../common/config-block.vue';

  const props = defineProps<{
    type: 'custom';
  }>();
  const emit = defineEmits([]);
</script>

<style lang="less">
  .attr-default {
  }
</style>
