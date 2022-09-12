<template>
  <a-popover
    v-if="isSubWidget"
    :content-style="{ width: '300px' }"
    position="bottom"
    trigger="click"
  >
    <div class="arco-input-wrapper address-render__sub" style="height: 32px">
      {{ addressWidgetConfig.toString!(value) }}
    </div>
    <template #content>
      <address-render
        v-bind="props"
        @update:value="(val: IAddressValueProp) => emit('update:value', val)"
      />
    </template>
  </a-popover>
  <a-space v-else direction="vertical" fill>
    <a-cascader
      v-model="cascaderVal"
      expand-child
      path-mode
      :options="options"
      :field-names="fieldNames"
      :style="{ width: '100%' }"
      allow-clear
      placeholder="请选择城市"
    />
    <a-textarea
      :model-value="value?.address"
      placeholder="请输入详细地址"
      style="height: 80px"
      allow-clear
      @update:model-value="changeDetail"
    />
  </a-space>
</template>

<script setup lang="ts" name="address-render">
  import useWidgetInject from '@/widgets/hooks/useWidgetInject';
  import { computed, provide } from 'vue';
  import AddressJson from '@/assets/address/pca-code.json';
  import WidgetConfigs from '@/widgets/config.index';
  import { IAddressValue, InputWidget } from '../../types';

  const addressWidgetConfig = WidgetConfigs.address;
  interface IAddressValueProp {
    province: string;
    city: string;
    district: string;
    address?: string;
  }

  interface RenderProps {
    node: InputWidget;
    value?: IAddressValueProp;
  }
  const props = withDefaults(defineProps<RenderProps>(), {
    value() {
      return {
        province: '',
        city: '',
        district: '',
        address: '',
      };
    },
  });
  const emit = defineEmits<{
    (e: 'update:value', d: IAddressValue | undefined): void;
  }>();
  provide('isSubWidget', false);
  const { isSubWidget } = useWidgetInject();
  const options = AddressJson;
  const fieldNames = { value: 'name', label: 'name' };
  const cascaderVal = computed({
    get() {
      const { province, city, district } = props.value || {};
      return [province, city, district].filter((item) => !!item);
    },
    set(val: any) {
      const [province, city, district] = val;
      emit('update:value', { ...props.value, province, city, district });
    },
  });
  function changeDetail(val: string) {
    emit('update:value', {
      ...props.value,
      address: val,
    });
  }
</script>

<style lang="less">
  // .input-render {
  // }
  .address-render__sub {
    display: block !important;
    align-items: center;
    overflow: hidden;
    line-height: 32px;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>
