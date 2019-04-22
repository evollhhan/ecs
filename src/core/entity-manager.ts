import Entity from './entity';
import { hook } from './hook';

class EntityManager {
  /**
   * 实体列表
   */
  public entities: Entity[] = [];

  /**
   * 索引列表
   */
  private indexList: {
    [index: string]: Entity[]
  } = Object.create(null);

  /**
   * 获取实体
   * @param id 实体ID
   */
  get (id: string): Entity | undefined {
    return this.entities.find(e => e.id === id);
  }

  /**
   * 搜索所有ID包含关键词的实体
   * @param key 搜索词
   */
  search (key: string): Entity[] {
    const result: Entity[] = [];
    this.entities.forEach(e => {
      if (e.id.indexOf(key) > -1) {
        result.push(e);
      }
    })
    return result;
  }

  /**
   * 添加实体
   * @param entity 实体
   */
  add (entity: Entity) {
    this.entities.push(entity);
  }

  /**
   * 按照一定规则生成过滤索引名
   * @param filter 过滤器
   */
  getIndexName (filter: string[]): string {
    return filter.sort().join(',') + ','
  }


  /**
   * 获取索引列表
   * @param key 过滤器，通过getIndexName生成
   */
  getIndexList (key: string): Entity[] {
    if (!this.indexList[key]) {
      this.indexList[key] = [];
    }
    return this.indexList[key];
  }

  /**
   * 当某个Entity的组件列表发生变化时，更新索引列表
   * @param action 添加 | 删除组件
   * @param entity Entity
   * @param componentName 组件名称
   */
  updateIndexList (action: 'add' | 'remove', entity: Entity, componentName: string) {
    for (let key in this.indexList) {
      if (key.indexOf(componentName) > -1) {
        const list = this.indexList[key];
        switch (action) {
          case 'add':
            if (this.matchIndex(key, entity.getComponentNames())) {
              list.push(entity);
              hook.emit(key, action, entity);
            }
            break;
          case 'remove':
            const index = list.indexOf(entity);
            if (index > -1) {
              list.splice(index, 1);
              hook.emit(key, action, entity);
            }
            break;
        }
      }
    }
  }


  /**
   * 匹配某个Entity是否属于索引
   * @param indexName
   * @param componentNameList
   */
  private matchIndex (indexName: string, componentNameList: string[]): boolean {
    const indexList = indexName.substr(0, indexName.length - 1).split(',');
    const count = indexList.length;
    let matched = false;
    let checked = 0;
    componentNameList.some(componentName => {
      if (componentName === indexList[checked]) {
        checked ++;
      }
      if (count === checked) {
        matched = true;
        return true;
      } else {
        return false;
      }
    })
    return matched;
  }
}

export default new EntityManager();
