import { System, IEntity } from '../@core';
import Health from '../components/health';
import Movement from '../components/movement';

type TriggeredEntity = IEntity<{
  health: Health;
  movement: Movement;
}>;

class HealthSystem extends System {

  constructor () {
    super('HealthSystem', ['health', 'movement']);
  }

  update (e: TriggeredEntity) {
    let { life } = e.component.health;
    life -= 1;
    if (life <= 0) {
      e.removeComponent('movement');
      const board = document.getElementById('board')!;
      board.setAttribute('data-num', `${Number(board.dataset.num) - 1}`);
    } else {
      // const { speed } = e.component.movement;
      // const percent = life / 100;
      // speed[0] = speed[0] * percent;
      // speed[1] = speed[1] * percent;
      // speed[2] = speed[2] * percent;
    }
    e.component.health.life = life;
  }
}

export default new HealthSystem();
