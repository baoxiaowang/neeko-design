import { Modal } from '@arco-design/web-vue';
import FormDataModal from '@/components/design/form-data-modal/index.vue';
import { h } from 'vue';
import { FormWidget } from '../types';

export async function showFormModel(widgetData: FormWidget[], optons: any) {
  return Modal.open({
    title: '新建客户',
    renderToBody: true,
    alignCenter: true,
    width: '800px',
    titleAlign: 'center',
    modalClass: 'form-data-modal',
    // simple: true,
    content: () =>
      h(FormDataModal, {
        'widget-List': widgetData,
      }),
  });
}

export function test() {}
