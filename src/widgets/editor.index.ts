import { WidgetType } from './types';

const modulesRender = import.meta.globEager(
  './components/*/editor.(vue|ts|js)'
);

const editor = {} as Record<
  WidgetType,
  {
    [key: string]: any;
  }
>;

Object.keys(modulesRender).forEach((path) => {
  const name = path.split('/')[2] as WidgetType;
  editor[name] = modulesRender[path].default;
});
export default editor;
