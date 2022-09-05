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
export interface PageModel {
  appId: string;
  id: string;
  name: string;
  pageType: PageTypeEnum;
  widgets: Widget[];
}

export const PageTypeNameEnum: Record<PageTypeEnum, any> = {
  [PageTypeEnum.pc]: {
    icon: 'icon-computer',
    color: '#00b42a',
    label: '网页端页面',
  },
  [PageTypeEnum.mobile]: {
    icon: 'icon-mobile',
    color: '#ff7d00',
    label: '移动端页面',
  },
  [PageTypeEnum.form]: {
    icon: 'icon-nav',
    color: '#165dff',
    label: '普通表单',
  },
  [PageTypeEnum.processForm]: {
    icon: 'icon-relation',
    color: '#7bc616',
    label: '流程表单',
  },
  [PageTypeEnum.link]: {
    icon: 'icon-link',
    color: '#b71de8',
    label: '外部链接',
  },
};

interface pageCreateData {
  appId: string;
  name: string;
  pageType: PageTypeEnum;
  widgets: Widget[];
}
export async function createPage(data: pageCreateData) {
  return axios.post('/api/page/create', data);
}
export async function updatePageWidget(
  data: Pick<PageModel, 'id' | 'widgets'>
) {
  return axios.post('/api/page/updateWidget', data);
}

export async function updatePageName(data: Pick<PageModel, 'id' | 'name'>) {
  return axios.post('/api/page/updateName', data);
}

export async function getById(id: string): Promise<HttpResult<PageModel>> {
  return axios.get(`/api/page/getById?id=${id}`);
}

export async function getByAppId(appId: string) {
  return axios.get(`/api/page/getByAppId?appId=${appId}`);
}

export async function delPage(id: string) {
  return axios.post('/api/page/del', {
    id,
  });
}

export async function getListByAppId(
  query: Partial<Pick<pageCreateData, 'appId' | 'name' | 'pageType'>>
) {
  return axios
    .request({
      method: 'get',
      url: '/api/page/getListByAppId',
      params: query,
    })
    .then((res) => {
      res.data = res.data || [];
      return res;
    });
}
