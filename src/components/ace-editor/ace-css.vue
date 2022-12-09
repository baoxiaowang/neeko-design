<template>
  <div class="ace-css">
    <AceEditor v-model:value="modelVal" language="css"></AceEditor>
  </div>
</template>

<script setup lang="ts" name="ace-css">
  import { styleObjToCode } from '@/widgets/utils';
  import { computed } from 'vue';
  import AceEditor from './index.vue';

  const props = defineProps<{
    value?: string;
  }>();
  const emit = defineEmits<{
    (e: 'update:value', d: string): void;
  }>();

  const modelVal = computed({
    get() {
      return props.value || `::node\n${styleObjToCode({})}`;
    },
    set(val: string) {
      emit('update:value', val);
    },
  });
</script>

<style lang="less">
  .ace-css {
  }
</style>
