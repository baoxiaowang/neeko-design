<template>
  <div class="detail-render">
    <a-image-preview-group infinite>
      <a-space>
        <a-image
          v-for="(item, index) in value"
          :key="index"
          height="34px"
          :src="item.url"
        />
      </a-space>
    </a-image-preview-group>
  </div>
</template>

<script setup lang="ts" name="detail-render">
  import { IFileItem } from '@/widgets/types';

  // eslint-disable-next-line vue/no-setup-props-destructure
  const { value = [] } = defineProps<{
    value?: IFileItem[];
  }>();
  // const emit = defineEmits();
</script>

<style lang="less">
  .detail-render {
  }
</style>
