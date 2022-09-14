import axios from 'axios';

export async function getAppLinkWidget() {
  return axios.get('/api/widget/getAppLinkWidget', {});
}

export async function getWidgetValue({
  formId,
  widgetKey,
  word = '',
}: {
  formId: string;
  widgetKey: string;
  word: string;
}) {
  return axios.get('/api/widget/getWidgetValue', {
    params: {
      formId,
      widgetKey,
      word,
    },
  });
}

export const s = 2;
