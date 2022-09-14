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
      <file-render></file-render>
    </template>
  </a-popover>
  <a-upload
    v-else
    action="/api/upload"
    list-type="text"
    :file-list="fileList"
    :custom-icon="getCustomIcon()"
    :response-url-key="uploadResponse"
    @change="fileChange"
  />
</template>

<script setup lang="ts" name="file-render">
  import IconUpload from '@arco-design/web-vue/es/icon/icon-upload';
  import IconFileAudio from '@arco-design/web-vue/es/icon/icon-file-audio';
  import IconClose from '@arco-design/web-vue/es/icon/icon-close';
  import IconFaceFrownFill from '@arco-design/web-vue/es/icon/icon-face-frown-fill';
  import { computed, h, provide } from 'vue';
  import useWidgetInject from '@/widgets/hooks/useWidgetInject';
  import { IFileItem, InputWidget } from '../../types';

  interface RenderProps {
    node: InputWidget;
    value?: IFileItem[];
  }
  const props = defineProps<RenderProps>();
  const emit = defineEmits<{
    (e: 'update:value', d: IFileItem[]): void;
  }>();
  const { isSubWidget } = useWidgetInject();
  provide('isSubWidget', false);
  const getCustomIcon = () => {
    return {
      retryIcon: () => h(IconUpload),
      cancelIcon: () => h(IconClose),
      fileIcon: () => h(IconFileAudio),
      removeIcon: () => h(IconClose),
      errorIcon: () => h(IconFaceFrownFill),
      fileName: (file: any) => {
        return `${file.name}`;
      },
    };
  };
  const fileList = computed<IFileItem[]>({
    get() {
      return props.value || [];
    },
    set(val: IFileItem[] = []) {
      emit(
        'update:value',
        val.map((item: any) => {
          return {
            name: item.name,
            uid: item.uid,
            url: item.url,
          };
        })
      );
    },
  });
  function uploadResponse(item: any) {
    return item.response.data.url;
  }
  function fileChange(imgList: any) {
    fileList.value = imgList;
  }
</script>

<style lang="less">
  // .input-render {
  // }
</style>
