<template>
  <a-select
    :model-value="value"
    style="width: 100%"
    placeholder=""
    :loading="loading"
    allow-search
    @change="handleChange"
    @search="handleSearch"
  >
    <a-option v-for="(item, index) in options" :key="index" :value="item.label">
      {{ item.label }}
    </a-option>
  </a-select>
</template>

<script setup lang="ts" name="input-render">
  import { getWidgetValue } from '@/api/widgets';
  import useWidgetInject from '@/widgets/hooks/useWidgetInject';
  import { computed, onBeforeMount, ref, watchEffect } from 'vue';
  import { InputWidget, SelectWidget } from '../../types';

  const { isSubWidget } = useWidgetInject();
  interface RenderProps {
    node: SelectWidget;
    value?: string;
  }
  const props = defineProps<RenderProps>();
  const emit = defineEmits<{
    (e: 'update:value', d: string | undefined): void;
  }>();
  const loading = ref<boolean>(false);
  const optionConfig = computed(() => props.node.optionConfig || {});
  const linkOpions = ref<any[]>([]);
  const options = computed(() => {
    if (optionConfig.value?.optionType === 'custom') {
      return optionConfig.value.options;
    }
    if (optionConfig.value?.optionType === 'link') {
      return linkOpions.value;
    }
    return props.node.optionConfig?.options || [];
  });

  function handleSearch(word: string) {
    if (optionConfig.value?.optionType !== 'link') {
      return [];
    }
    const [_, LinkFormId, LinkKey] = optionConfig.value?.optionLink || [];
    getWidgetValue({ formId: LinkFormId, widgetKey: LinkKey, word }).then(
      (data) => {
        linkOpions.value = data.data;
      }
    );
    return [];
  }
  function handleChange(val: any) {
    emit('update:value', val);
  }
  watchEffect(() => {
    handleSearch('');
  });
</script>

<style lang="less">
  // .input-render {
  // }
</style>
