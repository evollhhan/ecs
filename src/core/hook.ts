/**
 * 游戏勾子相关
 */
export class Hook {
  /** 游戏勾子列表 */
  private list: {
    [index: string]: any[]
  } = Object.create(null);

  /**
   * 监听引擎内部勾子事件
   * @param hookName 勾子名称
   * @param handler 事件处理
   */
  on (hookName: string, handler: any) {
    if (!this.list[hookName]) {
      this.list[hookName] = [];
    }
    this.list[hookName].push(handler);
  }

  /**
   * 触发引擎内部勾子事件
   * @param hookName 勾子名称
   * @param args 传参
   */
  emit (hookName: string, ...args: any[]) {
    const hookList = this.list[hookName];
    hookList && hookList.forEach(hook => hook(...args));
  }
}

export const hook = new Hook();
