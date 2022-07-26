import { computed, Ref, onMounted, onUnmounted, watchEffect } from 'vue';
import { styleToString, codeToStyle } from '@/widgets/utils';
import { Widget } from '../types';

const PRE = 'style-';

export function useRenderStyle(node: Ref<Widget>) {
  const styleObj = computed<any>(() => {
    return codeToStyle(node.value.codeStyle || '');
  });
  const styleText = computed<any>(() => {
    return styleToString(styleObj.value);
  });
  onMounted(() => {
    const { key } = node.value;
    let tempStyleEl = document.querySelector(`#${PRE}-${node.value.key}`);
    if (!tempStyleEl) {
      tempStyleEl = document.createElement('style');
      tempStyleEl.id = `#${PRE}-${node.value.key}`;
    }
    // tempStyleEl.innerHTML = `
    //     .${key}, [data-key=${key}] {
    //       ${styleText.value}
    //     }
    //   `;
    document.head.appendChild(tempStyleEl);
    watchEffect(() => {
      if (tempStyleEl) {
        tempStyleEl.innerHTML = `
        .${key}, [data-key=${key}] {
          ${styleText.value}
        }
      `;
      }
    });
    onUnmounted(() => {
      document.head.removeChild(tempStyleEl as HTMLStyleElement);
    });
  });
  return styleObj;
}
export function b() {
  //
}
