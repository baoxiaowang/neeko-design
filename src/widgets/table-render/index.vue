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
      <a-table
        :bordered="{ headerCell: true, bodyCell: true }"
        row-key="id"
        size="medium"
        :data="tableData"
        row-class="table-render__row"
        :row-selection="{ type: 'checkbox', showCheckedAll: true }"
      >
        <template #columns>
          <a-table-column
            v-for="item in formWidgetList"
            :key="item.key"
            :title="item.label"
            :data-index="item.key"
            ellipsis
            tooltip
            :width="['subform'].includes(item.type) ? undefined : 100"
          >
            <template v-if="['subform'].includes(item.type)">
              <a-table-column
                v-for="sub in item.children"
                :key="sub.key"
                :title="sub.label"
                :data-index="sub.key"
                class="subform__column"
                :body-cell-style="bodyCellStyle"
                :width="100"
                ellipsis
              >
                <template #cell="{ record }">
                  <div v-if="record[item.key]" class="subform-column">
                    <div
                      v-for="(val, index) in record[item.key]"
                      :key="index"
                      class="subform-column__cell"
                    >
                      <template v-if="WidgetDetail[sub.type]">
                        <component
                          :is="WidgetDetail[sub.type]"
                          :value="val[sub.key]"
                        />
                      </template>
                      <template v-else>
                        {{ val[sub.key] || '&nbsp;' }}
                      </template>
                    </div>
                  </div>
                </template>
              </a-table-column>
            </template>
            <template #cell="{ record }">
              <template v-if="WidgetDetail[item.type]">
                <component
                  :is="WidgetDetail[item.type]"
                  :value="record[item.key]"
                />
              </template>
              <template v-else>
                {{ record[item.key] }}
              </template>
            </template>
          </a-table-column>

          <a-table-column fixed="right" :width="220" title="操作" align="right">
            <template #cell="{ record }">
              <a-button-group size="small">
                <a-button type="text" @click="() => record">查看</a-button>
                <a-button type="text" @click="() => record">编辑</a-button>
                <a-popconfirm
                  content="确定删除该页面？"
                  ok-text="删除"
                  cancel-text="取消"
                  position="br"
                  @ok="delFormData(record.id)"
                >
                  <a-button type="text" status="danger">删除</a-button>
                </a-popconfirm>
              </a-button-group>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script setup lang="ts" name="widget-table-render">
  import { computed, onBeforeMount } from 'vue';
  import type * as CSS from 'csstype';
  import WidgetDetail from 'src/widgets/detail.index';
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
    (e: 'onDel', d: string): void;
  }>();
  const formWidgetList = computed(() => {
    const [formWidget] = props.widgetData;
    return formWidget?.children || [];
  });
  const bodyCellStyle = {
    '--cell-padding': 0,
  } as CSS.Properties;
  function onAdd() {
    emit('onAdd');
  }
  function delFormData(id: string) {
    emit('onDel', id);
  }
</script>

<style lang="less">
  .widget-table-render {
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
      display: flex;
      flex-direction: column;

      .subform-column__cell {
        flex: 1;
        flex-shrink: 0;
        padding: 9px 16px;
        overflow: hidden;
        text-overflow: ellipsis;
        border-bottom: 1px solid var(--color-neutral-3);

        &:last-child {
          border: none;
        }
      }
    }
  }
</style>
