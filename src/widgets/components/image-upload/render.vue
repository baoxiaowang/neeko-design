<template>
  <a-popover
    v-if="isSubWidget"
    :content-style="{ width: '300px' }"
    position="bottom"
    trigger="click"
  >
    <div class="arco-input-wrapper image-render__sub" style="height: 32px">
      <span
        v-for="(item, index) in fileList"
        :key="index"
        class="image-render__sub-item"
      >
        <img :src="item.url" alt="" />
      </span>
    </div>
    <template #content>
      <image-render></image-render>
    </template>
  </a-popover>

  <a-upload
    v-else
    list-type="picture-card"
    action="/"
    :default-file-list="fileList"
    image-preview
  />
</template>

<script lang="ts"></script>

<script setup lang="ts" name="image-render">
  import useWidgetInject from '@/widgets/hooks/useWidgetInject';
  import { provide } from 'vue';
  import { InputWidget } from '../../types';

  const { isSubWidget } = useWidgetInject();
  provide('isSubWidget', false);

  interface RenderProps {
    node: InputWidget;
  }
  defineProps<RenderProps>();
  const fileList = [
    {
      uid: '-2',
      name: '20200717-103937.png',
      url: '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
    },
    {
      uid: '-1',
      name: 'hahhahahahaha.png',
      url: '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e278888093bef8910e829486fb45dd69.png~tplv-uwbnlip3yd-webp.webp',
    },
  ];
</script>

<style lang="less">
  // .input-render {
  // }
  .image-render__sub {
    display: flex;
    align-items: center;
    padding-left: 6px;
    cursor: pointer !important;
  }

  .image-render__sub-item {
    width: 24px;
    height: 24px;
    margin-right: 4px;
    background: red;

    & > img {
      height: 100%;
    }
  }
</style>
