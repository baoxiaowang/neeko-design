import { DEFAULT_LAYOUT } from '@/router/constants';
import { AppRouteRecordRaw } from '../types';

const AppList: AppRouteRecordRaw = {
  path: '/application',
  name: 'application',
  component: () =>
    import('src/views/application/list/application-list-page.vue'),
  meta: {
    locale: 'menu.dashboard',
    requiresAuth: true,
    icon: 'icon-dashboard',
    order: 0,
    hideInMenu: true,
  },
};

export default AppList;
