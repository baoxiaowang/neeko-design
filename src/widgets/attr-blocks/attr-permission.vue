<template>
  <ConfigBlockVue label="权限" class="attr-permission">
    <a-space direction="vertical">
      <a-radio-group type="button">
        <a-radio value="1">可见</a-radio>
        <a-radio value="2">部分可见</a-radio>
        <a-radio value="0">不可见</a-radio>
      </a-radio-group>

      <!-- <a-select :default-value="[]" placeholder="" multiple>
        <a-option>鲍小旺</a-option>
        <a-option>张三</a-option>
        <a-option>李四</a-option>
      </a-select> -->
    </a-space>
    <div style="height: 8px"></div>
    <a-space direction="vertical">
      <a-radio-group type="button">
        <a-radio value="1">可编辑</a-radio>
        <a-radio value="2">部分编辑</a-radio>
        <a-radio value="0">不可编辑</a-radio>
      </a-radio-group>

      <!-- <a-select :default-value="[]" placeholder="" multiple>
        <a-option>鲍小旺</a-option>
        <a-option>张三</a-option>
        <a-option>李四</a-option>
      </a-select> -->
    </a-space>
  </ConfigBlockVue>
</template>

<script setup lang="ts" name="attr-permission">
  import { FormWidget } from '../types';
  import ConfigBlockVue from '../common/config-block.vue';

  const props = defineProps<{
    node: FormWidget;
    change: (e: Partial<FormWidget>) => void;
  }>();
  function onChange() {}
  // const emit = defineEmits();
</script>

<style lang="less">
  .attr-permission {
  }
</style>
