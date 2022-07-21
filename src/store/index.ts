import { createPinia } from 'pinia';
import useAppStore from './modules/app';
import useUserStore from './modules/user';
import useTabBarStore from './modules/tab-bar';
import useDesignStore from './modules/design';

const pinia = createPinia();

export { useAppStore, useUserStore, useTabBarStore, useDesignStore };
export default pinia;
