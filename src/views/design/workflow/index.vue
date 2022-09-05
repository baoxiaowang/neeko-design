<template>
  <DesignLayout>
    <template #header>
      <TopBar
        :name="pageName"
        @save-data="saveForm"
        @name-change="handNameChange"
      />
    </template>
    <template #body>
      <div class="design-layout__view design-form__page">
        <flowDesignVue :flow-config="flowData"></flowDesignVue>
      </div>
    </template>
  </DesignLayout>
</template>

<script setup lang="ts" name="form-page">
  import { useDesignStore } from '@/store';
  import DesignLayout from 'src/layout/design-layout.vue';
  import TopBar from '@/components/design/top-bar.vue';
  import { computed, onBeforeMount, ref } from 'vue';
  import { getById, updatePageName, updatePageWidget } from '@/api/page';
  import { useRoute } from 'vue-router';
  import { Widget } from '@/widgets/types';
  import { Message } from '@arco-design/web-vue';
  import flowDesignVue from './components/flow-design.vue';
  import { defaultData, FlowNode } from './constant';

  const store = useDesignStore();
  const route = useRoute();

  const flowData = ref<FlowNode>(defaultData);
  const pageId = computed<string>(() => route.params.pageId.toString());
  const pageName = ref<string>('');
  const widgets = computed<Widget[]>(() => store.widgetList);

  onBeforeMount(async () => {
    const { data } = await getById(pageId.value);
    pageName.value = data.name;
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
</script>

<style lang="less">
  .design-form__page {
    height: 100%;
  }
</style>
