import { IComponent } from '../@core';

export default class Sprite implements IComponent {
  name = 'sprite'

  /** 
   * 渲染对象
   */
  object: THREE.Object3D | null;

  constructor (obj: THREE.Object3D) {
    this.object = obj;
  }
}
