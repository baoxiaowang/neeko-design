<template>
  <DeptInput
    v-model:value="deptValue"
    :style="{ width: '100%' }"
    readonly
    @click="modalVisible = true"
  >
  </DeptInput>
  <memberDeptModal
    v-model:visible="modalVisible"
    :default-value="deptValue"
    type="dept"
    @ok="memberConfirm"
  ></memberDeptModal>
</template>

<script setup lang="ts" name="input-render">
  import { computed, ref } from 'vue';
  // import useWidgetInject from '@/widgets/hooks/useWidgetInject';
  import memberDeptModal from 'src/widgets/common/member-dept-modal.vue';
  import DeptInput from 'src/widgets/common/dept-input.vue';
  import { InputWidget } from '../../types';

  const modalVisible = ref(false);
  // const { isSubWidget } = useWidgetInject();
  interface RenderProps {
    node: InputWidget;
    value: string;
  }
  const props = withDefaults(defineProps<RenderProps>(), {
    value: '',
  });
  const emit = defineEmits<{
    (e: 'update:value', d: string): void;
  }>();

  const deptValue = computed<string[]>({
    get() {
      const ids = props.value ? [props.value] : [];
      return ids;
    },
    set(val = []) {
      emit('update:value', val[0]);
    },
  });
  function memberConfirm(memberIds: string[]) {
    deptValue.value = memberIds;
  }
</script>

<style lang="less">
  // .input-render {
  // }
</style>
