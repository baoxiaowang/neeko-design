<template>
  <a-tag :color="pageTypeConfig.color" class="page-type-tag">
    <template #icon>
      <span class="page-tag__icon">
        <component :is="pageTypeConfig.icon" color="#fff"
      /></span>
    </template>
    {{ pageTypeConfig.label }}
  </a-tag>
</template>

<script setup lang="ts" name="page-type-tag">
  import { PageTypeEnum, PageTypeNameEnum } from '@/api/page';
  import { computed } from 'vue';

  const props = defineProps<{
    pageType: PageTypeEnum;
  }>();

  const pageTypeConfig = computed(() => PageTypeNameEnum[props.pageType]);
</script>

<style lang="less">
  .page-type-tag {
    .page-tag__icon {
      color: #fff;
    }
  }
</style>
