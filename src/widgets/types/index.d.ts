import type * as CSS from 'csstype';
import { S } from 'mockjs';
import { DefineComponent } from 'vue';

export type DesignMode = 'design' | 'runtime';
export type WidgetType =
  | 'root'
  | 'text'
  | 'container'
  | 'row'
  | 'column'
  | 'image'
  | 'form'
  | 'input'
  | 'textarea'
  | 'radio-group'
  | 'checkbox-group'
  | 'date-picker'
  | 'input-number'
  | 'select'
  | 'select-group'
  | 'divider'
  | 'address'
  | 'location'
  | 'image-upload'
  | 'file-upload'
  | 'rate'
  | 'subform'
  | 'code-render';

export interface Widget {
  type: WidgetType;
  key: string;
  children?: Array<Widget>;
  config?: Record<string, any>;
  codeStyle?: string; // CSS.prototype
  slot?: Partial<Record<WidgetType, Widget>>;
}

export interface TextWidget extends Widget {
  config: {
    text?: string;
  };
}

export interface CodeRenderWidget extends Widget {
  config: {
    code: string;
  };
}

export interface ImageWidget extends Widget {
  config: {
    url?: string;
  };
}

export interface LinkInfo {
  linkFormId: string;
  condition: [];
  linkField: string;
}

export type NumBoolean = 0 | 1;
export interface FormWidget extends Widget {
  label?: string;
  hideLabel?: NumBoolean;
  default?: {
    type: 'custom' | 'func' | 'link';
    exp: string;
    linkInfo?: LinkInfo;
  };
  width?: string;
  subWidth?: number;
  placeholder?: string;
  rules?: {
    required?: number;
    noRepeat?: number;
  };
  permission?: {
    visibleType: 0 | 1 | 2; // 0 不可见 1 全部 2 // 部分
    visableInclude: {
      user: [];
      role: [];
    };
    visableExclude: {
      user: [];
      role: [];
    };
    editbleType: 0 | 1 | 2; // 0 不可见 1 全部 2 // 部分
    editbleInclude: {
      user: [];
      role: [];
    };
    editbleExclude: {
      user: [];
      role: [];
    };
  };
  block?: number;
  children?: FormWidget[];
}
export interface FormRootWidget extends FormWidget {
  layout?: 'horizontal' | 'vertical';
  labelAlign?: 'left' | 'right' | undefined;
}
export type InputWidget = FormWidget;

export interface WidgetOptionItem {
  label: string;
  // value: string;
  defaultCheck?: NumBoolean;
}

export interface OptionWidget extends FormWidget {
  options: WidgetOptionItem[];
  direction?: 'horizontal' | 'vertical';
}
export type RadioGroupWidget = OptionWidget;
export type SelectWidget = OptionWidget;
export type SelectGroupWidget = OptionWidget;
export interface CheckboxGroupWidget extends FormWidget, OptionWidget {
  // items: WidgetOptionItem[];
  // direction?: 'horizontal' | 'vertical';
}
export interface WidgetCompOptions {
  node: Widget;
  state: Record<string, any>;
  meta: Record<string, any>;
}
export type WidgetComponents = DefineComponent<WidgetCompOptions>;
export interface WidgetChange<T extends Widget> {
  (e: Partial<T>): void;
}
export interface WidgetConfig<T extends Widget = Widget> {
  type: WidgetType;
  icon: string; // assets/icons
  title: string;
  childrenType: Array<WidgetType>;
  defaultVal: (val?: any) => T;
  canCopy?: boolean; // 是否是不可复制的
  canDel?: boolean;
  toString?: (val: any) => string;
}

export interface IFileItem {
  uid: string;
  name: string;
  url: string;
}

export interface IAddressValue {
  province: string;
  city: string;
  district: string;
  address?: string;
}
