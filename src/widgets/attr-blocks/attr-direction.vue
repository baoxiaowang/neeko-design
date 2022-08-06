<template>
  <ConfigBlockVue label="排列方式" class="attr-direction">
    <a-radio-group :model-value="direction" @update:model-value="change">
      <a-radio value="vertical">竖向排布</a-radio>
      <a-radio value="horizontal">横线排布</a-radio>
    </a-radio-group>
  </ConfigBlockVue>
</template>

<script setup lang="ts" name="attr-direction">
  import ConfigBlockVue from '../common/config-block.vue';

  defineProps<{
    direction: 'horizontal' | 'vertical' | undefined;
    change: (e: any) => void;
  }>();
</script>

<style lang="less">
  .attr-direction {
  }
</style>
