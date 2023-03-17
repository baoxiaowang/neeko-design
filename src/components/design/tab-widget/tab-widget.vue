<template>
  <view class="tab-widget">
    <nut-tabs v-model="state.tab2value" :auto-height="true">
      <nut-tabpane title="Tab 1" pane-key="0">
        <p>Tab 1</p>
        <p>Tab 1</p>
        <p>Tab 1</p>
        <p>Tab 1</p>
      </nut-tabpane>
      <nut-tabpane title="Tab 2" pane-key="1"> Tab 2 </nut-tabpane>
      <nut-tabpane title="Tab 3" pane-key="2"> Tab 3 </nut-tabpane>
    </nut-tabs>
  </view>
</template>

<script setup lang="ts" name="tab-widget">
  // const props = defineProps();
  import { reactive } from 'vue';
  // const emit = defineEmits();
  const state = reactive({
    tab2value: '0',
  });
</script>

<style lang="less">
  .tab-widget {
  }
</style>
