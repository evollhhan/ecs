import { System, IEntity } from '../@core';
import Movement from '../components/movement';
import Sprite from '../components/sprite';

type TriggeredEntity = IEntity<{
  sprite: Sprite;
  movement: Movement;
}>

class MovementSystem extends System {
  constructor () {
    super('MovementSystem', ['movement', 'sprite']);
  }

  update (entity: TriggeredEntity, index: number, deltaTime: number) {
    const { sprite, movement } = entity.component;
    const { object } = sprite;
    if (!object) return;
    const { speed, pos } = movement;
    pos[0] = pos[0] + speed[0] * deltaTime;
    pos[1] = pos[1] + speed[1] * deltaTime;
    pos[2] = pos[2] + speed[2] * deltaTime;
    object.position.set(pos[0], pos[1], pos[2]);
  }
}

export default new MovementSystem();
