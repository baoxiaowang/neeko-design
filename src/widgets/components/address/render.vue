<template>
  <a-popover
    v-if="isSubWidget"
    :content-style="{ width: '300px' }"
    position="bottom"
    trigger="click"
  >
    <div class="arco-input-wrapper image-render__sub" style="height: 32px">
    </div>
    <template #content>
      <address-render></address-render>
    </template>
  </a-popover>
  <a-space v-else direction="vertical" fill>
    <a-cascader
      expand-child
      :options="options"
      :field-names="fieldNames"
      :style="{ width: '100%' }"
      allow-clear
      placeholder="请选择城市"
    />
    <a-textarea placeholder="请输入详细地址" style="height: 80px" allow-clear />
  </a-space>
</template>

<script setup lang="ts" name="address-render">
  import useWidgetInject from '@/widgets/hooks/useWidgetInject';
  import { provide } from 'vue';
  import AddressJson from '@/assets/address/pca-code.json';
  import { InputWidget } from '../../types';

  interface RenderProps {
    node: InputWidget;
  }
  defineProps<RenderProps>();
  const { isSubWidget } = useWidgetInject();
  provide('isSubWidget', false);
  const options = AddressJson;
  const fieldNames = { value: 'code', label: 'name' };
</script>

<style lang="less">
  // .input-render {
  // }
</style>
