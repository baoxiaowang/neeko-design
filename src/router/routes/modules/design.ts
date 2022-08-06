import { DESIGN_LAYOUT } from '@/router/constants';
import { AppRouteRecordRaw } from '../types';

const DASHBOARD: AppRouteRecordRaw = {
  path: '/design',
  name: 'design',
  component: DESIGN_LAYOUT,
  meta: {
    locale: '应用管理',
    requiresAuth: true,
    icon: 'icon-apps',
    order: 1,
  },
  children: [
    {
      path: 'apps',
      name: 'designApps',
      component: () => import('@/views/design/apps/index.vue'),
      meta: {
        locale: '应用中心',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'page',
      name: 'designPage',
      component: () => import('@/views/design/page/index.vue'),
      meta: {
        locale: '视图页面',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'form',
      name: 'designForm',
      component: () => import('@/views/design/form/index.vue'),
      meta: {
        locale: '表单页面',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default DASHBOARD;
