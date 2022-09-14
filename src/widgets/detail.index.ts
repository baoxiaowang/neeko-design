import { WidgetType } from './types';

const modulesRender = import.meta.globEager(
  './components/*/detail.(vue|ts|js)'
);

const detail = {} as Record<
  WidgetType,
  {
    [key: string]: any;
  }
>;

Object.keys(modulesRender).forEach((path) => {
  const name = path.split('/')[2] as WidgetType;
  detail[name] = modulesRender[path].default;
});
export default detail;
