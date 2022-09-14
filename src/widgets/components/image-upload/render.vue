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
    action="/api/upload"
    :file-list="fileList"
    image-preview
    :response-url-key="uploadResponse"
    @change="fileChange"
  />
</template>

<script lang="ts"></script>

<script setup lang="ts" name="image-render">
  import useWidgetInject from '@/widgets/hooks/useWidgetInject';
  import { computed, provide, ref } from 'vue';
  import { IFileItem, InputWidget } from '../../types';

  const { isSubWidget } = useWidgetInject();
  provide('isSubWidget', false);

  interface RenderProps {
    node: InputWidget;
    value?: IFileItem[];
  }
  const props = defineProps<RenderProps>();
  const emit = defineEmits<{
    (e: 'update:value', d: IFileItem[]): void;
  }>();
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
