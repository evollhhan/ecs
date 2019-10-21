import { System, IEntity } from '../@core';
import Sprite from '../components/sprite';
import Movement from '../components/movement';
import { GAME_DATA } from '../const';

type TriggeredEntity = IEntity<{
  sprite: Sprite;
  movement: Movement;
}>;

class CollisionSystem extends System {
  constructor () {
    super('CollisionSystem', ['sprite', 'movement']);
  }

  update (entity: TriggeredEntity) {
    // Check Wall.
    const { x, y, z } = entity.component.sprite.object!.position;
    const { speed, size } = entity.component.movement;
    this.hasHitWall(size, x, 0, speed);
    this.hasHitWall(size, y, 1, speed);
    this.hasHitWall(size, z, 2, speed);
  }

  hasHitWall (size: number, value: number, index: number, arr: number[]) {
    const threshold = GAME_DATA.ROOM_SIZE / 2 - size;
    if (value >= threshold || value <= (0 - threshold)) {
      arr[index] = 0 - arr[index];
    }
  }

  isCollided (e1: TriggeredEntity, e2: TriggeredEntity) {
    const { x: x1, y: y1, z: z1 } = e1.component.sprite.object!.position;
    const { x: x2, y: y2, z: z2 } = e2.component.sprite.object!.position;
    const d = Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2 - z1, 2);
    const minD = Math.pow(e1.component.movement.size + e2.component.movement.size, 2);
    if (d <= minD) {
      const swap = e1.component.movement.speed;
      e1.component.movement.speed = e2.component.movement.speed;
      e2.component.movement.speed = swap;
    }
  }

  lastUpdated () {
    // Check Balls.
    for (let i = 0, len = this.entities.length; i < len; i++) {
      const selectedEntity = this.entities[i] as TriggeredEntity;
      for (let j = i + 1; j < len; j++) {
        const comparedEntity = this.entities[j] as TriggeredEntity;
        this.isCollided(selectedEntity, comparedEntity);
      }
    }
  }
}

export default new CollisionSystem();
