import type { Router, LocationQueryRaw } from 'vue-router';
import NProgress from 'nprogress'; // progress bar

import { useUserStore } from '@/store';
import { isLogin } from '@/utils/auth';

export default function setupUserLoginInfoGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    NProgress.start();
    const userStore = useUserStore();
    if (isLogin()) {
      // 如果已经登陆再进登录重定向到首页
      if (to.name === 'login') {
        const { redirect = '/' } = to.query || {};
        next(redirect as string);
        return;
      }
      if (userStore.phone) {
        next();
      } else {
        try {
          await userStore.info();
          next();
        } catch (error) {
          next({
            name: 'login',
            query: {
              ...to.query,
              redirect: to.path,
            } as LocationQueryRaw,
          });
        }
      }
    } else {
      if (to.name === 'login') {
        next();
        return;
      }
      next({
        name: 'login',
        query: {
          ...to.query,
          redirect: to.path,
        } as LocationQueryRaw,
      });
    }
  });
}
