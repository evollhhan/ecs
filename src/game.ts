import { Entity, Ecs } from './@core';
import Sprite from './components/sprite';
import scriptManager from './@extend/script-manager';
import RenderSystem from './systems/render';
import { GAME_WORLD_STATUS, GAME_DATA } from './const';
import MovementSystem from './systems/movement';
import CollisionSystem from './systems/collision';
import HealthSystem from './systems/health';
import Ticker from './utils/ticker';
const { THREE } = window;

// GAME
class Game {
  private renderer = new THREE.WebGLRenderer();
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  helper = new (THREE as any).OrbitControls(this.camera, this.renderer.domElement);
  ticker = new Ticker(GAME_DATA.FPS);
  world = new Entity('GameWorld');
  app = Ecs();

  constructor () {
    this.bindEvents();
    this.load();
  }

  bindEvents () {
    window.onload = () => {
      document.querySelector('.canvas')!.appendChild(this.renderer.domElement);
      this.setSize();
    };

    document.addEventListener('visibilitychange', () => {
      const state = document.visibilityState;
      if (state === 'hidden') {
        this.ticker.stop();
        this.app.pause();
      }
      else if (state === 'visible') {
        this.ticker.start();
        this.app.resume();
      }
    });

    const mask = document.getElementById('mask')!;
    let sto: NodeJS.Timeout | null = null;
    window.onresize = () => {
      if (sto) clearTimeout(sto);
      mask.style.display = 'block';
      sto = setTimeout(() => {
        this.setSize();
        mask.style.display = 'none';
        sto = null;
      }, 500);
    }

    this.ticker.handler = this.app.update.bind(this.app);
  }

  setSize () {
    const cvs = document.querySelector('.canvas')!
    const { width, height } = cvs.getBoundingClientRect();
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  load () {
    // Load Systems
    this.app.addSystem(RenderSystem);
    this.app.addSystem(HealthSystem);
    this.app.addSystem(CollisionSystem);
    this.app.addSystem(MovementSystem);
    // Adjust Camera Position.
    this.camera.position.set(0, 0, GAME_DATA.CAMERA_DISTANCE);
    this.helper.update();
    // Create World.
    this.world.addComponent(new Sprite(this.scene));
  }

  start () {
    this.app.start();
    this.ticker.start();
    scriptManager.emit(GAME_WORLD_STATUS.START);
  }

  render () {
    this.helper.update();
    this.renderer.render(this.scene, this.camera);
  }
}

export default new Game();;
