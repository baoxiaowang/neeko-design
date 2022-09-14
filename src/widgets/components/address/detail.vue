<template>
  {{ addressWidgetConfig.toString!(value) || '&nbsp;' }}
</template>

<script setup lang="ts" name="address-detail">
  import { IAddressValue } from '@/widgets/types';
  import WidgetConfigs from '@/widgets/config.index';

  const addressWidgetConfig = WidgetConfigs.address;

  const props = defineProps<{
    value?: IAddressValue;
  }>();
  // const emit = defineEmits();
</script>

<style lang="less">
  .address-detail {
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>
