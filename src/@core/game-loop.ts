export default class GameLoop {
  /**
   * 逻辑调用栈
   */
  private stack: any[] = [];
  /**
   * 是否正在运行
   */
  public running: boolean = false;

  /**
   * 添加任务
   * @param cb
   */
  add (cb: any) {
    this.stack.push(cb);
  }

  /**
   * 移除任务
   * @param cb
   */
  remove (cb: any) {
    const idx = this.stack.indexOf(cb);
    if (idx > -1) {
      this.stack.splice(idx, 1);
    }
  }

  /**
   * 开始循环
   */
  start () {
    this.running = true;
  }

  /**
   * 结束循环
   */
  stop () {
    this.running = false;
  }

  /**
   * 执行循环
   * @param deltaTime
   */
  exec (deltaTime: number) {
    if (this.running) {
      this.stack.forEach(cb => cb(deltaTime));
    }
  }
}
