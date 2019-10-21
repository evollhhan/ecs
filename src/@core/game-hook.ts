/**
 * 事件原型
 */
export class EventEmitter {
  protected evts: {
    [index: string]: any[]
  } = Object.create(null);

  on (evtName: string, handler: any) {
    if (!this.evts[evtName]) {
      this.evts[evtName] = [];
    }
    this.evts[evtName].push(handler);
  }

  off (evtName: string, handler: any) {
    if (!this.evts[evtName]) return;
    this.evts[evtName] = this.evts[evtName].filter(h => h !== handler);
  }

  emit (evtName: string, ...args: any[]) {
    const list = this.evts[evtName];
    list && list.forEach(h => h(...args));
  }
}

/**
 * 事件总线
 */
export const hook = new EventEmitter();
