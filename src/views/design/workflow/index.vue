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
        <div class="design-flow__tools">
          <a-space> </a-space>
        </div>
        <el-scrollbar>
          <flowDesignVue
            v-model:flow-config="dataNodeList"
            @node-click="handleNodeClick"
          ></flowDesignVue>
        </el-scrollbar>
      </div>
      <a-drawer
        v-model:visible="visible"
        :width="520"
        unmount-on-close
        @ok="handleOk"
        @cancel="handleCancel"
      >
        <template #title> Title </template>
        <div
          >You can cusstomize modal body text by the current situation. This
          modal will be closed immediately once you press the OK button.
        </div>
      </a-drawer>
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
  import { flowNodeList, FlowNode } from './constant';

  const store = useDesignStore();
  const route = useRoute();

  // const flowData = ref<FlowNode>(defaultData);
  const dataNodeList = ref<FlowNode[]>(flowNodeList);
  const pageId = computed<string>(() => route.params.pageId.toString());
  const pageName = ref<string>('');
  const widgets = computed<Widget[]>(() => store.widgetList);
  const visible = ref<boolean>(false);

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
  function handleNodeClick(node: FlowNode) {
    console.log(node);
    visible.value = true;
  }
  function handleOk() {}
  function handleCancel() {}
</script>

<style lang="less">
  .design-form__page {
    position: relative;
    height: 100%;
    background: url(https://img.alicdn.com/imgextra/i3/O1CN01LVUi4y1e6WRzwnhIh_!!6000000003822-55-tps-22-22.svg) -2px -2px
      repeat !important;
    background-size: 11px !important;

    .design-flow__tools {
      position: absolute;
    }
  }
</style>
