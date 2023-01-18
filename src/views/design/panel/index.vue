<template>
  <DesignLayout>
    <template #header>
      <TopBar
        :name="pageName"
        :page-type="pageType"
        @name-change="handNameChange"
        @save-data="saveForm"
      ></TopBar>
    </template>
    <template #panel>
      <div class="design-page__panel">
        <div class="design-page__iframe">
          <PreviewIframe :page-type="pageType"></PreviewIframe>
        </div>
      </div>
    </template>
  </DesignLayout>
</template>

<script setup lang="ts" name="form-panel">
  import { useDesignStore } from '@/store';
  import DesignLayout from 'src/layout/design-layout.vue';
  import TopBar from '@/components/design/top-bar.vue';
  import { computed, onBeforeMount, ref } from 'vue';
  import {
    getById,
    updatePageName,
    updatePageWidget,
    PageTypeEnum,
  } from '@/api/page';
  import { useRoute, useRouter } from 'vue-router';
  import { Widget } from '@/widgets/types';
  import { Message } from '@arco-design/web-vue';
  import PreviewIframe from '@/components/design/preview-iframe/index.vue';

  const pageType = ref<PageTypeEnum>();
  const store = useDesignStore();
  const widgets = computed<Widget[]>(() => store.widgetList);

  const route = useRoute();
  const router = useRouter();
  const pageId = computed<string>(() => route.params.pageId.toString());
  const pageName = ref<string>('');
  const appId = ref<string>('');

  onBeforeMount(async () => {
    const { data } = await getById(pageId.value);
    pageName.value = data.name;
    pageType.value = data.pageType;
    appId.value = data.appId;
    useDesignStore().initState(data.pageType, data.widgets);
  });
  async function saveForm() {
    await updatePageWidget({
      id: pageId.value,
      widgets: widgets.value,
    }).then(() => {
      Message.success('保存成功');
    });
  }
  function handNameChange(name: string) {
    updatePageName({
      id: pageId.value,
      name,
    });
  }
  function onBack() {
    // router.replace(`/application-detail/${appId.value}`);
    router.go(-1);
  }
</script>

<style lang="less">
  .design-page__panel {
    height: 100%;

    .design-page__iframe {
      height: 100%;
      height: 100%;
      padding: 10px;
      text-align: center;
      background-color: #eee;
    }
  }
</style>
