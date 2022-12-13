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
      <div class="design-page__page">
        <div class="design-page__iframe">
          <PreviewIframe :page-type="pageType"></PreviewIframe>
        </div>
        <!-- <a-scrollbar
          style="
            width: 100%;
            height: calc(100%);
            padding: 20px 0;
            overflow-y: auto;
            text-align: center;
            background-color: #eee;
            box-sizing: border-box;
            overflow: hidden;
          "
          outer-class="design-page__scroll-view"
        > -->
        <!-- </a-scrollbar> -->
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
    height: calc(100% - 20px);
    // padding: 10px 10px;
  }

  .design-page__iframe {
    height: 100%;
    padding: 10px;
    text-align: center;
    background-color: #eee;
  }

  .design-page__scroll-view {
    height: 100%;
  }
</style>
