<template>
  <div :data-key="node.key" class="code-render">
    <component :is="comp"></component>
  </div>
</template>

<script setup lang="ts" name="code-render">
  import { Widget } from '@/widgets/types';
  import { ref, defineComponent, watchEffect, onUnmounted } from 'vue';

  const props = defineProps<{
    node: Widget;
    state: any;
    meta: any;
  }>();
  const comp = ref(null);
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
      };
      const codeComp = defineComponent(options);
      styleEl.innerText = styleContent || '';
      document.head.appendChild(styleEl);
      onUnmounted(() => {
        document.head.removeChild(styleEl);
      });
      comp.value = codeComp as any;
    } catch (error) {
      const options = {
        template: `文件编译错误${error}`,
      };
      const codeComp = defineComponent(options);
      comp.value = codeComp as any;
    }
  }
  watchEffect(() => {
    createComp();
  });
</script>

<style lang="less">
  .design-mode {
    .widget-text {
      // cursor: pointer;
    }
  }
</style>
