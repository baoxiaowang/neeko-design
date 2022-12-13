import { computed, Ref, watchEffect } from 'vue';
import { Widget } from '../types';

export default (node: Ref<Widget>) => {
  const styleText = computed<any>(() => {
    return node.value.codeStyle
      ?.toString()
      .replace(/::node/g, `[data-key=${node.value.key}]`);
  });

  watchEffect(() => {
    const nodeStyle = document.querySelector(
      `style[node-hash=${node.value.key}]`
    );
    if (nodeStyle) {
      nodeStyle.textContent = styleText.value;
    } else {
      const style = document.createElement('style');
      style.setAttribute('node-hash', node.value.key);
      style.textContent = styleText.value;
      document.head.appendChild(style);
    }
  });
};
