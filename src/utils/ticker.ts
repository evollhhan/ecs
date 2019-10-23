export default class Ticker {
  FPS = 100;
  lastTime = performance.now();
  deltaTime = 0;
  handler: undefined | ((ts: number) => void);
  tick = this.animate.bind(this);
  raf: number = 0;

  constructor (FPS?: number) {
    if (FPS) this.setFPS(FPS);
  }

  private animate (currentTime: number) {
    this.raf = window.requestAnimationFrame(this.tick);
    this.deltaTime = currentTime - this.lastTime;
    if (this.deltaTime > this.FPS) {
      this.handler && this.handler(this.deltaTime / this.FPS)
      this.lastTime = currentTime;
    }
  }

  setFPS (FPS: number) {
    this.FPS = 1000 / FPS;
  }

  start () {
    this.lastTime = performance.now();
    this.raf = window.requestAnimationFrame(this.tick);
  }

  stop () {
    window.cancelAnimationFrame(this.raf);
  }
}