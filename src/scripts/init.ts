import { Entity } from '../@core';
import { GAME_SCRIPT_NAME, GAME_WORLD_STATUS, GAME_DATA } from '../const';
import scriptManager from '../@extend/script-manager';
import Sprite from '../components/sprite';
import Movement from '../components/movement';
import game from '../game';
import getRandomColor from '../utils/get-random-color';
const { THREE } = window;

function createRoomObject() {
  const geom = new THREE.BoxGeometry(GAME_DATA.ROOM_SIZE, GAME_DATA.ROOM_SIZE, GAME_DATA.ROOM_SIZE);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
  material.opacity = 0.5;
  material.transparent = true;
  const cube = new THREE.Mesh(geom, material);
  return cube;
}

function createBallObject (size: number) {
  // With Random Color
  const geom = new THREE.SphereGeometry(size, 16, 16);
  const material = new THREE.MeshBasicMaterial({ color: getRandomColor() });
  const ball = new THREE.Mesh(geom, material);
  return ball;
}

function createBall (index: number) {
  const ball = new Entity('ball_' + index);
  const size = Math.floor(Math.random() * GAME_DATA.BALL_SIZE_RANGE + 8);
  const speed = [Math.random() * 2, Math.random() * 2, Math.random() * 2];
  ball.addComponent(new Sprite(createBallObject(size)));
  ball.addComponent(new Movement({ speed, size }));
  return ball;
}

function InitAction() {
  // Create a room entity & Add to the world.
  const room = new Entity('room');
  room.addComponent(new Sprite(createRoomObject()));
  game.world.add(room);

  // Create Balls
  for (let i = 0; i < GAME_DATA.BALL_NUM; i++) {
    setTimeout(() => room.add(createBall(i)), i * 600);
  }
}

export default scriptManager.register(
  GAME_SCRIPT_NAME.INIT,
  {
    eventName: GAME_WORLD_STATUS.START,
    action: InitAction
  }
)