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
    const { x, y, z } = object.position;
    const [ dx, dy, dz ] = movement.speed;
    object.position.set(
      x + dx * deltaTime,
      y + dy * deltaTime,
      z + dz * deltaTime
    );
  }
}

export default new MovementSystem();
