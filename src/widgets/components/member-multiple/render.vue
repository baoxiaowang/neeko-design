<template>
  <MemberInput
    v-model:value="memberValue"
    readonly
    multiple
    @click="modalVisible = true"
  >
  </MemberInput>
  <memberDeptModal
    v-model:visible="modalVisible"
    type="member-multiple"
    :default-value="memberValue"
    @ok="memberConfirm"
  ></memberDeptModal>
</template>

<script setup lang="ts" name="input-render">
  import useWidgetInject from '@/widgets/hooks/useWidgetInject';
  import MemberInput from 'src/widgets/common/member-input.vue';
  import { computed, ref } from 'vue';
  import memberDeptModal from 'src/widgets/common/member-dept-modal.vue';
  import { InputWidget } from '../../types';

  const modalVisible = ref(false);
  const { isSubWidget } = useWidgetInject();
  interface RenderProps {
    node: InputWidget;
    value: string[];
  }
  const props = withDefaults(defineProps<RenderProps>(), {
    value: () => [],
  });
  const emit = defineEmits<{
    (e: 'update:value', d: string[]): void;
  }>();

  const memberValue = computed<string[]>({
    get() {
      const ids = props.value ? props.value : [];
      return ids;
    },
    set(val = []) {
      emit('update:value', val);
    },
  });
  function memberConfirm(memberIds: string[]) {
    memberValue.value = memberIds;
  }
</script>

<style lang="less">
  // .input-render {
  // }
</style>
