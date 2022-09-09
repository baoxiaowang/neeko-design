<template>
  <div class="app-top top-bar">
    <div class="top-left">
      <a-button type="text" @click="back">
        <template #icon>
          <icon-left />
        </template>
      </a-button>
      <a-input
        class="page-name__input"
        :style="{
          width: inputWidth + 'px',
        }"
        :model-value="currentName"
        @input="handInput"
        @update:model-value="modelChange"
        @change="change"
      >
      </a-input>
      <span ref="iptTextEl" class="page-name__text">{{ currentName }}</span>
    </div>
    <div class="page-title">
      <a-menu mode="horizontal" :selected-keys="selectKeys">
        <!-- 页面模式 -->
        <template v-if="designType === 'page'">
          <a-menu-item key="designPage">
            <template #icon><icon-computer /></template>页面设计
          </a-menu-item>
          <a-menu-item key="5">
            <template #icon><icon-send /></template>页面发布
          </a-menu-item>
        </template>
        <template v-else-if="designType === 'form'">
          <!-- 表单模式 -->
          <a-menu-item key="designForm" @click="link('form')">
            <template #icon> <icon-bookmark /> </template>表单设计
          </a-menu-item>
          <a-menu-item key="designFlow" @click="link('flow')">
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
</template>

<script setup lang="ts" name="top-bar">
  import { ref, watchEffect, h, computed, nextTick, watch } from 'vue';
  import { useDesignStore } from '@/store';
  import PreviewContent from '@/components/design/preview-content/index.vue';
  import { useRoute, useRouter } from 'vue-router';

  const store = useDesignStore();
  const router = useRouter();
  const route = useRoute();
  const props = defineProps<{
    name: string;
    onBack?: () => void;
  }>();
  const emit = defineEmits<{
    (e: 'saveData'): void;
    (e: 'nameChange', n: string): void;
    (e: 'update:name', n: string): void;
  }>();
  function saveData() {
    emit('saveData');
  }
  const iptTextEl = ref<any>();
  const inputWidth = ref<number>(100);
  const designType = computed<'page' | 'form'>(() => store.designType);
  const visible = computed<boolean>({
    get() {
      return store.previewDialogShow;
    },
    set(val: boolean) {
      store.previewDialogShow = val;
    },
  });

  const currentName = ref('客户管理');

  function back() {
    if (props.onBack) {
      props.onBack();
    } else {
      router.go(-1);
    }
  }
  // const currentName = ref<string>(props.name);
  watchEffect(async () => {
    currentName.value = props.name;
  });
  watch(
    currentName,
    async () => {
      await nextTick();
      inputWidth.value = iptTextEl.value?.offsetWidth + 22;
    },
    {
      immediate: true,
    }
  );

  function previewPage() {
    store.previewDialogShow = true;
  }
  function close() {
    visible.value = false;
  }
  function modelChange(val: string) {
    currentName.value = val;
  }
  function change(val: string) {
    emit('nameChange', val);
  }
  function handInput() {}
  const selectKeys = computed(() => {
    return [route.name];
  });
  function link(type: string) {
    switch (type) {
      case 'flow':
        router.push({
          path: `/design-flow/${route.params.pageId}`,
        });
        break;
      case 'page':
        router.push({
          path: `/design-page/${route.params.pageId}`,
        });
        break;
      case 'form':
        router.push({
          path: `/design-form/${route.params.pageId}`,
        });
        break;

      default:
        break;
    }
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

    .page-name__text {
      position: absolute;
      z-index: -1;
      font-size: 14px;
      line-height: 1.5715;
      opacity: 0;
    }

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
      box-sizing: border-box;
      width: min-content;
      min-width: 80px;
      // box-shadow: 0 0 0 1px transparent inset !important;
      border: 1px solid transparent;
      border-bottom: 1px solid transparent;
      border-radius: 0;
    }

    .arco-input-focus {
      border-bottom: 1px dashed var(--color-neutral-6) !important;
    }

    .back-btn {
      padding: 8px 9px;
    }
  }
</style>
