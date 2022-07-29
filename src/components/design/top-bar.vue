<template>
  <div class="app-top top-bar">
    <div class="top-left">
      <!-- <a-button class="back-btn" text @click="$router.push('/page-manage')">
        <icon-left />
      </a-button> -->
      <a-button type="text" @click="back">
        <template #icon>
          <icon-left />
        </template>
      </a-button>
      <!-- <a-input
        class="page-name__input"
        :model-value="currentName"
        @update:model-value="modelChange"
        @change="change"
      >
      </a-input> -->
    </div>
    <div class="page-title"> 页面设计 </div>
    <div class="action-btn">
      <a-space>
        <a-button @click="previewPage">预 览</a-button>
        <a-button @click="saveData">保 存</a-button>
        <a-button type="primary">发 布</a-button>
      </a-space>
    </div>
  </div>

  <a-modal
    v-model:visible="visible"
    modal-class="preview-modal"
    :body-style="{
      borderRadio: 0,
    }"
    fullscreen
    :footer="false"
  >
    <template #title>
      <div class="preview-header"> 页面预览 </div>
    </template>
    <div class="designModel-body" :class="'designModel-body-' + designModel">
      <PreviewContent v-if="visible" @close="close"></PreviewContent>
    </div>
  </a-modal>
</template>

<script setup lang="ts" name="top-bar">
  import { ref, watchEffect, h, computed } from 'vue';
  import { useDesignStore } from '@/store';
  import PreviewContent from '@/components/design/preview-content/index.vue';
  import { useRouter } from 'vue-router';

  const store = useDesignStore();
  const router = useRouter();
  const props = defineProps<{
    name: string;
  }>();
  const emit = defineEmits<{
    (e: 'saveData'): void;
    (e: 'nameChange', n: string): void;
    (e: 'update:name', n: string): void;
  }>();
  function saveData() {
    emit('saveData');
  }
  function change(val: any) {
    emit('nameChange', val);
  }
  const designModel = computed(() => store.designMode);
  const visible = computed({
    get() {
      return store.previewDialogShow;
    },
    set(val) {
      store.previewDialogShow = val;
    },
  });

  function back() {
    router.go(-1);
  }
  const currentName = ref<string>(props.name);
  watchEffect(() => {
    currentName.value = props.name;
  });
  function modelChange(e: string) {
    currentName.value = e;
    emit('update:name', e);
  }
  function previewPage() {
    store.previewDialogShow = true;
  }
  function close() {
    //
    visible.value = false;
  }
</script>

<style lang="less">
  body .preview-modal {
    padding: 0;
    border-radius: 0;

    .arco-modal-header {
      margin-bottom: 10px;
      background: #fff;
      box-shadow: 0 4px 6px #0c1f500a;
    }

    .arco-modal-header {
      display: none;
    }

    .arco-modal-body {
      height: 100%;
      padding: 0;
    }

    .designModel-body {
      height: 100%;
      padding: 0 calc(50% - 412px);

      &-form {
        // width: 1200px;
        margin: 0 auto;
        background: #f9fafc;
      }
    }
  }

  .app-top {
    position: relative;
    z-index: 100;
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 12px;
    font-size: 13px;
    background: #fff;
    box-shadow: 0 4px 6px #0c1f500a;

    .page-title {
      display: flex;
      flex: 1;
      justify-content: center;
      margin-right: 20px;
      font-weight: 600;
      font-size: 18px;

      .el-tag__content {
      }
    }

    .top-left {
      display: flex;
      flex: 1;
      align-items: center;
    }

    .action-btn {
      display: flex;
      flex: 1;
      justify-content: flex-end;
    }

    .page-name__input {
      width: min-content;
      min-width: 100px;

      .el-input__wrapper {
        box-sizing: border-box;
        border-bottom: 1px solid transparent;
        border-radius: 0;
        box-shadow: 0 0 0 1px transparent inset !important;

        &.is-focus {
          border-bottom: 1px dashed var(--el-input-focus-border-color);
        }
      }
    }

    .back-btn {
      padding: 8px 9px;
    }
  }
</style>
