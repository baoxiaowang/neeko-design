import axios from 'axios';

// 员工数据缓存{id: vo}
const memberCacheMap: Record<string, any> = {};
window.globalData = { ...window.globalData, memberCacheMap };

export function createDept(data: { deptName: string; parentDeptId: string }) {
  return axios.post('/api/member/getMemberByPage', data);
}

export interface IGetMemberByPage {
  userName?: string;
  userPhone?: string;
  deptId?: string | 0;
}
export function getMemberByPage(params: IGetMemberByPage) {
  return axios
    .get('/api/member/getMemberByPage', {
      params,
    })
    .then((res) => {
      const { data = [] } = res;
      data.forEach((item: any) => {
        // eslint-disable-next-line no-underscore-dangle
        memberCacheMap[item.id] = item;
      });
      return res;
    });
}

export function getMemberByIds(ids: string[] = []) {
  if (!ids.length) return Promise.resolve([]);
  return axios
    .get('/api/member/getMemberByIds', {
      params: {
        memberIds: ids.join(','),
      },
    })
    .then((res) => {
      const { data = [] } = res;
      data.forEach((item: any) => {
        memberCacheMap[item.id] = item;
      });
      return data;
    });
}