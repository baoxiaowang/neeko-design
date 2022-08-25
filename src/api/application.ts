import axios from 'axios';

interface AppCreateData {
  name: string;
  icon: string;
  color?: string;
  describe?: string;
  tags?: string[];
}
export async function createApp(data: AppCreateData) {
  return axios.post('/api/application/create', data);
}
export async function delApp(id: string) {
  return axios.post('/api/application/del', {
    id,
  });
}
export async function getAppList() {
  return axios.get('/api/application/getList');
}
