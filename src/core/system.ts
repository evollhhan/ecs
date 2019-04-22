import Entity from './entity';
import entityManager from './entity-manager';
import { hook } from './hook';

export default abstract class System {
  private entities: Entity[] = [];
  public name: string;

  /**
   * 创建系统
   * ----
   * 通常情况下，系统会遍历所有的实体，当你配置过滤器后，系统只会遍历包含特定组件的实体
   * @param name 系统名称
   * @param componentFilter 组件过滤器
   */
  constructor (name: string, componentFilter?: string[]) {
    this.name = name;
    // 初始化索引
    if (!componentFilter || !componentFilter.length) {
      this.entities = entityManager.entities;
    } else {
      const key = entityManager.getIndexName(componentFilter);
      this.entities = entityManager.getIndexList(key);
      hook.on(key, this.onListChanged.bind(this));
    }
  }

  /**
   * 遍历实体
   * @param deltaTime
   */
  public traverse (deltaTime: number) {
    this.entities.forEach((e, idx) => this.update(e, idx, deltaTime));
  }

  /**
   * 帧更新
   * @param entity 
   * @param index 
   * @param deltaTime 
   */
  public abstract update (entity: Entity, index: number, deltaTime: number): void;

  /**
   * 全部系统更新结束时调用
   */
  public lastUpdated () { };

  /**
   * 当遍历列表发生变化时触发，如某个Entity被添加或移除
   * @param action 添加 | 删除
   * @param entity 对应事件的Entity
   */
  public onListChanged (action: 'add' | 'remove', entity: Entity) { };
}
