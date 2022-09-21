export type RoleType = '' | '*' | 'admin' | 'user';

export interface companyItem {
  companyId: string;
  companyInfo: {
    _id: string;
    companyName: string;
  };
  userName: string;
  userPhone: string;
}
export interface UserState {
  name?: string;
  avatar?: string;
  job?: string;
  phone?: string;
  role: RoleType;
  companyId?: string;
  companyName?: string;
  companyList: companyItem[];
}
