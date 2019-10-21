import System from './system';
import { IEntity, Entity } from './entity';
import { Ecs } from './main';
import { ECS_STATUS, ENTITY_EVENTS } from './const';
import { IComponent } from './component';
import { EventEmitter } from './game-hook';

export {
  IComponent,
  ECS_STATUS,
  ENTITY_EVENTS,
  EventEmitter,
  Entity,
  System,
  Ecs,
}

export type IEntity<T> = IEntity<T>;
