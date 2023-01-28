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
    App,
    h,
    VNode,
  } from 'vue';
  import ArcoVue from '@arco-design/web-vue';

  import arcoStyleText from '@arco-design/web-vue/dist/arco.css';

  const props = defineProps<{
    styleText?: string;
    option: ComponentOptionsWithoutProps;
  }>();

  const emit = defineEmits<{
    (e: 'mounted'): void;
  }>();

  const el = ref();
  let app: App | null = null;

  let shadowRoot: any;
  function initComp(option: ComponentOptionsWithoutProps) {
    // 注入样式
    const arcoStyle = document.createElement('style');
    arcoStyle.textContent = arcoStyleText;
    // import '@arco-design/web-vue/dist/arco.css';
    const style = document.createElement('style');
    style.textContent = `${props.styleText}`;
    shadowRoot.appendChild(style);
    shadowRoot.appendChild(arcoStyle);
    emit('mounted');
  }

  onMounted(() => {
    let widget: VNode | null = null;
    app = createApp({
      render() {
        widget = h(props.option);
        return widget;
      },
    }).use(ArcoVue);
    shadowRoot = el.value?.shadowRoot;
    if (!shadowRoot) {
      shadowRoot = el.value?.attachShadow({ mode: 'open' });
    }
    app.mount(shadowRoot);
    watchEffect(() => {
      initComp(props.option);
    });
    watchEffect(() => {
      if (widget) {
        Object.assign(widget, props.option);
      }
    });
  });
</script>

<style lang="less">
  .shadow-comp {
  }
</style>
