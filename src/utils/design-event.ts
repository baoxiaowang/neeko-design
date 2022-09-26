// 通过window 来转发自定义事件

import { Widget, WidgetType } from '@/widgets/types';

type eventType = 'select' | 'hover' | 'update' | 'add' | 'delete' | 'copy';
type CallBack = (w: Pick<Widget, 'key'>) => void;
type unOn = () => void;

const symbol = 'design_';
export default class DesignEvent {
  target: Window;

  constructor(target?: Window) {
    this.target = target || window;
  }

  emitInit(data: Widget[]): DesignEvent {
    const event = new CustomEvent('init', { detail: data });
    this.target.dispatchEvent(event);
    return this;
  }

  onInit(cb: (d: Widget[]) => void) {
    const fn = (e: any) => {
      const widget = JSON.parse(JSON.stringify(e.detail));
      cb(widget);
    };
    this.target.addEventListener('init', fn);

    return () => {
      this.target.removeEventListener('init', fn);
    };
  }

  emit(
    type: eventType,
    widget: {
      key: string;
      type?: WidgetType;
    }
  ): DesignEvent {
    const event = new CustomEvent(symbol + type, { detail: widget });
    this.target.dispatchEvent(event);
    return this;
  }

  on(type: eventType, cb: CallBack): unOn {
    const fn = (e: any) => {
      const widget = JSON.parse(JSON.stringify(e.detail));
      cb(widget);
    };
    this.target.addEventListener(symbol + type, fn);
    return () => {
      this.target.removeEventListener(symbol + type, fn);
    };
  }
}
