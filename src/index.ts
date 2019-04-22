import { Ecs, System, Entity } from './core';

/**
 * 位置组件，用于控制位置
 */
class KeyBoardComponent {
  public name: string = 'keyboard';
}

/**
 * 盒子渲染组件，用于渲染一个盒子，这里用div示范
 */
class BoxComponent {
  public name: string = 'box';
  public x: number = 0;
  public y: number = 0;
  public sprite: HTMLDivElement;

  constructor (color: string) {
    this.sprite = document.createElement('div');
    this.sprite.style.position = 'absolute';
    this.sprite.style.width = '100px';
    this.sprite.style.height = '100px';
    this.sprite.style.background = color;
    document.body.appendChild(this.sprite);
  }
}

/**
 * 键盘系统，此处用一个键盘来控制有position组件的元素的位置
 * 当任意一个键被按下时，元素向前移动，如果超出屏幕则回到初始位置
 */
class KeyBoardSystem extends System {
  /** 键盘是否按下 */
  public isPressing: boolean = false;

  constructor () {
    super('keyboardSystem', ['box', 'keyboard']);
    this.bindEvent();
  }

  bindEvent () {
    document.body.addEventListener('keydown', () => { this.isPressing = true });
    document.body.addEventListener('keyup', () => { this.isPressing = false });
  }

  update (entity: Entity, index: number, deltaTime: number) {
    if (this.isPressing) {
      const target: BoxComponent = entity.component.box;
      target.x += 10 * deltaTime;
      if (target.x > window.innerWidth) {
        target.x = 0;
      }
    }
  }
}

/**
 * 渲染系统，用于实时绘制包含position,render组件的元素
 */
class RendererSystem extends System {
  constructor () {
    super('rendererSystem', ['box'])
  }

  update (entity: Entity, index: number, deltaTime: number) {
    const target: BoxComponent = entity.component.box;
    target.sprite.style.left = target.x + 'px';
  }
}

/**
 * 初始化系统
 */
const ecs = Ecs();
ecs.addSystem(new RendererSystem());
ecs.addSystem(new KeyBoardSystem());

/**
 * 创建一个红盒子，会随着键盘的按下而移动
 */
const box1 = new Entity('box1');
box1.addComponent(new BoxComponent('#f33'));
box1.addComponent(new KeyBoardComponent());

/**
 * 创建一个黑盒子，只能展示而无法移动
 */
const box2 = new Entity('box2');
box2.addComponent(new BoxComponent('#000'));


let lastTime = performance.now();
let deltaTime = 0;
let interval = 1000 / 60;

function animate (currentTime: number) {
  window.requestAnimationFrame(animate);
  deltaTime = currentTime - lastTime;
  if (deltaTime > interval) {
    ecs.update(deltaTime / interval);
    lastTime = currentTime;
  }
}

window.requestAnimationFrame(animate);
ecs.start();
