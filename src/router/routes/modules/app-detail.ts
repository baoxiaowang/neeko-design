import { DEFAULT_LAYOUT } from '@/router/constants';
import { AppRouteRecordRaw } from '../types';

const AppDetail: AppRouteRecordRaw = {
  path: '/application-detail',
  name: 'applicationDetail',
  component: () =>
    import('src/views/application/detail/application-detail-page.vue'),
  meta: {
    locale: 'menu.dashboard',
    requiresAuth: true,
    icon: 'icon-dashboard',
    order: 0,
    hideInMenu: true,
  },
};

export default AppDetail;
