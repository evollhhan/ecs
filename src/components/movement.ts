import { IComponent } from '../@core';

interface IOptions {
  speed?: number[];
  size?: number;
}

export default class Movement implements IComponent {
  name = 'movement';

  /**
   * 速度 [x, y, z]
   */
  speed = [0, 0, 0];

  /**
   * 碰撞体积
   */
  size = 0;

  constructor (option?: IOptions) {
    if (option) Object.assign(this, option);
  }
}