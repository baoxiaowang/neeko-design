<template>
  <component :is="comp"></component>
</template>

<script setup lang="ts" name="text-render">
  import { Widget } from '@/widgets/types';
  import { ref, defineComponent } from 'vue';

  const props = defineProps<{
    node: Widget;
    state: any;
    meta: any;
  }>();
  const comp = ref(null);
  const divTemp = document.createElement('div');
  divTemp.id = 'tt';
  divTemp.innerHTML = props.node?.config?.code || '';
  const tmpContent = divTemp.querySelector('template')?.innerHTML;
  const opt =
    divTemp
      .querySelector('script')
      ?.innerHTML.replace(/export[\s]default/g, '')
      ?.replace(/^\n/, '') || '';
  try {
    // eslint-disable-next-line no-new-func
    const copt = new Function(`return ${opt}`)();
    const options = {
      ...copt,
      template: tmpContent,
    };
    const codeComp = defineComponent(options);
    comp.value = codeComp as any;
  } catch (error) {
    const options = {
      template: tmpContent,
    };
    const codeComp = defineComponent(options);
    comp.value = null;
  }
</script>

<style lang="less">
  .design-mode {
    .widget-text {
      // cursor: pointer;
    }
  }
</style>
