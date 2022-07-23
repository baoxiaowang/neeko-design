import { baseCompile } from '@vue/compiler-core';
import * as VueRuntime from '@vue/runtime-core';
import { stringifyStyle, parseStringStyle, NormalizedStyle } from '@vue/shared';
import type * as CSS from 'csstype';
import { Widget, WidgetType, WidgetComponents } from './types';
import renderModule from './render.index';

// CSS.Properties;

/**
 *
 * @param exp 表达式
 * @param context 上下文
 * @param errorCb 错误回调
 * @returns
 */
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
/**
 * 创建UUID
 * @param len
 * @param radix
 * @returns
 */
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

/**
 * 创建一个 WidgetKey
 * @param type
 * @returns
 */
export function createWidgetKey(type: WidgetType) {
  // const now = Date.now();
  // const sNow = now.toString(32);
  const random = uuidFn(4);
  // return `${type}_${sNow}_${random}`;
  return `${type}_${random}`;
}

// export function createWidget(type){

// }

/**
 * 获取一个widget的克隆对象
 * @param widget
 * @returns
 */
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
 * CSS.Properties 对象转String
 * @param obj {}
 * @returns
 */

export function styleObjToCode(
  obj: NormalizedStyle | string | undefined | CSS.Properties,
  bracket = true
) {
  let res = '';
  let styleText = stringifyStyle(obj as any);
  if (styleText) {
    styleText = `\t${styleText}`;
  }
  const fStr = styleText.replace(/;/g, ';\n\t').replace(/[\t]{1}$/, '');
  res += fStr;
  // res += '}';
  if (bracket) {
    return `{\n${res}}`;
  }
  return res;
}

export function codeToStyle(str: string): NormalizedStyle {
  const fStr = str.trim().replace(/^\{/, '').replace(/\}$/, ''); // str.replace(/(\{|\})/g, '');
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

// eslint-disable-next-line no-underscore-dangle
(window as any)._styleHelp = {
  //
  styleObjToCode,
  codeToStyle,
  styleToString,
};
