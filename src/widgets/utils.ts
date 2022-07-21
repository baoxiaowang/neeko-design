import { baseCompile } from '@vue/compiler-core';
import * as VueRuntime from '@vue/runtime-core';
import { stringifyStyle, parseStringStyle, NormalizedStyle } from '@vue/shared';
import { Widget, WidgetType, WidgetComponents } from './types';

import renderModule from './render.index';

export function compileExp(
  exp = '',
  context: Record<string, any>,
  errorCb?: (e: any) => void
): string {
  try {
    const { code } = baseCompile(exp);
    // eslint-disable-next-line no-new-func
    const fn = new Function('Vue', code);
    const res = fn(VueRuntime)(
      {
        ...context,
      },
      false
    );
    return res;
  } catch (error) {
    if (errorCb) {
      errorCb(error);
    }
    return exp;
  }
}
export function uuidFn(len: number, radix?: number) {
  const chars =
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  const uuid = [];
  let i;
  radix = radix || chars.length;
  if (len) {
    // eslint-disable-next-line no-bitwise
    for (i = 0; i < len; i += 1) uuid[i] = chars[0 | (Math.random() * radix)];
  }
  return uuid.join('');
}
export function createWidgetKey(type: WidgetType) {
  // const now = Date.now();
  // const sNow = now.toString(32);
  const random = uuidFn(4);
  // return `${type}_${sNow}_${random}`;
  return `${type}_${random}`;
}

// export function createWidget(type){

// }

export function getWidgetCloned(widget: Widget): Widget {
  function clone(data: any) {
    const newData: any = Array.isArray(data) ? [] : {};
    if (typeof data !== 'object') {
      return data;
    }
    // eslint-disable-next-line no-restricted-syntax
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        if (typeof data[key] === 'object') {
          newData[key] = clone(data[key]);
        } else if (key === 'key') {
          newData.key = createWidgetKey(data.type);
        } else {
          newData[key] = data[key];
        }
      }
    }
    return newData;
  }
  const cloned = clone(widget) as Widget;
  return cloned;
}

/**
 * {height: "50px"}
 * to
 * {
 *    height: 50px;
 * }
 */
export function styleObjToCode(obj: any) {
  let res = '{\n';
  let styleText = stringifyStyle(obj);
  if (styleText) {
    styleText = `\t${styleText}`;
  }
  // .replace(/:/g,": ")
  const fStr = styleText.replace(/;/g, ';\n\t').replace(/[\t]{1}$/, '');
  res += fStr;
  res += '}';
  return res;
}

export function codeToStyle(str: string): NormalizedStyle {
  const fStr = str.replace(/(\{|\})/g, '');
  return parseStringStyle(fStr);
}
/**
 * {
 *    font-size: 14px;
 *    color: red;
 * }
 *  to
 * "font-size: 14px; color: red"
 */
export function styleToString(obj: any) {
  return stringifyStyle(obj);
}

export function getRenderWidget(node: any): WidgetComponents {
  return renderModule[node.type] || renderModule.container;
}
