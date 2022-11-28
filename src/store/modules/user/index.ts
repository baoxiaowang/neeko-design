import { defineStore } from 'pinia';
import {
  login as userLogin,
  logout as userLogout,
  getUserInfo,
  LoginData,
} from '@/api/user';
import { setToken, clearToken, setCompanyId } from '@/utils/auth';
import { removeRouteListener } from '@/utils/route-listener';
import { companyItem, UserState } from './types';
import useAppStore from '../app';

const useUserStore = defineStore('user', {
  state: (): UserState => ({
    name: undefined,
    phone: undefined,
    avatar: undefined,
    job: undefined,
    role: '',
    companyId: '',
    companyName: '',
    companyList: [],
  }),

  getters: {
    userInfo(state: UserState): UserState {
      return { ...state };
    },
  },

  actions: {
    switchRoles() {
      return new Promise((resolve) => {
        this.role = this.role === 'user' ? 'admin' : 'user';
        resolve(this.role);
      });
    },
    // Set user's information
    setInfo(partial: Partial<UserState>) {
      this.$patch(partial);
    },

    // Reset user's information
    resetInfo() {
      this.$reset();
    },

    // Get user's information
    async info() {
      const res = await getUserInfo();
      this.setInfo(res.data);
    },

    // Login
    // 返回是否进入公司
    async login(loginForm: LoginData): Promise<[boolean, companyItem[]]> {
      debugger;
      try {
        const { data } = await userLogin(loginForm);
        const { companyList = [], token } = data;
        setToken(token);
        this.companyList = companyList;
        if (companyList?.length === 1) {
          const [company] = companyList as companyItem[];
          this.companyId = company.companyId;
          this.companyName = company.companyInfo.companyName;
          setCompanyId(company.companyId);
          return [true, companyList];
        }

        return [false, companyList];
      } catch (err) {
        clearToken();
        throw err;
      }
    },
    logoutCallBack() {
      const appStore = useAppStore();
      this.resetInfo();
      clearToken();
      removeRouteListener();
      appStore.clearServerMenu();
    },
    // Logout
    async logout() {
      try {
        await userLogout();
      } finally {
        this.logoutCallBack();
      }
    },
  },
});

export default useUserStore;
