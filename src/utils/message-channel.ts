type EventType =
  | 'select'
  | 'hover'
  | 'init'
  | 'update'
  | 'delete'
  | 'sync'
  | 'widgetChange';
interface EventDetail<T> {
  type: EventType;
  payload: T;
}
interface EventCallback<T> {
  (e: T): void;
}
export default class MessageChannelBus {
  // eslint-disable-next-line no-use-before-define
  static instance: MessageChannelBus | null = null;

  origin: Window = window;

  eventCallbackMap: Record<string, any[]> = {};

  constructor(origin: Window) {
    if (MessageChannelBus.instance) {
      return MessageChannelBus.instance;
    }
    this.origin = origin;
    this.eventCallbackMap = {};
    this.origin.addEventListener(
      'message',
      (event) => {
        this.messageHandler(event);
      },
      false
    );
    MessageChannelBus.instance = this;
    return this;
  }

  messageHandler<T>(event: MessageEvent<EventDetail<T>>) {
    const { type, payload } = event.data;
    const callbackList = this.eventCallbackMap[type] || [];
    callbackList.forEach((fn) => {
      if (typeof fn === 'function') {
        fn(payload);
      }
    });
  }

  emit<T>(type: EventType, payload: T) {
    try {
      const data = payload ? JSON.parse(JSON.stringify(payload)) : payload;
      this.origin.postMessage({
        type,
        payload: data,
      });
    } catch (error) {
      console.log('post数据异常', error);
    }
  }

  on<T>(type: EventType, callback: EventCallback<T>) {
    const currentCallback = this.eventCallbackMap[type];
    if (!currentCallback) {
      this.eventCallbackMap[type] = [callback];
      return () => {
        this.eventCallbackMap[type].splice(0, 1);
      };
    }
    const length = currentCallback.push(callback);
    return () => {
      currentCallback.splice(length - 1, 1);
    };
  }
}
