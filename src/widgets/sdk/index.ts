import { Modal, ConfigProvider } from '@arco-design/web-vue';
import FormDataModal from '@/components/design/form-data-modal/index.vue';
import { h } from 'vue';
import { FormWidget } from '../types';

export async function showFormModel(
  widgetData: FormWidget[],
  optons: {
    onBeforeOk: (
      error: Record<string, any>,
      formData: Record<string, any>
    ) => void;
  }
) {
  let rootWidget: any = null;
  return Modal.open({
    title: '新建客户',
    renderToBody: true,
    alignCenter: true,
    width: '800px',
    titleAlign: 'center',
    modalClass: 'form-data-modal',
    // simple: true,
    content: () => {
      rootWidget = h(FormDataModal, {
        ref: 'rootWidget',
        widgetList: widgetData,
      });

      return h(
        ConfigProvider,
        {
          updateAtScroll: true,
        },
        rootWidget
      );
    },
    onBeforeOk(done) {
      (rootWidget?.component.refs.rootWidget as any)?.validate(
        (error: Record<string, any>, formData: Record<string, any>) => {
          if (!error) {
            done(true);
          }
          // eslint-disable-next-line no-unused-expressions
          optons?.onBeforeOk && optons?.onBeforeOk(error, formData);
        }
      );
    },
  });
}

export function test() {}
