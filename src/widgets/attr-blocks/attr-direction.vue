<template>
  <ConfigBlockVue label="排列" class="attr-direction">
    <a-radio-group
      :model-value="direction"
      @update:model-value="changeDirection"
    >
      <a-radio value="vertical">竖向排布</a-radio>
      <a-radio value="horizontal">横线排布</a-radio>
    </a-radio-group>
  </ConfigBlockVue>
</template>

<script setup lang="ts" name="attr-direction">
  import ConfigBlockVue from '../common/config-block.vue';
  import { OptionWidget } from '../types';

  const props = defineProps<{
    node: OptionWidget;
    direction: 'horizontal' | 'vertical' | undefined;
    change: (e: Partial<OptionWidget>) => void;
  }>();
  function changeDirection(val: any) {
    props.change({
      optionConfig: {
        ...props.node.optionConfig,
      },
    });
  }
</script>

<style lang="less">
  .attr-direction {
  }
</style>
