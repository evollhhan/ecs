import { IComponent } from '../@core';

interface IOptions {
  speed?: number[];
  size?: number;
}

function rs () {
  return Math.random() * 16 - 8;
}

export default class Movement implements IComponent {
  name = 'movement';

  /**
   * 碰撞体积
   */
  size = 0;

  /**
   * 位置 [x, y, z]
   */
  pos = [0, 0, 0];

  /**
   * 速度 [x, y, z]
   */
  speed = [rs(), rs(), rs()];

  constructor (option?: IOptions) {
    if (option) Object.assign(this, option);
  }
}