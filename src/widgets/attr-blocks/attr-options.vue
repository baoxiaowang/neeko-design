<template>
  <ConfigBlockVue label="选项" class="attr-options">
    <VueDraggable v-model="val">
      <template #item="{ element }">
        <a-input :model-value="element.label"></a-input>
      </template>
    </VueDraggable>
  </ConfigBlockVue>
</template>

<script setup lang="ts" name="attr-options">
  import VueDraggable from '@/components/vue-draggable/src/vuedraggable';
  import { ref } from 'vue';
  import ConfigBlockVue from '../common/config-block.vue';

  // defineProps<any>();
  const val = ref([
    {
      label: '33',
      value: '',
      defalut: false,
    },
    {
      label: '33',
      value: '',
      defalut: false,
    },
  ]);
</script>

<style lang="less">
  .attr-options {
  }
</style>
