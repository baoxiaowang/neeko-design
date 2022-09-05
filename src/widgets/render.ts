// import widgetMap from "./index";
import { Widget, WidgetComponents } from './types';
import renderModule from './render.index';

export function getRenderWidget(node: Pick<Widget, 'type'>): WidgetComponents {
  return (renderModule[node.type] ||
    renderModule.container) as WidgetComponents;
}

export function createRenderWidget() {
  //
}
