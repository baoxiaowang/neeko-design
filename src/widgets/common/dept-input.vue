<template>
  <div class="dept-input">
    <a-input-tag
      ref="inputTag"
      :model-value="value"
      :style="{ width: '100%' }"
      allow-clear
      placeholder="请选择部门"
      @change="handleChange"
      @focus="handleFocus"
      @clear="handleClear"
    >
      <template #tag="{ data }">
        <div class="input-tag__slot">
          {{ deptMap[data.value] || data.value }}
        </div>
      </template>
    </a-input-tag>
  </div>
</template>

<script setup lang="ts" name="member-input">
  import { getDeptByIds } from '@/api/dept';
  import { ref, watch } from 'vue';
  import { useUserStore } from '@/store';

  const userStore = useUserStore();

  const props = defineProps<{
    value: string[];
  }>();
  const emit = defineEmits<{
    (e: 'update:value', d: string[]): void;
  }>();

  const textTagValue = ref<string[]>();
  const inputTag = ref<any>();
  function handleFocus() {
    inputTag.value?.blur();
  }
  function handleChange(val: string[]) {
    emit('update:value', val);
  }
  function handleClear(e: MouseEvent) {
    e.stopImmediatePropagation();
  }
  const deptMap: Record<string, string> = {
    '0': `${userStore.companyName}`,
  };
  watch(
    () => props.value,
    (val = []) => {
      const catchVal: string[] = [];
      val.forEach((id) => {
        const catchDept = window.globalData.deptCacheMap[id];
        if (catchDept) {
          catchVal.push(catchDept.name);
          deptMap[id] = catchDept.name;
        }
      });
      // 命中缓存
      if (catchVal.length === val.length) {
        textTagValue.value = catchVal;
      } else {
        getDeptByIds(val).then((data) => {
          data.forEach((item: any) => {
            deptMap[item.id] = item.name;
          });
        });
      }
    }
  );
</script>

<style lang="less">
  .dept-input {
    .input-tag__slot {
      display: flex;
      align-items: center;
    }
  }
</style>
