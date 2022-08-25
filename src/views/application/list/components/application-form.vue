<template>
  <a-modal
    v-model:visible="modalVisible"
    width="500px"
    title-align="start"
    title="创建应用"
    closable
    @before-ok="onBeforeOk"
  >
    <a-form
      ref="appForm"
      layout="vertical"
      class="application-form"
      :model="formData"
    >
      <a-form-item required field="name" label="应用名称">
        <a-input v-model="formData.name" placeholder="请输入名称" />
      </a-form-item>
      <a-form-item required field="icon" label="应用图标">
        <a-upload
          action="/api/upload"
          :file-list="file ? [file] : []"
          :show-file-list="false"
          :response-url-key="uploadResponse"
          @change="onChange"
          @progress="onProgress"
        >
          <template #upload-button>
            <div
              :class="`arco-upload-list-item${
                file && file.status === 'error'
                  ? ' arco-upload-list-item-error'
                  : ''
              }`"
            >
              <div
                v-if="file && file.url"
                class="arco-upload-list-picture custom-upload-avatar"
              >
                <img :src="file.url" />
                <div class="arco-upload-list-picture-mask">
                  <IconEdit />
                </div>
                <a-progress
                  v-if="file.status === 'uploading' && file.percent < 100"
                  :percent="file.percent"
                  type="circle"
                  size="mini"
                  :style="{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translateX(-50%) translateY(-50%)',
                  }"
                />
              </div>
              <div v-else class="arco-upload-picture-card">
                <div class="arco-upload-picture-card-text">
                  <IconPlus />
                </div>
              </div>
            </div>
          </template>
        </a-upload>
      </a-form-item>

      <a-form-item label="应用描述" field="describe">
        <a-textarea
          v-model="formData.describe"
          show-word-limit
          style="height: 76px"
          placeholder="请输入描述"
          allow-clear
        />
      </a-form-item>
      <a-form-item label="应用标签" field="describe">
        <a-input-tag
          v-model="formData.tags"
          placeholder="请输入标签"
          allow-clear
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts" name="application-form">
  import { createApp } from '@/api/application';
  import { computed, reactive, ref } from 'vue';
  import { AppModel } from '../application-list-page.vue';

  const props = defineProps<{
    visible: boolean;
  }>();
  const emit = defineEmits<{
    (e: 'update:visible', d: boolean): void;
  }>();

  const formData = reactive<
    Pick<AppModel, 'name' | 'icon' | 'describe' | 'tags'>
  >({
    name: '',
    icon: '',
    tags: [],
    describe: '',
  });
  const file = ref();
  const appForm = ref<any>();
  const onChange = (fileList: any, currentFile: any) => {
    file.value = {
      ...currentFile,
    };
    formData.icon = currentFile.url;
  };
  function uploadResponse(item: any) {
    return item.response.data.url;
  }
  const onProgress = (currentFile: any) => {
    file.value = currentFile;
  };
  const modalVisible = computed({
    get() {
      return props.visible;
    },
    set(val: boolean) {
      emit('update:visible', val);
    },
  });
  function onBeforeOk(done: any) {
    appForm.value?.validate().then((error: any) => {
      if (!error) {
        createApp({
          ...formData,
        })
          .then(() => {
            done();
          })
          .catch(() => {
            return false;
          });
      }
    });
  }
</script>

<style lang="less">
  .application-form {
    .arco-upload-list-item {
      margin-top: 0;
    }
  }
</style>
