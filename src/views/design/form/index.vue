<template>
  <DesignLayout>
    <template #header>
      <TopBar
        :name="pageName"
        :on-back="onBack"
        @name-change="handNameChange"
        @save-data="saveForm"
      />
    </template>
    <template #panel>
      <div class="design-layout__view design-form__page">
        <ElScrollbar>
          <renderProvider :meta="{}" mode="design">
            <renderWidgetVue
              v-for="item in widgets"
              :key="item.key"
              :node="item"
              :meta="{}"
            />
          </renderProvider>
        </ElScrollbar>
      </div>
    </template>
  </DesignLayout>
</template>

<script setup lang="ts" name="form-page">
  import { useDesignStore } from '@/store';
  import renderWidgetVue from '@/widgets/render/render-widget.vue';
  import renderProvider from '@/widgets/render/render-provider.vue';
  import DesignLayout from 'src/layout/design-layout.vue';
  import TopBar from '@/components/design/top-bar.vue';
  import { computed, onBeforeMount, ref } from 'vue';
  import { getById, updatePageName, updatePageWidget } from '@/api/page';
  import { useRoute, useRouter } from 'vue-router';
  import { Widget } from '@/widgets/types';
  import { Message } from '@arco-design/web-vue';

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
    appId.value = data.appId;
    useDesignStore().initState('form', data.widgets);
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
  .design-form__page {
    height: 100%;
  }
</style>
