<template>
  <a-layout class="application-page">
    <a-affix v-if="navbar">
      <div class="layout-navbar">
        <NavBar title="应用管理"></NavBar>
      </div>
    </a-affix>

    <a-layout class="application__body">
      <div class="application__action" fill>
        <h1>我的应用</h1>
        <a-button type="primary" @click="createForm">
          <template #icon>
            <icon-plus />
          </template>
          创建应用
        </a-button>
      </div>

      <div class="application__filter">
        <a-radio-group default-value="-1">
          <a-radio v-for="item in AppType" :key="item.key" :value="item.key">
            <template #radio="{ checked }">
              <a-tag color="arcoblue" :checked="checked" checkable>{{
                item.label
              }}</a-tag>
            </template>
          </a-radio>
        </a-radio-group>
        <a-input-search :style="{ width: '280px' }" placeholder="搜索应用" />
      </div>
      <div class="application__grid">
        <!-- <applicationCard></applicationCard> -->
        <applicationCard
          v-for="item in appList"
          :key="item._id"
          :item="item"
          @del="delApp"
        ></applicationCard>
        <div class="empty-create__card" @click="createForm">
          <div class="empty-create__btn">
            <icon-plus />
            <span>创建应用</span>
          </div>
        </div>
      </div>
    </a-layout>
  </a-layout>
  <applicationFormVue
    v-model:visible="visible"
    @cancel="handleCancel"
  ></applicationFormVue>
</template>

<script setup lang="ts" name="application-page">
  import NavBar from '@/components/navbar/index.vue';
  import { computed, onMounted, ref } from 'vue';
  import { useAppStore } from '@/store';
  import { getAppList, delApp as delOneApp } from '@/api/application';
  import applicationFormVue from './components/application-form.vue';
  import applicationCard from './components/application-card.vue';

  export interface AppModel {
    _id: string;
    name: string;
    icon: string;
    color: string;
    tags: string[];
    describe: string;
  }
  // const props = defineProps();
  // const emit = defineEmits();
  const appStore = useAppStore();
  const visible = ref<boolean>(false);
  const AppType = [
    {
      key: '-1',
      label: '全部应用',
    },
    {
      key: '1',
      label: '我创建的',
    },
    {
      key: '2',
      label: '其他',
    },
    {
      key: '0',
      label: '回收站',
    },
  ];
  const appList = ref<AppModel[]>([]);

  const navbar = computed(() => appStore.navbar);
  function createForm() {
    visible.value = true;
  }

  function handleCancel() {
    //
  }
  function delApp(id: string) {
    delOneApp(id);
  }
  onMounted(async () => {
    const { data } = await getAppList();
    appList.value = data;
  });
</script>

<style lang="less">
  .application-page {
    flex: 1;
    height: 100%;

    .application__body {
      flex: 1;
      width: 1200px;
      margin: 0 auto;
      padding: 0 12px;
      background: var(--color-fill-0);
    }

    .application__action {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 0;
    }

    .application__filter {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .filter-select {
      display: flex;
      flex: 1;
      justify-content: flex-end;
    }

    .application__grid {
      display: grid;
      grid-auto-rows: minmax(218px, auto);
      grid-row: auto;
      grid-row-gap: 20px;
      grid-column-gap: 20px;
      grid-template-columns: repeat(4, 1fr);
      align-items: center;
      margin-top: 20px;
    }

    .empty-create__card {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      border: 1px solid var(--color-neutral-3);
      border-radius: var(--border-radius-small);
      cursor: pointer;
      transition: all 300ms;

      &:hover {
        color: rgb(var(--arcoblue-6));
        background-color: var(--color-neutral-2);
      }
    }

    .empty-create__btn {
      span {
        margin-left: 6px;
      }
    }
  }
</style>
