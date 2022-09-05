import { HttpResult } from '@/types/global';
import { Widget } from '@/widgets/types';
import axios from 'axios';
// eslint-disable-next-line no-shadow

export async function createFormData(data: {
  formId: string;
  formData: Record<string, any>;
}) {
  return axios.post('/api/form/create', data);
}

export async function delFormData(id: string) {
  return axios.post('/api/form/del', {
    id,
  });
}

export async function updatePageWidget() {
  // return axios.post('/api/page/updateWidget', data);
}

export async function getFormDataByPage({ formId }: { formId: string }) {
  return axios.get('/api/form/getListByPage', {
    params: {
      formId,
    },
  });
}
