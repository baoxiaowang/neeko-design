import { AppRouteRecordRaw } from '../types';

const fromTable: AppRouteRecordRaw[] = [
  // {
  //   path: '/home',
  //   name: 'Home',
  //   component: () => import('src/views/data-table/index.vue'),
  //   meta: {
  //     locale: '首页',
  //     requiresAuth: true,
  //     roles: ['*'],
  //     icon: 'icon-dashboard',
  //   },
  // },
  {
    path: '/form-table/:pageId',
    name: 'formTable',
    component: () => import('src/views/data-table/index.vue'),
    meta: {
      locale: '数据列表',
      requiresAuth: true,
      roles: ['*'],
      hideInMenu: true,
    },
  },
];

export default fromTable;
