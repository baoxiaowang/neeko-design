/**
 * iframe 之间通信
 * 和 origin 建立通信
 */
type CallBack = (e: any) => void;
interface Event {
  type: string;
  cb: CallBack;
}
export default class MessagePipe {
  constructor(taget: Window, origin: string) {
    this.taget = taget;
    this.origin = origin;
    this.connect();
  }

  public taget: Window;

  public origin: string;

  private events: Event[] = [];

  private events_self: Event[] = [];

  targetListener: (this: Window, ev: MessageEvent<any>) => any = (e) => {
    const { data, origin } = e;
    // 监听 message 事件
    if (origin === this.origin) {
      // 验证消息来源地址
      this.events.forEach((item) => {
        if (item.type === data.type) {
          // eslint-disable-next-line no-unused-expressions
          item.cb && item.cb(data.payload);
        }
      });
    }
  };

  selfListener: (this: Window, ev: MessageEvent<any>) => any = (e) => {
    const { data, origin } = e;
    // 监听 message 事件
    if (origin === this.origin) {
      // 验证消息来源地址
      this.events_self.forEach((item) => {
        if (item.type === data.type) {
          // eslint-disable-next-line no-unused-expressions
          item.cb && item.cb(data.payload);
        }
      });
    }
  };

  connect() {
    this.taget.addEventListener('message', this.targetListener);
    window.addEventListener('message', this.selfListener);
  }

  emitTarget(type: string, payload: any) {
    // this.taget.postMessage(
    //   {
    //     type,
    //     payload,
    //   },
    //   this.origin
    // );
    console.log(this);
  }

  emitSelf(type: string, payload: any) {
    // window.postMessage(
    //   {
    //     type,
    //     payload,
    //   },
    //   this.origin
    // );
    console.log(this);
  }

  onTarget(type: string, cb: CallBack) {
    this.events.push({
      type,
      cb,
    });
  }

  onSelf(type: string, cb: CallBack) {
    this.events_self.push({
      type,
      cb,
    });
  }

  destroy() {
    this.taget.removeEventListener('message', this.targetListener);
    window.removeEventListener('message', this.selfListener);
  }
}
