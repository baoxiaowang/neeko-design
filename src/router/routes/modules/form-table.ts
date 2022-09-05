import { AppRouteRecordRaw } from '../types';

const fromTable: AppRouteRecordRaw[] = [
  {
    path: '/form-table/:pageId',
    name: 'formTable',
    component: () => import('src/views/data-table/index.vue'),
    meta: {
      locale: '数据列表',
      requiresAuth: true,
      roles: ['*'],
    },
  },
];

export default fromTable;
