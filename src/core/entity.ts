import { IComponent } from './component';
import entityManager from './entity-manager';

type TComponentList = {
  [index: string]: IComponent | any;
}

export default class Entity {
  public component: TComponentList = Object.create(null);
  public id: string;
  
  /**
   * 创建实体 
   * @param id 实体ID
   */
  constructor (id: string) {
    this.id = id;
  }

  /**
   * 获取组件名称列表
   */
  getComponentNames (): string[] {
    return Object.keys(this.component).sort();
  }

  /**
   * 添加组件
   * @param component 组件
   */
  addComponent (component: IComponent) {
    this.component[component.name] = component;
    entityManager.updateIndexList('add', this, component.name);
  }

  /**
   * 移除组件
   * @param component 组件
   */
  removeComponent (component: IComponent) {
    delete this.component[component.name];
    entityManager.updateIndexList('remove', this, component.name);
  }
}