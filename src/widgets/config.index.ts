import { Widget, WidgetConfig, WidgetType } from './types';

const modulesRender = import.meta.globEager('./components/*/config.(ts|js)');

const editor = {} as Record<WidgetType, WidgetConfig<Widget>>;

Object.keys(modulesRender).forEach((path) => {
  const name = path.split('/')[2] as WidgetType;
  editor[name] = modulesRender[path].default;
});

export default editor as Record<WidgetType, WidgetConfig<Widget>>;
