<template>
  <a-tag v-for="item in memberList" :key="item.id">{{ item.userName }}</a-tag>
</template>

<script setup lang="ts" name="address-detail">
  import WidgetConfigs from '@/widgets/config.index';
  import { computed, ref, watchEffect } from 'vue';
  import { formatMember } from 'src/widgets/utils';
  import { MemberModel } from '@/types/global';

  const props = defineProps<{
    value?: string;
  }>();
  const memberList = ref<MemberModel[]>([]);
  watchEffect(() => {
    if (!props.value) return;
    formatMember([props.value]).then((list) => {
      memberList.value = list;
    });
  });
</script>

<style lang="less"></style>
