<template>
  <a-layout class="application-detail-page">
    <a-layout-header>
      <a-affix>
        <div class="layout-navbar">
          <NavBar title="应用管理"></NavBar>
        </div>
      </a-affix>
    </a-layout-header>
    <a-layout class="app-detail__body">
      <a-layout-sider :width="250">
        <div class="left-sider">
          <a-space>
            <a-input-search placeholder="搜索页面、表单" />
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
          <div class="app-page__list">
            <div class="app-page__list-item"> 全部客户 </div>
            <div class="app-page__list-item"> 合同订单 </div>
          </div>
        </div>
      </a-layout-sider>
      <a-layout-content>Content</a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts" name="application-detail-page">
  import NavBar from '@/components/navbar/index.vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  // eslint-disable-next-line no-shadow
  const enum PageTypeEnum {
    view,
    pc,
    mobile,
    form,
    processForm,
    link,
  }
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
  // const props = defineProps();
  // const emit = defineEmits();
  function drapMenuSelect(key: any) {
    switch (key) {
      case PageTypeEnum.form:
        router.push({
          path: '/design/form',
        });
        break;
      case PageTypeEnum.processForm:
        router.push({
          path: '/design/form',
        });
        break;
      case PageTypeEnum.pc:
        router.push({
          path: '/design/page',
        });
        break;
      case PageTypeEnum.mobile:
        router.push({
          path: '/design/page',
        });
        break;

      default:
        break;
    }
  }
</script>

<style lang="less">
  .application-detail-page {
    height: 100%;

    .app-detail__body {
      display: flex;
      flex: 1;
      align-items: stretch;
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

    .app-page__list-item {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      box-sizing: border-box;
      height: 36px;
      margin: 2px 0;
      padding: 0 10px;
      font-size: 14px;
      border-radius: var(--border-radius-small, 2);
      cursor: pointer;

      &:hover {
        background-color: var(--color-neutral-2);
      }
    }
  }
</style>
