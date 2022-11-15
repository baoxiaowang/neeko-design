<template>
  <a-tag v-for="item in memberList" :key="item.id" class="member-detail__tag">{{
    item.userName
  }}</a-tag>
</template>

<script setup lang="ts" name="address-detail">
  import { ref, watchEffect } from 'vue';
  import { formatMember } from 'src/widgets/utils';
  import { MemberModel } from '@/types/global';

  const props = defineProps<{
    value?: string[];
  }>();
  const memberList = ref<MemberModel[]>([]);
  watchEffect(() => {
    if (!props.value) return;
    formatMember(props.value).then((list) => {
      memberList.value = list;
    });
  });
</script>

<style lang="less">
  .member-detail__tag {
    margin-right: 4px;
  }
</style>
