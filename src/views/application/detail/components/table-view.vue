<template>
  <div class="table-view">
    <a-table
      column-resizable
      filter-icon-align-left
      :pagination="false"
      :data="pageList"
    >
      <template #columns>
        <a-table-column
          v-for="col in columns"
          :key="col.dataIndex"
          :title="col.title"
          :data-index="col.dataIndex"
          :width="col.width"
          :align="(col.align as any) || 'left'"
          :sortable="(col.sortable as any)"
          :filterable="col.filterable"
        >
          <template v-if="col.dataIndex === 'action'" #cell="{ record }">
            <a-button
              type="text"
              @click="handerPageAction('promotion', record)"
            >
              推广
            </a-button>
            <a-button type="text" @click="handerPageAction('edit', record)">
              编辑
            </a-button>
            <a-popconfirm
              content="确定删除该页面？"
              ok-text="删除"
              cancel-text="取消"
              position="br"
              @ok="handerPageAction('del', record)"
            >
              <a-button type="text" status="danger"> 删除 </a-button>
            </a-popconfirm>
          </template>
          <template v-else-if="col.dataIndex === 'pageType'" #cell="{ record }">
            <pageTypeTagVue :page-type="record[col.dataIndex]"></pageTypeTagVue>
          </template>
          <template v-else-if="col.dataIndex === 'status'" #cell="{ record }">
            {{ record[col.dataIndex] === '1' ? '已发布' : '有更新' }}
          </template>
          <template v-else-if="col.dataIndex === 'scope'" #cell="{ record }">
            {{ record[col.dataIndex] === '1' ? '私有' : '公开' }}
          </template>
          <template
            v-else-if="col.dataIndex === 'updateTime'"
            #cell="{ record }"
          >
            {{ record && Date.now() }}
          </template>
        </a-table-column>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts" name="table-view">
  import {
    delPage,
    getListByAppId,
    PageModel,
    PageTypeNameEnum,
  } from '@/api/page';
  import { computed, onMounted, ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { getPagePath } from 'src/utils/page';
  import pageTypeTagVue from './page-type-tag.vue';

  const route = useRoute();
  const router = useRouter();
  const appId = computed<any>(() => {
    return route.params?.appId || '';
  });
  const columns = [
    {
      title: '页面名称',
      dataIndex: 'name',
    },
    {
      title: '页面类型',
      dataIndex: 'pageType',
      filterable: {
        filters: [
          {
            text: '网页端页面',
            value: '20000',
          },
          {
            text: '移动端页面',
            value: '30000',
          },
        ],
        filter: (value: any, record: any) => record.salary > value,
        multiple: true,
      },
    },
    {
      title: '页面状态',
      dataIndex: 'status',
      filterable: {
        filters: [
          {
            text: '已发布',
            value: '1',
          },
          {
            text: '待发布',
            value: '0',
          },
        ],
        filter: (value: any, record: any) => record.salary > value,
        multiple: true,
      },
    },
    {
      title: '可见范围',
      dataIndex: 'scope',
      filterable: {
        filters: [
          {
            text: '私有',
            value: '0',
          },
          {
            text: '公开',
            value: '1',
          },
        ],
        filter: (value: any, record: any) => record.salary > value,
        multiple: true,
      },
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      sortable: {
        sortDirections: ['ascend', 'descend'],
      },
    },
    {
      width: 300,
      title: '操作',
      align: 'right',
      dataIndex: 'action',
    },
  ];
  const pageList = ref<PageModel[]>([]);
  async function setPageList() {
    const { data } = await getListByAppId({
      appId: appId.value,
    });
    pageList.value = data;
  }

  function handerPageAction(
    type: 'del' | 'edit' | 'promotion',
    row: PageModel
  ) {
    switch (type) {
      case 'edit':
        router.push({
          // eslint-disable-next-line no-underscore-dangle
          path: getPagePath(row.id, row.pageType),
        });
        break;
      case 'del':
        delPage(row.id).then(() => {
          setPageList();
        });
        break;
      default:
        break;
    }
  }

  onMounted(async () => {
    setPageList();
  });
</script>

<style lang="less">
  .table-view {
  }
</style>
