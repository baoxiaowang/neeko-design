import { AppRouteRecordRaw } from '../types';

const DASHBOARD: AppRouteRecordRaw[] = [
  {
    path: '/design-form/:pageId',
    name: 'designForm',
    component: () => import('src/views/design/form/index.vue'),
    meta: {
      locale: 'menu.dashboard',
      requiresAuth: true,
      icon: 'icon-dashboard',
      order: 0,
      hideInMenu: true,
    },
  },
  {
    path: '/design-page/:pageId',
    name: 'designPage',
    component: () => import('src/views/design/page/index.vue'),
    meta: {
      locale: 'menu.dashboard',
      requiresAuth: true,
      icon: 'icon-dashboard',
      order: 0,
      hideInMenu: true,
    },
  },
  {
    path: '/design-flow/:pageId',
    name: 'designFlow',
    component: () => import('src/views/design/workflow/index.vue'),
    meta: {
      locale: 'menu.dashboard',
      requiresAuth: true,
      icon: 'icon-dashboard',
      order: 0,
      hideInMenu: true,
    },
  },
  {
    path: '/design-panel/:pageId',
    name: 'designFlow',
    component: () => import('src/views/design/panel/index.vue'),
    meta: {
      locale: 'menu.dashboard',
      requiresAuth: true,
      icon: 'icon-dashboard',
      order: 0,
      hideInMenu: true,
    },
  },
];

// {
//   path: '/design',
//   name: 'design',
//   component: DESIGN_LAYOUT,
//   meta: {
//     locale: '应用管理',
//     requiresAuth: false,
//     icon: 'icon-apps',
//     order: 1,
//     hideInMenu: true,
//   },
//   children: [
//     {
//       path: 'apps',
//       name: 'designApps',
//       component: () => import('@/views/design/apps/index.vue'),
//       meta: {
//         locale: '应用中心',
//         requiresAuth: true,
//         roles: ['*'],
//         hideInMenu: true,
//       },
//     },
//     {
//       path: 'page',
//       name: 'designPage',
//       component: () => import('@/views/design/page/index.vue'),
//       meta: {
//         locale: '页面设计',
//         requiresAuth: false,
//         roles: ['*'],
//         hideInMenu: true,
//       },
//     },
//     {
//       path: 'form',
//       name: 'designForm',
//       component: () => import('@/views/design/form/index.vue'),
//       meta: {
//         locale: '表单设计',
//         requiresAuth: true,
//         roles: ['*'],
//         hideInMenu: true,
//       },
//     },
//   ],
// };

export default DASHBOARD;
