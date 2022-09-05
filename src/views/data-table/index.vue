<template>
  <div class="data-table">
    <TableRender
      :widget-data="pageWidgets"
      :table-data="tableData"
      @on-add="handlerAdd"
      @on-del="handlerDel"
    ></TableRender>
  </div>
</template>

<script setup lang="ts" name="data-table">
  // const props = defineProps();
  // const emit = defineEmits();
  import TableRender from '@/widgets/table-render/index.vue';
  import { customerTable, customerTableData } from '@/template/customer';
  import { contactsTable, contactsTableData } from '@/template/contacts';
  import * as WidgetSdk from '@/widgets/sdk';
  import { useRoute } from 'vue-router';
  import { computed, onBeforeMount, ref } from 'vue';
  import { FormWidget, Widget } from '@/widgets/types';
  import { getById } from '@/api/page';
  import { createFormData, delFormData, getFormDataByPage } from '@/api/form';

  const route = useRoute();
  const pageId = computed<string>(() => route.params.pageId?.toString());

  const pageWidgets = ref<FormWidget[]>([]);
  const tableData = ref<any[]>([]);

  async function initTableData() {
    const { data: formDataList } = await getFormDataByPage({
      formId: pageId.value,
    });
    tableData.value = formDataList;
  }

  onBeforeMount(async () => {
    const { data } = await getById(pageId.value);
    pageWidgets.value = data.widgets;
    initTableData();
  });
  async function handlerDel(id: string) {
    await delFormData(id);
    initTableData();
  }
  function handlerAdd() {
    WidgetSdk.showFormModel(pageWidgets.value, {
      onBeforeOk(error, formData) {
        createFormData({
          formId: pageId.value,
          formData,
        }).then(() => {
          initTableData();
        });
      },
    });
  }
</script>

<style lang="less">
  .data-table {
    margin: 12px;
    background: #fff;
  }
</style>
