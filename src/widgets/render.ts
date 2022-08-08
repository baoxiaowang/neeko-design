// import widgetMap from "./index";
import { WidgetComponents } from './types';
import renderModule from './render.index';

export function getRenderWidget(node: any): WidgetComponents {
  return (renderModule[node.type] ||
    renderModule.container) as WidgetComponents;
}

export function createRenderWidget() {
  //
}
