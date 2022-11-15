import axios from 'axios';

export function createDept(data: { deptName: string; parentDeptId: string }) {
  return axios.post('/api/dept/create', data);
}

export function getAllDept() {
  return axios.get('/api/dept/getAllDept');
}

export function getAllDeptTree() {
  return axios.get('/api/dept/getAllDeptTree');
}
