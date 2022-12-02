<template>
  <component :is="comp" v-if="show" :data-key="node.key"></component>
</template>

<script setup lang="ts" name="code-render">
  import { Widget } from '@/widgets/types';
  import {
    ref,
    defineComponent,
    onUnmounted,
    markRaw,
    watch,
    onMounted,
    nextTick,
    ComponentOptionsWithoutProps,
  } from 'vue';

  const props = defineProps<{
    node: Widget;
    state: any;
    meta: any;
  }>();
  const comp = ref(null);
  const show = ref(true);
  function createComp() {
    try {
      // style
      const styleId = `#code-${props.node.key}`;
      const styleEl =
        document.querySelector<HTMLStyleElement>(styleId) ||
        document.createElement('style');
      // 解析容器
      const divTemp = document.createElement('div');
      styleEl.id = styleId;
      divTemp.innerHTML = props.node?.config?.code || '';
      const tmpContent = divTemp.querySelector('template')?.innerHTML || '';
      const styleContent = divTemp.querySelector('style')?.innerHTML || '';
      const scriptContent = divTemp.querySelector('script')?.innerHTML || '';

      const optCode = scriptContent
        .replace(/export[\s]default/g, '')
        .replace(/^\n/, '');
      // eslint-disable-next-line no-new-func
      const copt = new Function(`return ${optCode}`)();
      const options = {
        ...copt,
        template: tmpContent,
        mounted() {
          window.dispatchEvent(new Event('widget-update'));
        },
      };
      const codeComp = defineComponent(options);
      styleEl.innerText = styleContent || '';
      document.head.appendChild(styleEl);
      onUnmounted(() => {
        document.head.removeChild(styleEl);
      });
      comp.value = markRaw(codeComp as any);
      show.value = false;
      nextTick(() => {
        show.value = true;
      });
    } catch (error) {
      const options: ComponentOptionsWithoutProps = {
        template: `代码编译错误${error}`,
        mounted() {
          window.dispatchEvent(new Event('widget-update'));
        },
      };
      const codeComp = defineComponent(options);
      comp.value = markRaw(codeComp as any);
      show.value = false;
      nextTick(() => {
        show.value = true;
      });
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
</script>

<style lang="less">
  .design-mode {
    .widget-text {
      // cursor: pointer;
    }
  }
</style>
