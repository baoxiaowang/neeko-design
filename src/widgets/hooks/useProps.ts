import { computed } from 'vue';
import { FormWidget, OptionWidget, Widget } from '../types';

export default function <T extends OptionWidget>(node: T) {
  const options = computed(() => {
    return node.optionConfig.options;
  });

  return {
    options,
  };
}
