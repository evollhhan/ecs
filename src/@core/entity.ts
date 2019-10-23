import { IComponent } from './component';
import entityManager from './entity-manager';
import { hook } from './game-hook';
import { ENTITY_EVENTS } from './const';

type TComponentList = {
  [index: string]: IComponent | any;
}

export interface IEntity<T> extends Entity {
  component: T;
}

export class Entity {
  public id: string;
  public component: TComponentList = Object.create(null);
  public children: Entity[] = [];
  
  /**
   * @param id 实体ID
   */
  constructor (id: string) {
    this.id = id;
  }

  add (entity: Entity) {
    this.children.push(entity);
    hook.emit(ENTITY_EVENTS.ADD, this, entity);
  }

  remove (entity: Entity) {
    this.children = this.children.filter(e => e !== entity);
    hook.emit(ENTITY_EVENTS.REMOVE, this, entity);
  }

  getComponentNames (): string[] {
    return Object.keys(this.component).sort();
  }

  getComponent<T> (componentName: string): T | null | undefined {
    return this.component[componentName];
  }

  addComponent (component: IComponent) {
    this.component[component.name] = component;
    entityManager.updateIndexList('add', this, component.name);
  }

  removeComponent (componentName: string) {
    delete this.component[componentName];
    entityManager.updateIndexList('remove', this, componentName);
  }
}