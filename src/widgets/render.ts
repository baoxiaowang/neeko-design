// import widgetMap from "./index";
import { WidgetComponents } from './types';
import renderModule from './render.index';

export function getRenderWidget(node: any): WidgetComponents {
  console.log(renderModule);
  return renderModule[node.type] || renderModule.container;
}

export function createRenderWidget() {
  //
}
