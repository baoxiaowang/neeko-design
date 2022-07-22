import { Widget } from '@/widgets/types';

interface ICustomEventType {
  widgetChange: string;
  selectKeyChange: string;
  hoverKeyChange: string;
  widgetUpdate: string;
  selectChange: string;
}
export const customEventType: ICustomEventType = {
  widgetChange: 'widgetChange',
  selectKeyChange: 'selectKeyChange',
  hoverKeyChange: 'hoverKeyChange',
  widgetUpdate: 'widgetUpdate',
  selectChange: 'selectChange',
};
export type EventType = keyof ICustomEventType;
export interface CustomEventListener<T extends Event = Event>
  extends EventListener {
  (e: T): void;
}
export interface WidgetChangeEvent extends Event {
  detail: Widget[];
}
export interface KeyChangeEvent extends Event {
  detail: string;
}

export interface WidgetUpdateEvent extends Event {
  detail: Partial<Widget>;
}

export interface SelectChangeEvent extends Event {
  detail: Widget;
}

export default class DesignChannel {
  // eslint-disable-next-line no-use-before-define
  static catch: DesignChannel | null = null;

  static getInstance(target: Window) {
    if (DesignChannel.catch && DesignChannel.catch.target === target) {
      return DesignChannel.catch;
    }
    return new DesignChannel(target);
  }

  constructor(target: Window) {
    this.target = target;
    // DesignChannel.catch = this;
  }

  target: Window = window;

  // $on<T extends Event = WidgetChangeEvent>(
  //   value: 'widgetChange',
  //   cb: CustomEventListener<T>
  // ): void;

  // $on<T extends Event = KeyChangeEvent>(
  //   value: 'selectKeyChange' | 'hoverKeyChange',
  //   cb: CustomEventListener<T>
  // ): void;

  // $on<T extends Event = WidgetUpdateEvent>(
  //   value: 'widgetUpdate',
  //   cb: CustomEventListener<T>
  // ): void;

  $on<T extends Event>(type: EventType, cb: CustomEventListener<T>): void {
    this.target.addEventListener(type, cb);
  }

  $emit(t: 'widgetChange', detail: Widget[]): void;

  $emit(t: 'selectKeyChange' | 'hoverKeyChange', detail: string): void;

  $emit(t: 'widgetUpdate', detail: Partial<Widget>): void;

  $emit(t: 'selectChange', detail: Widget): void;

  $emit(type: EventType, detail: any): void {
    this.target.dispatchEvent(new CustomEvent(type, { detail }));
  }
}
