import { System, ENTITY_EVENTS, IEntity } from '../@core';
import Game from '../game';
import Sprite from '../components/sprite';

type TriggeredEntity = IEntity<{ sprite: Sprite }>

class RenderSystem extends System {
  constructor () {
    super('RenderSystem', ['sprite']);
    this.bindEvents();
  }

  bindEvents () {
    this.hook.on(ENTITY_EVENTS.ADD, this.renderObject.bind(null, 'add'));
    this.hook.on(ENTITY_EVENTS.REMOVE, this.renderObject.bind(null, 'remove'));
  }

  renderObject (action: 'add' | 'remove', parent: TriggeredEntity, child: TriggeredEntity) {
    const s1 = parent.component.sprite;
    const s2 = child.component.sprite;
    if (!s1 || !s2 || !s1.object || !s2.object) return;
    if (action === 'add') {
      s1.object.add(s2.object);
    } else {
      s1.object.remove(s2.object);
    }
  }

  lastUpdated () {
    Game.render();
  }
}

export default new RenderSystem();
