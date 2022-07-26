import type * as CSS from 'csstype';

export type WidgetType =
  | 'root'
  | 'text'
  | 'container'
  | 'row'
  | 'column'
  | 'image'
  | 'form'
  | 'input'
  | 'textarea';

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
export interface FormWidget extends Widget {
  label?: string;
  default: {
    type: 'custom' | 'func' | 'link';
    exp: string;
    linkInfo?: LinkInfo;
  };
  width: string;
  placeholder?: string;
  rules: {
    required: number;
    noRepeat?: number;
  };
  permission: {
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
  block: number;
}

export type InputWidget = FormWidget;
export interface WidgetCompOptions {
  node: Widget;
  state: Record<string, any>;
  meta: Record<string, any>;
}
export type WidgetComponents = DefineComponent<WidgetCompOptions>;
interface WidgetChange<T extends Widget> {
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
}
