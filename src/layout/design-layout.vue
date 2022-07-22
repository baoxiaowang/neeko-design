<template>
  <a-layout class="design-layout">
    <a-layout-header>
      <!-- <top-bar></top-bar> -->
    </a-layout-header>
    <a-layout>
      <a-layout-sider :width="300">
        <DesignTools></DesignTools>
      </a-layout-sider>
      <!-- <a-layout-sider style="width: 206px; margin-left: 1px">
        Sider
      </a-layout-sider> -->
      <a-layout-content class="design-layout__content design-mode">
        <widgetNavVue></widgetNavVue>
        <router-view>
          <template #default="{ Component, route }">
            <component
              :is="Component"
              :key="route.meta.usePathKey ? route.path : undefined"
              class="design-layout__view"
            />
          </template>
        </router-view>
      </a-layout-content>
      <a-layout-sider :width="300">
        <EditorWrapVue></EditorWrapVue>
      </a-layout-sider>
    </a-layout>
  </a-layout>
  <AddWidgetDialog
    v-model:show="show"
    :current-type="currentType"
    @on-submit="onSubmit"
  ></AddWidgetDialog>
</template>

<script setup lang="ts" name="design-layout">
  import TopBar from '@/components/design/top-bar.vue';
  import DesignTools from '@/components/design/design-tools.vue';
  import EditorWrapVue from '@/components/design/editor-wrap.vue';
  import widgetNavVue from '@/components/design/widget-nav.vue';
  import AddWidgetDialog from 'src/components/design/add-widget-dialog/index.vue';
  import { useDesignStore } from '@/store';
  import { computed } from 'vue';
  import { WidgetType } from '@/widgets/types';

  const store = useDesignStore();
  const show = computed({
    get: () => {
      return store.addDialogShow;
    },
    set(val: boolean) {
      store.addDialogShow = val;
    },
  });
  const currentType = computed(() => store.currentActionWidget?.type);
  function onSubmit(type: WidgetType) {
    store.hanlderWidgetAdd(type);
  }
</script>

<style lang="less">
  .design-layout {
    width: 100%;
    height: 100vh;

    .arco-layout {
      height: 100%;
    }

    .design-layout__content {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: hidden;
    }

    .design-layout__view {
      // height: calc(100% - 40px);
      flex: 1;
      padding: 8px;
      overflow: auto;
      background: rgb(249, 250, 252);
    }
  }
</style>
