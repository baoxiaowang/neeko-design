<template>
  <ConfigBlockVue class="attr-width">
    <template #label>
      <span class="attr-width__span">字段宽度</span>
    </template>
    <a-radio-group :value="width" type="button" @change="changeAttr">
      <a-radio value="25">25</a-radio>
      <a-radio value="50">50</a-radio>
      <a-radio value="75">75</a-radio>
      <a-radio value="100">100</a-radio>
    </a-radio-group>

    <div class="attr-block">
      <a-checkbox v-model="check">独占一行</a-checkbox>
    </div>
  </ConfigBlockVue>
</template>

<script setup lang="ts" name="attr-width">
  import { computed } from 'vue';
  import ConfigBlockVue from '../common/config-block.vue';

  const props = defineProps<{
    width: string;
    block: number;
  }>();
  const emit = defineEmits<{
    (n: 'change', e: string): void;
    (n: 'changeBlock', e: number): void;
  }>();
  function changeAttr(val: any) {
    emit('change', val.toString());
    return val;
  }
  const check = computed<boolean>({
    get() {
      return !!props.block;
    },
    set(val) {
      emit('changeBlock', +val);
    },
  });
</script>

<style lang="less">
  .attr-width {
    .attr-width__span {
      display: flex;
      align-items: center;

      &::after {
        display: block;
        margin-left: 4px;
        color: rgb(var(--arcoblue-6));
        font-weight: 700;
        content: '%';
      }
    }

    .attr-block {
      margin-top: 6px;
    }
  }
</style>
