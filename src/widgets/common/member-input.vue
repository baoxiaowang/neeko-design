<template>
  <div class="member-input">
    <a-input-tag
      ref="inputTag"
      :model-value="value"
      :style="{ width: '100%' }"
      allow-clear
      placeholder="请选择用户"
      @change="handleChange"
      @focus="handleFocus"
      @clear="handleClear"
    >
      <template #tag="{ data }">
        <div class="input-tag__slot">
          <a-avatar
            :size="18"
            :style="{ backgroundColor: '#3370ff', verticalAlign: 'middle' }"
          >
            <IconUser />
          </a-avatar>
          {{ memberMap[data.value] || data.value }}
        </div>
      </template>
    </a-input-tag>
  </div>
</template>

<script setup lang="ts" name="member-input">
  import { getMemberByIds } from '@/api/member';
  import { ref, watch } from 'vue';

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
  const memberMap: Record<string, string> = {};
  watch(
    () => props.value,
    (val = []) => {
      const catchVal: string[] = [];
      val.forEach((id) => {
        const catchMember = window.globalData.memberCacheMap[id];
        if (catchMember) {
          catchVal.push(catchMember.userName);
          memberMap[id] = catchMember.userName;
        }
      });
      // 命中缓存
      if (catchVal.length === val.length) {
        textTagValue.value = catchVal;
      } else {
        getMemberByIds(val).then((data) => {
          data.forEach((item: any) => {
            memberMap[item.id] = item.userName;
          });
        });
      }
    }
  );
</script>

<style lang="less">
  .member-input {
    .input-tag__slot {
      display: flex;
      align-items: center;
    }
  }
</style>
