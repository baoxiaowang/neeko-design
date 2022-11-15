<template>
  <a-tag v-for="item in deptList" :key="item.id" class="dept-detail__tag">{{
    item.name
  }}</a-tag>
</template>

<script setup lang="ts" name="address-detail">
  import { ref, watchEffect } from 'vue';
  import { getDept } from 'src/widgets/utils';
  import { DeptModel } from '@/api/dept';

  const props = defineProps<{
    value?: string[];
  }>();
  const deptList = ref<DeptModel[]>([]);
  watchEffect(() => {
    if (!props.value) return;
    getDept(props.value).then((list) => {
      deptList.value = list;
    });
  });
</script>

<style lang="less">
  .dept-detail__tag {
    margin-right: 4px;
  }
</style>
