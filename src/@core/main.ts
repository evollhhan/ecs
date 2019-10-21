import System from './system';
import GameLoop from './game-loop';
import { hook } from './game-hook';
import { ECS_STATUS } from './const';

class EcsCore {
  /** 游戏循环 */
  private looper: GameLoop = new GameLoop();
  /** 游戏系统列表 */
  private systems: System[] = [];
  /** 游戏勾子 */
  public hook = hook;
  /** 游戏运行状态 */
  public status: string = ECS_STATUS.STOPPED;

  constructor () {
    this.looper.add(this.updateSystem.bind(this));
  }

  /**
   * 添加系统
   * @param system
   */
  addSystem (system: System) {
    if (this.systems.find(sys => sys.name === system.name)) return;
    this.systems.push(system);
  }

  /**
   * 移除系统
   */
  removeSystem (system: System | string) {
    const idx = typeof system === 'string'
      ? this.systems.findIndex(sys => sys.name === system )
      : this.systems.findIndex(sys => sys.name === system.name);
    if (idx > -1) {
      this.systems.splice(idx, 1);
    }
  }

  /**
   * 更新系统
   * @param deltaTime
   */
  updateSystem (deltaTime: number) {
    // 第一遍帧更新
    for (let sys of this.systems) {
      sys.traverse(deltaTime);
    }
    // 第二遍等全部系统帧更新结束后再次更新
    for (let sys of this.systems) {
      sys.lastUpdated();
    }
  }

  /**
   * 切换游戏状态
   * @param looperStart
   * @param gameStatus
   */
  private changeGameStatus (looperStart: boolean, gameStatus: string) {
    if (this.status === gameStatus) return;
    if (looperStart) {
      this.looper.start();
    } else {
      this.looper.stop();
    }
    this.hook.emit(gameStatus);
    this.status = gameStatus;
  }

  /**
   * 开始游戏
   */
  start () {
    this.changeGameStatus(true, ECS_STATUS.RUNNING);
  }

  /**
   * 暂停游戏
   */
  pause () {
    this.changeGameStatus(false, ECS_STATUS.PAUSED);
  }

  /**
   * 恢复游戏
   */
  resume () {
    this.changeGameStatus(true, ECS_STATUS.RUNNING);
  }

  /**
   * 停止游戏
   */
  stop () {
    this.changeGameStatus(false, ECS_STATUS.STOPPED);
  }

  /**
   * 更新游戏
   * @param deltaTime
   */
  update (deltaTime: number) {
    this.looper.exec(deltaTime);
  }
}

let ecs: EcsCore;

export function Ecs (): EcsCore {
  if (!ecs) ecs = new EcsCore();
  return ecs;
}
