import { AppRouteRecordRaw } from '../types';

const Template: AppRouteRecordRaw[] = [
  {
    path: '/template',
    name: 'template',
    component: () => import('src/views/template/template-list/page.vue'),
    meta: {
      locale: '模板管理',
      requiresAuth: true,
      icon: 'icon-apps',
      order: 1000,
      noAffix: true,
    },
  },
];

export default Template;
