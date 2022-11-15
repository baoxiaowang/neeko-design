import axios from 'axios';
// 员工数据缓存{id: vo}
const deptCacheMap: Record<string, any> = {};
window.globalData = { ...window.globalData, deptCacheMap };

export interface DeptModel {
  id: string;
  name: string;
  parentId: string;
  children?: DeptModel[];
}

export function createDept(data: { deptName: string; parentDeptId: string }) {
  return axios.post('/api/dept/create', data);
}

export function getAllDept() {
  return axios.get('/api/dept/getAllDept').then((result) => {
    const { data = [] } = result;
    data.forEach((item: any) => {
      deptCacheMap[item.id] = item;
    });
    return result;
  });
}

// export function getAllDeptTree() {
//   return axios.get('/api/dept/getAllDeptTree');
// }

export function getAllDeptTree() {
  return getAllDept().then((res) => {
    const { data } = res;
    const treeData = data.reduce(
      (p: DeptModel[], b: DeptModel, _index: number, list: DeptModel[]) => {
        if (b.parentId === '0' || !b.parentId) {
          p.push(b);
          return p;
        }
        list.some((item: DeptModel) => {
          if (b.parentId?.toString() === item.id?.toString()) {
            item.children = item.children ? item.children.concat(b) : [b];
            return true;
          }
          return false;
        });
        return p;
      },
      []
    );
    return treeData;
  });
}

export function getDeptByIds(ids: string[]): Promise<DeptModel[]> {
  const deptIds = ids.filter((id) => +id !== 0);
  if (deptIds.length === 0) return Promise.resolve([]);
  return axios
    .get('/api/dept/getDeptByIds', {
      params: {
        ids: deptIds.join(','),
      },
    })
    .then((result) => {
      const { data = [] } = result;
      data.forEach((item: any) => {
        deptCacheMap[item.id] = item;
      });
      return data;
    });
}
