<template>
  <div class="design-form__page">
    <ElScrollbar>
      <renderProvider :meta="{}" mode="design">
        <renderWidgetVue
          v-for="item in widgets"
          :key="item.key"
          :node="item"
          :meta="{}"
        />
      </renderProvider>
    </ElScrollbar>
  </div>
</template>

<script setup lang="ts" name="index">
  import { useDesignStore } from '@/store';
  import renderWidgetVue from '@/widgets/render/render-widget.vue';
  import renderProvider from '@/widgets/render/render-provider.vue';

  useDesignStore().initState('form');
  const store = useDesignStore();
  const widgets = store.widgetList;
</script>

<style lang="less">
  .design-form__page {
    height: 100%;
  }
</style>
