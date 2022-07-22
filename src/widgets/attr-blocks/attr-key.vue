<template>
  <ConfigBlockVue class="attr-key" label="唯一标识">
    <a-input disabled :model-value="nodeKey"></a-input>
  </ConfigBlockVue>
</template>

<script setup lang="ts" name="attr-key">
  import ConfigBlockVue from '../common/config-block.vue';

  defineProps<{
    nodeKey: string;
  }>();
</script>

<style lang="less">
  // .attr-key {
  // }
</style>
