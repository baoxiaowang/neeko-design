import { DESIGN_LAYOUT } from '@/router/constants';
import { AppRouteRecordRaw } from '../types';

const DASHBOARD: AppRouteRecordRaw = {
  path: '/design',
  name: 'design',
  component: DESIGN_LAYOUT,
  meta: {
    locale: '页面管理',
    requiresAuth: true,
    icon: 'icon-list',
    order: 1,
  },
  children: [
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
