import { Widget, WidgetConfig, WidgetType } from './types';

const modulesRender = import.meta.globEager('./components/*/config.(ts|js)');

const WidgetConfig = {} as Record<WidgetType, WidgetConfig<Widget>>;

Object.keys(modulesRender).forEach((path) => {
  const name = path.split('/')[2] as WidgetType;
  WidgetConfig[name] = modulesRender[path].default;
});

export default WidgetConfig as Record<WidgetType, WidgetConfig<Widget>>;
