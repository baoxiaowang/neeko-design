<template>
  <DesignLayout>
    <template #header>
      <TopBar
        :name="pageName"
        @name-change="handNameChange"
        @save-data="saveForm"
      ></TopBar>
    </template>
    <template #panel>
      <div class="design-page__page">
        <a-scrollbar
          style="
            width: 100%;
            height: 100%;
            padding-bottom: 80px;
            overflow-y: auto;
            text-align: center;
          "
          outer-class="design-page__scroll-view"
        >
          <PreviewIframe :page-type="pageType"></PreviewIframe>
        </a-scrollbar>
      </div>
    </template>
  </DesignLayout>
</template>

<script setup lang="ts" name="design-page-view">
  import DesignLayout from 'src/layout/design-layout.vue';
  import { useDesignStore } from '@/store';
  import {
    getById,
    PageTypeEnum,
    updatePageName,
    updatePageWidget,
  } from '@/api/page';
  import PreviewIframe from '@/components/design/preview-iframe/index.vue';
  import { computed, onBeforeMount, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { Widget } from '@/widgets/types';
  import TopBar from '@/components/design/top-bar.vue';
  import { Message } from '@arco-design/web-vue';

  const store = useDesignStore();
  const widgets = computed<Widget[]>(() => store.widgetList);

  const route = useRoute();
  const pageId = computed<string>(() => route.params.pageId.toString());
  const pageName = ref<string>('');
  const pageType = ref<PageTypeEnum>();

  onBeforeMount(async () => {
    const { data } = await getById(pageId.value);
    pageName.value = data.name;
    pageType.value = data.pageType;
    useDesignStore().initState('page', data.widgets);
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
</script>

<style lang="less">
  .design-page__page {
    height: 100%;
  }

  .design-page__scroll-view {
    height: 100%;
  }
</style>
