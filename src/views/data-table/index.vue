<template>
  <div class="data-table">
    <TableRender
      :widget-data="contactsTable"
      :table-data="contactsTableData"
      @on-add="handlerAdd"
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

  function handlerAdd() {
    WidgetSdk.showFormModel(contactsTable, {});
  }
</script>

<style lang="less">
  .data-table {
    margin: 12px;
    background: #fff;
  }
</style>
