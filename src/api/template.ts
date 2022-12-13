import { HttpResult } from '@/types/global';
import { Widget } from '@/widgets/types';
import axios from 'axios';

// eslint-disable-next-line no-shadow
export const enum PageTypeEnum {
  pc = 1,
  mobile = 2,
  form = 3,
  processForm = 4,
  link = 5,
}
export interface TemplateModel {
  appId: string;
  id: string;
  name: string;
  pageType: PageTypeEnum;
  widgets: Widget[];
}

interface pageCreateData {
  name: string;
  pageType: PageTypeEnum;
  widgets: Widget[];
}
export async function create(data: pageCreateData) {
  return axios.post('/api/template/create', data);
}
export async function updateWidget(
  data: Pick<TemplateModel, 'id' | 'widgets'>
) {
  return axios.post('/api/template/updateWidget', data);
}

export async function updateName(data: Pick<TemplateModel, 'id' | 'name'>) {
  return axios.post('/api/template/updateName', data);
}

export async function getById(id: string): Promise<HttpResult<TemplateModel>> {
  return axios.get(`/api/template/getById?id=${id}`);
}

export async function getByAppId(appId: string) {
  return axios.get(`/api/template/getByAppId?appId=${appId}`);
}

export async function del(id: string) {
  return axios.post('/api/template/del', {
    id,
  });
}

export async function getTemplateListByPage(
  query: Partial<Pick<pageCreateData, 'name' | 'pageType'>>
) {
  return axios
    .request({
      method: 'get',
      url: '/api/template/getListByPage',
      params: query,
    })
    .then((res) => {
      res.data = res.data || [];
      return res;
    });
}
