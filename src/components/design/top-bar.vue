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
    <div class="page-title">
      <a-menu mode="horizontal" :default-selected-keys="['1']">
        <!-- 页面模式 -->
        <template v-if="designType === 'page'">
          <a-menu-item key="1">
            <template #icon><icon-computer /></template>页面设计
          </a-menu-item>
          <a-menu-item key="5">
            <template #icon><icon-send /></template>页面发布
          </a-menu-item>
        </template>
        <template v-else-if="designType === 'form'">
          <!-- 表单模式 -->
          <a-menu-item key="1">
            <template #icon> <icon-bookmark /> </template>表单设计
          </a-menu-item>
          <a-menu-item key="2">
            <template #icon>
              <i class="iconfont icon-organization-chart" /> </template
            >流程设计
          </a-menu-item>
          <a-sub-menu key="0">
            <template #icon><icon-apps></icon-apps></template>
            <template #title>其他设计</template>
            <a-menu-item key="0_2">
              <template #icon>
                <icon-unordered-list />
              </template>
              列表设计
            </a-menu-item>
            <a-menu-item key="0_3">
              <template #icon>
                <icon-idcard />
              </template>
              详情设计
            </a-menu-item>
          </a-sub-menu>
          <a-menu-item key="5">
            <template #icon><icon-send /></template>发布设置
          </a-menu-item>
        </template>
      </a-menu>
    </div>
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
      borderRadius: 0,
    }"
    fullscreen
    :footer="false"
  >
    <template v-if="designType === 'form'" #title>
      <div class="preview-header"> 表单预览 </div>
    </template>
    <div class="design-model-body" :class="'design-model-body-' + designType">
      <PreviewContent v-if="visible" @close="close"></PreviewContent>
    </div>
  </a-modal>
  <!-- <a-drawer
    v-model:visible="visible"
    placement="bottom"
    class="preview-modal"
    height="100%"
  >
    <div class="design-model-body" :class="'design-model-body-' + designModel">
      <PreviewContent v-if="visible" @close="close"></PreviewContent>
    </div>
  </a-drawer> -->
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

  const designType = computed<'page' | 'form'>(() => store.designType);
  const visible = computed<boolean>({
    get() {
      return store.previewDialogShow;
    },
    set(val: boolean) {
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

  function previewPage() {
    store.previewDialogShow = true;
  }
  function close() {
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

    .design-model-body {
      height: 100%;

      &-form {
        // width: 800px;
        margin: 0 auto;
        padding: 0 calc(50% - 400px);
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
      // margin-right: 20px;
      // font-weight: 600;
      // font-size: 18px;
      .arco-menu-overflow-wrap {
        text-align: center;
      }
    }

    .top-left {
      display: flex;
      align-items: center;
      // flex: 1;
      width: 300px;
    }

    .action-btn {
      display: flex;
      justify-content: flex-end;
      // flex: 1;
      width: 300px;
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
