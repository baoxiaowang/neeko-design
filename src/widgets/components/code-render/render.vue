<template>
  <shadowCompVue
    :option="option"
    :style-text="styleText"
    :data-key="node.key"
    @mounted="widgetMounted"
  ></shadowCompVue>
</template>

<script setup lang="ts" name="code-render">
  import { CodeRenderWidget } from '@/widgets/types';
  import { ref, watch, onMounted, ComponentOptionsWithoutProps } from 'vue';
  import shadowCompVue from './shadow-components/shadow-comp.vue';

  const props = defineProps<{
    node: CodeRenderWidget;
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
      };
      option.value = compOptions;
    } catch (error) {
      const compOptions: ComponentOptionsWithoutProps = {
        template: `代码编译错误${error}`,
      };
      option.value = compOptions;
    }
  }
  function widgetMounted() {
    window.dispatchEvent(new Event('widget-update'));
  }

  onMounted(() => {
    watch(
      () => props.node,
      (val, oldVal) => {
        if (val.config.code !== oldVal?.config.code) {
          console.log(val.config.code, oldVal?.config.code);
          createComp();
        }
      },
      {
        immediate: true,
        deep: true,
      }
    );
  });
</script>

<style lang="less">
  .design-mode {
    .widget-text {
      // cursor: pointer;
    }
  }
</style>
