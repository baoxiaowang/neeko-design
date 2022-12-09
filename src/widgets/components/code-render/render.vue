<template>
  <shadowCompVue
    :option="option"
    :style-text="styleText"
    :data-key="node.key"
  ></shadowCompVue>
</template>

<script setup lang="ts" name="code-render">
  import { Widget } from '@/widgets/types';
  import { ref, watch, onMounted, ComponentOptionsWithoutProps } from 'vue';
  import shadowCompVue from './shadow-components/shadow-comp.vue';

  const props = defineProps<{
    node: Widget;
    state: any;
    meta: any;
  }>();
  const styleText = ref('');
  const option = ref({});
  function createComp() {
    try {
      // 解析容器
      const divTemp = document.createElement('div');
      divTemp.innerHTML = props.node?.config?.code || '';
      const tmpContent = divTemp.querySelector('template')?.innerHTML || '';
      const styleContent = divTemp.querySelector('style')?.innerHTML || '';
      const scriptContent = divTemp.querySelector('script')?.innerHTML || '';

      styleText.value = styleContent;
      const optCode = scriptContent
        .replace(/export[\s]default/g, '')
        .replace(/^\n/, '');
      // eslint-disable-next-line no-new-func
      const copt = new Function(`return ${optCode}`)();
      const compOptions = {
        ...copt,
        template: tmpContent,
        mounted() {
          window.dispatchEvent(new Event('widget-update'));
        },
      };
      option.value = compOptions;
    } catch (error) {
      const compOptions: ComponentOptionsWithoutProps = {
        template: `代码编译错误${error}`,
        mounted() {
          window.dispatchEvent(new Event('widget-update'));
        },
      };
      option.value = compOptions;
    }
  }
  onMounted(() => {
    watch(
      () => props.node,
      () => {
        createComp();
      },
      {
        immediate: true,
        deep: true,
      }
    );
  });

  onMounted(() => {
    debugger;
    // const shadowRoot = $el.value?.attachShadow({ mode: 'open' });
  });
</script>

<style lang="less">
  .design-mode {
    .widget-text {
      // cursor: pointer;
    }
  }
</style>
