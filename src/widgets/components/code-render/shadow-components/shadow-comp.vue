<template>
  <div ref="el" class="shadow-comp"></div>
</template>

<script setup lang="ts" name="shadow-comp">
  // const emit = defineEmits();
  import {
    ComponentOptionsWithoutProps,
    createApp,
    onMounted,
    ref,
    watchEffect,
    markRaw,
  } from 'vue';
  import ArcoVue from '@arco-design/web-vue';

  import arcoStyleText from '@arco-design/web-vue/dist/arco.css';

  const props = defineProps<{
    styleText?: string;
    option: ComponentOptionsWithoutProps;
  }>();

  const el = ref();

  function initComp() {
    let shadowRoot = el.value?.shadowRoot;
    if (!shadowRoot) {
      shadowRoot = el.value?.attachShadow({ mode: 'open' });
    }
    createApp({
      ...markRaw(props.option),
    })
      .use(ArcoVue)
      .mount(shadowRoot);
    // 注入样式
    const arcoStyle = document.createElement('style');
    arcoStyle.textContent = arcoStyleText;
    // import '@arco-design/web-vue/dist/arco.css';
    const style = document.createElement('style');
    style.textContent = `${props.styleText}`;
    shadowRoot.appendChild(style);
    shadowRoot.appendChild(arcoStyle);
  }

  onMounted(() => {
    watchEffect(() => {
      initComp();
    });
  });
</script>

<style lang="less">
  .shadow-comp {
  }
</style>
