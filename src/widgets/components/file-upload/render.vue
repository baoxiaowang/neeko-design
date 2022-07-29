<template>
  <a-upload
    action="/"
    list-type="picture"
    :default-file-list="fileList"
    :custom-icon="getCustomIcon()"
  />
</template>

<script setup lang="ts" name="input-render">
  import IconUpload from '@arco-design/web-vue/es/icon/icon-upload';
  import IconFileAudio from '@arco-design/web-vue/es/icon/icon-file-audio';
  import IconClose from '@arco-design/web-vue/es/icon/icon-close';
  import IconFaceFrownFill from '@arco-design/web-vue/es/icon/icon-face-frown-fill';
  import { h } from 'vue';
  import { InputWidget } from '../../types';

  interface RenderProps {
    node: InputWidget;
  }
  defineProps<RenderProps>();
  const getCustomIcon = () => {
    return {
      retryIcon: () => h(IconUpload),
      cancelIcon: () => h(IconClose),
      fileIcon: () => h(IconFileAudio),
      removeIcon: () => h(IconClose),
      errorIcon: () => h(IconFaceFrownFill),
      fileName: (file: any) => {
        return `文件名： ${file.name}`;
      },
    };
  };
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
</style>
