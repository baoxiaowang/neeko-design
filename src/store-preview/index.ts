import { createPinia } from 'pinia';
import usePreviewStore from './modules/preview';

const pinia = createPinia();

export { usePreviewStore };
export default pinia;
