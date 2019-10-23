import scriptManager from '../@extend/script-manager';
import { GAME_EVENT, GAME_SCRIPT_NAME } from '../const';
import Health from '../components/health';
import { IEntity } from '../@core';

type TriggeredEntity = IEntity<{
  health: Health;
}>;

function AddLifeAction (e1: TriggeredEntity, e2: TriggeredEntity) {
  e1.component.health.life += 20;
  e2.component.health.life += 20;
}

export default scriptManager.register(
  GAME_SCRIPT_NAME.ADD_LIFE,
  {
    eventName: GAME_EVENT.BALL_COLLIDED,
    action: AddLifeAction
  }
)
