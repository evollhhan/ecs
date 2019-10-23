import { System, IEntity } from '../@core';
import Movement from '../components/movement';
import { GAME_DATA, GAME_EVENT } from '../const';

type TriggeredEntity = IEntity<{
  movement: Movement;
}>;

class CollisionSystem extends System {
  constructor () {
    super('CollisionSystem', ['movement']);
  }

  update (entity: TriggeredEntity) {
    // Check Wall.
    const { speed, size, pos } = entity.component.movement;
    this.hasHitWall(size, 0, pos, speed);
    this.hasHitWall(size, 1, pos, speed);
    this.hasHitWall(size, 2, pos, speed);
  }

  hasHitWall (size: number, index: number, pos: number[], speed: number[]) {
    const threshold = GAME_DATA.ROOM_SIZE / 2 - size;
    if (pos[index] >= threshold) {
      speed[index] = 0 - speed[index];
      pos[index] = threshold;
    } else if (pos[index] <= (0 - threshold)) {
      speed[index] = 0 - speed[index];
      pos[index] = 0 - threshold;
    }
  }

  isCollided (e1: TriggeredEntity, e2: TriggeredEntity) {
    const m1 = e1.component.movement;
    const m2 = e2.component.movement;
    const { pos: p1 } = m1;
    const { pos: p2 } = m2;
    const d = Math.pow(p2[0] - p1[0], 2) + Math.pow(p2[1] - p1[1], 2) + Math.pow(p2[0] - p1[0], 2);
    const minD = Math.pow(m1.size + m2.size, 2);
    if (d <= minD) {
      const swap = m1.speed;
      m1.speed = m2.speed;
      m2.speed = swap;
      this.hook.emit(GAME_EVENT.BALL_COLLIDED, e1, e2);
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
