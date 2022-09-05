import { AppRouteRecordRaw } from '../types';

const AppList: AppRouteRecordRaw[] = [
  {
    path: '/application',
    name: 'application',
    component: () =>
      import('src/views/application/list/application-list-page.vue'),
    meta: {
      locale: '应用管理',
      requiresAuth: true,
      icon: 'icon-apps',
      order: 1000,
      noAffix: true,
    },
  },
  {
    path: '/application-detail/:appId',
    name: 'applicationDetail',
    component: () =>
      import('src/views/application/detail/application-detail-page.vue'),
    meta: {
      locale: '应用详情',
      requiresAuth: true,
      icon: 'icon-dashboard',
      order: 0,
      hideInMenu: true,
      noAffix: true,
    },
  },
];

export default AppList;
