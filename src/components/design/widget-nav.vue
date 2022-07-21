<template>
  <div class="widget-nav">
    <a-breadcrumb class="widget-level" :max-count="3">
      <template #separator>
        <icon-right />
      </template>
      <template v-for="item in breadcrumbLsit" :key="item.key">
        <a-breadcrumb-item>
          <div
            class="widget-lev-item el-breadcrumb__inner is-link"
            @click="checkParent(item)"
          >
            {{ item.title }}
          </div>
        </a-breadcrumb-item>
      </template>
    </a-breadcrumb>
  </div>
</template>

<script lang="ts" setup name="WidgetLevel">
  import { computed } from 'vue';
  import WidgetConfigs from '@/widgets/config.index';
  import { useDesignStore } from '@/store';
  import { Widget } from '@/widgets/types';

  const store = useDesignStore();
  const activeKey = computed(() => {
    return store.selectedKey;
  });
  const levList = computed(() => {
    const res: Widget[] = [];
    function getParent(key: string) {
      const self = store.widgetMap[key];
      let parent = store.widgetParentMap[key];
      if (self) {
        res.push(self);
      }
      while (parent) {
        res.push(parent);
        parent = store.widgetParentMap[parent.key];
      }
    }
    getParent(activeKey.value);
    return res;
  });
  const breadcrumbLsit = computed(() => {
    return levList.value
      .map((i) => {
        return { title: WidgetConfigs[i.type].title, key: i.key };
      })
      .reverse();
  });
  function checkParent({ key }: any) {
    // store.commit('setWidgetKey', key);
    // store.commit('setHoveredKey', '');
  }
</script>

<style lang="less">
  .widget-nav {
    position: relative;
    z-index: 30;
    display: flex;
    align-items: center;
    height: 40px;
    padding: 0 10px;
    font-size: 12px;
    background: #fff;
    box-shadow: 0 4px 6px #0c1f500a;

    .widget-level {
      display: flex;
      align-items: center;
      height: 30px;
      // padding: 12px;
      font-size: 12px;
      line-height: normal !important;

      .widget-lev-item {
        cursor: pointer;
      }
    }
  }
</style>
