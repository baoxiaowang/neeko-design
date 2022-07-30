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
  import { InputWidget } from '../../types';

  interface RenderProps {
    node: InputWidget;
  }
  defineProps<RenderProps>();
  const { isSubWidget } = useWidgetInject();
  provide('isSubWidget', false);
  const options = [
    {
      value: 'beijing',
      label: 'Beijing',
      children: [
        {
          value: 'chaoyang',
          label: 'ChaoYang',
          children: [
            {
              value: 'datunli',
              label: 'Datunli',
            },
          ],
        },
        {
          value: 'haidian',
          label: 'Haidian',
        },
        {
          value: 'dongcheng',
          label: 'Dongcheng',
        },
        {
          value: 'xicheng',
          label: 'Xicheng',
          children: [
            {
              value: 'jinrongjie',
              label: 'Jinrongjie',
            },
            {
              value: 'tianqiao',
              label: 'Tianqiao',
            },
          ],
        },
      ],
    },
    {
      value: 'shanghai',
      label: 'Shanghai',
      children: [
        {
          value: 'huangpu',
          label: 'Huangpu',
        },
      ],
    },
  ];
</script>

<style lang="less">
  // .input-render {
  // }
</style>
