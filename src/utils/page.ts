import { createPage, PageModel, PageTypeEnum } from '@/api/page';
import {
  createCustomePage,
  createFormData,
} from '@/store/modules/design/constants';
import { Widget } from '@/widgets/types';

export function getPagePath(id: string, pageType: PageTypeEnum): string {
  switch (pageType) {
    case PageTypeEnum.form:
      return `/design-panel/${id}`;
    case PageTypeEnum.processForm:
      return `/design-panel/${id}`;
    case PageTypeEnum.pc:
      return `/design-panel/${id}`;
    case PageTypeEnum.mobile:
      return `/design-panel/${id}`;
    default:
      return ``;
  }
}

export async function createPageByType(
  appId: string,
  pageType: PageTypeEnum,
  opt: Partial<PageModel>
) {
  let widget: Widget[] = [];

  switch (pageType) {
    case PageTypeEnum.form:
    case PageTypeEnum.processForm:
      widget = createFormData();
      break;
    case PageTypeEnum.pc:
    case PageTypeEnum.mobile:
      widget = createCustomePage();
      break;
    default:
      break;
  }
  const data = await createPage({
    ...opt,
    appId,
    name: '未命名页面',
    pageType,
    widgets: widget,
  });
  return data;
}
