<template>
  <ConfigBlockVue required label="标题">
    <a-input
      :model-value="label"
      placeholder="请输入字段标题"
      @update:model-value="changeAttr"
    />
  </ConfigBlockVue>
</template>

<script setup lang="ts" name="attr-label">
  import ConfigBlockVue from '../common/config-block.vue';

  defineProps<{
    label: string;
  }>();
  const emit = defineEmits<{
    (n: 'change', e: string): void;
  }>();
  function changeAttr(val: string) {
    emit('change', val);
  }
</script>

<style lang="less">
  // .attr-label {
  // }
</style>
