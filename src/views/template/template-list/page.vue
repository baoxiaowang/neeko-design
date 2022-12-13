<template>
  <a-layout class="application-detail-page">
    <a-layout-header>
      <a-affix>
        <div class="layout-navbar">
          <NavBar title="模板管理"></NavBar>
        </div>
      </a-affix>
    </a-layout-header>
    <a-layout class="app-detail__body">
      <div class="app-detail__tools">
        <a-space>
          <a-input-search placeholder="搜索" />
          <a-dropdown @select="drapMenuSelect">
            <a-button type="primary">
              <template #icon>
                <icon-plus />
              </template>
            </a-button>
            <template #content>
              <template v-for="(item, index) in drapMenu" :key="index">
                <a-dsubmenu
                  v-if="item.children?.length"
                  trigger="hover"
                  value="view-form"
                >
                  <template #icon>
                    <component :is="item.icon" />
                  </template>
                  <template #default>{{ item.label }}</template>
                  <template #content>
                    <a-doption
                      v-for="sub in item.children"
                      :key="sub.key"
                      :value="sub.key"
                    >
                      <template #icon>
                        <div>
                          <component :is="sub?.icon" />
                        </div>
                      </template>
                      <template #default>{{ sub.label }}</template>
                    </a-doption>
                  </template>
                </a-dsubmenu>
                <a-doption v-else :value="item.key">
                  <template #icon>
                    <div>
                      <component :is="item.icon" />
                    </div>
                  </template>
                  <template #default>{{ item.label }}</template>
                </a-doption>
              </template>
            </template>
          </a-dropdown>
        </a-space>
        <a-button type="text">
          <template #icon><icon-apps /></template>
          模板管理
        </a-button>
      </div>

      <a-layout-content>
        <TableView></TableView>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts" name="application-detail-page">
  import { createPage, PageTypeEnum } from '@/api/page';
  import NavBar from '@/components/navbar/index.vue';
  import { computed, onMounted, ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { createPageByType, getPagePath } from '@/utils/page';
  import TableView from './components/table-view.vue';

  const router = useRouter();
  const route = useRoute();

  const drapMenu = [
    {
      icon: 'icon-bookmark',
      key: 1,
      label: '页面视图',
      children: [
        {
          icon: 'icon-computer',
          key: PageTypeEnum.pc,
          label: '网页端页面',
        },
        {
          icon: 'icon-mobile',
          key: PageTypeEnum.mobile,
          label: '移动端页面',
        },
      ],
    },
    {
      icon: 'icon-nav',
      key: '2',
      label: '数据表单',
      children: [
        {
          icon: 'icon-nav',
          key: PageTypeEnum.form,
          label: '普通表单',
        },
        {
          icon: 'icon-relation',
          key: PageTypeEnum.processForm,
          label: '流程表单',
        },
      ],
    },
    {
      key: PageTypeEnum.link,
      icon: 'icon-link',
      label: '外部链接',
    },
  ];
  const appId = computed<any>(() => {
    return route.params?.appId || '';
  });
  async function drapMenuSelect(key: any) {
    const {
      data: { insertedId },
    } = await createPageByType(appId.value, key, {
      name: '未命名页面',
    });
    const path = getPagePath(insertedId, key);
    router.push({
      path,
    });
  }
</script>

<style lang="less">
  .application-detail-page {
    height: 100%;

    .app-detail__body {
      display: flex;
      flex: 1;
      align-items: stretch;
      padding: 12px;
    }

    .left-sider {
      padding: 16px;
    }

    .app-page__list {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      margin-top: 12px;
    }

    .app-detail__tools {
      display: flex;
      justify-content: space-between;
      margin-bottom: 12px;
      padding: 12px 0;
    }
  }
</style>
