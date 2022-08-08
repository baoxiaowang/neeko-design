<template>
  <div class="widget-table-render">
    <a-card class="widget-table-render__card" title="客户管理">
      <a-row>
        <a-col :flex="1">
          <a-form
            :model="{}"
            :label-col-props="{ span: 6 }"
            :wrapper-col-props="{ span: 18 }"
            label-align="left"
          >
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item field="number" label="客户编号">
                  <a-input />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="name" label="客户名称">
                  <a-input />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="contentType" label="客户名称">
                  <a-select />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="filterType" label="客户名称">
                  <a-select />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="createdTime" label="客户名称">
                  <a-range-picker style="width: 100%" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="status" label="客户名称">
                  <a-select />
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-col>
        <a-divider style="height: 84px" direction="vertical" />
        <a-col :flex="'86px'" style="text-align: right">
          <a-space direction="vertical" :size="18">
            <a-button type="primary">
              <template #icon>
                <icon-search />
              </template>
              查询
            </a-button>
            <a-button>
              <template #icon>
                <icon-refresh />
              </template>
              重置
            </a-button>
          </a-space>
        </a-col>
      </a-row>
      <a-divider style="margin-top: 0" />
      <a-row style="margin-bottom: 16px">
        <a-col :span="16">
          <a-space>
            <a-button type="primary" @click="onAdd">
              <template #icon>
                <icon-plus />
              </template>
              新建
            </a-button>
            <a-upload action="/">
              <template #upload-button>
                <a-button>
                  <template #icon>
                    <icon-upload />
                  </template>
                  导入
                </a-button>
              </template>
            </a-upload>
          </a-space>
        </a-col>
        <a-col :span="8" style="text-align: right">
          <a-button>
            <template #icon>
              <icon-download />
            </template>
            下载
          </a-button>
        </a-col>
      </a-row>
      <!-- :columns="columns" -->

      <a-table
        :bordered="{ headerCell: true, bodyCell: true }"
        row-key="key"
        size="medium"
        :data="tableData"
        row-class="table-render__row"
        :row-selection="{ type: 'checkbox' }"
      >
        <template #columns>
          <a-table-column
            v-for="item in formWidgetList"
            :key="item.key"
            :title="item.label"
            :data-index="item.key"
            class="aaaa"
          >
            <template v-if="['subform'].includes(item.type)">
              <a-table-column
                v-for="sub in item.children"
                :key="sub.key"
                :title="sub.label"
                :data-index="sub.key"
                class="subform__column"
                :body-cell-style="bodyCellStyle"
              >
                <template #cell="{ record }">
                  <div v-if="record[item.key]" class="subform-column">
                    <div
                      v-for="(val, index) in record[item.key]"
                      :key="index"
                      class="subform-column__cell"
                    >
                      {{ val[sub.key] }}
                    </div>
                  </div>
                </template>
              </a-table-column>
            </template>
            <template #cell="{ record }">
              {{ record[item.key] }}
            </template>
          </a-table-column>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script setup lang="ts" name="widget-table-render">
  import { computed } from 'vue';
  import type * as CSS from 'csstype';
  import { FormWidget } from '../types';

  const props = withDefaults(
    defineProps<{
      widgetData: FormWidget[];
      tableData: Record<string, any>[];
    }>(),
    {
      tableData: () => [],
    }
  );
  const emit = defineEmits<{
    (e: 'onAdd'): void;
  }>();
  const formWidgetList = computed(() => {
    const [formWidget] = props.widgetData;
    return formWidget.children || [];
  });
  const bodyCellStyle = {
    '--cell-padding': 0,
  } as CSS.Properties;
  const data = [
    {
      key: '1',
      customer_no: 'no.0000001',
      customer_name: '张三',
      address: '5',
      email: 'jane.doe@example.com',
      customer_contacts: [
        {
          phone: '3131',
          name: '联系人1',
        },
        {
          phone: '151',
          name: '联系人2',
        },
      ],
      customer_review: [
        {
          time: '3131',
          remake: '联系人1',
        },
      ],
    },
    {
      key: '2',
      customer_no: 'no.0000002',
      customer_name: '李四',
      salary: 25000,
      address: '35 Park Road, London',
      email: 'alisa.ross@example.com',
    },
    {
      key: '3',
      customer_no: 'no.0000003',
      customer_name: '王五',
      salary: 22000,
      address: '31 Park Road, London',
      email: 'kevin.sandra@example.com',
    },
    {
      key: '4',
      customer_no: 'no.0000004',
      customer_name: 'Ed Hellen',
      salary: 17000,
      address: '42 Park Road, London',
      email: 'ed.hellen@example.com',
    },
    {
      key: '5',
      customer_no: 'no.0000004',
      customer_name: 'William Smith',
      salary: 27000,
      address: '62 Park Road, London',
      email: 'william.smith@example.com',
    },
  ];
  function onAdd() {
    emit('onAdd');
  }
</script>

<style lang="less">
  .widget-table-render {
    // &__card {
    //   border-radius: 4px;
    //   border: none;
    //   & > .arco-card-header {
    //     height: auto;
    //     padding: 20px;
    //     border: none;
    //   }
    // }
    &__card {
      border: none;
      border-radius: 4px;

      & > .arco-card-header {
        height: auto;
        padding: 20px;
        border: none;
      }

      & > .arco-card-body {
        padding: 0 20px 20px 20px;
      }
    }

    .table-render__row {
      .arco-table-td {
        .arco-table-cell {
          // padding: 0;
          padding: var(--cell-padding, 7px 16px);
        }
      }
    }

    .subform-column {
      .subform-column__cell {
        padding: 9px 16px;
        border-bottom: 1px solid var(--color-neutral-3);

        &:last-child {
          border: none;
        }
      }
    }
  }
</style>
