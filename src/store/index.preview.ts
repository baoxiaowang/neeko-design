import { createPinia } from 'pinia';
import useDesignStore from './modules/design';

const pinia = createPinia();

export { useDesignStore };
export default pinia;
