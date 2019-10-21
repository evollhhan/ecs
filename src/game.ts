import { Entity, Ecs } from './@core';
import Sprite from './components/sprite';
import scriptManager from './@extend/script-manager';
import RenderSystem from './systems/render';
import { GAME_WORLD_STATUS, GAME_DATA } from './const';
import MovementSystem from './systems/movement';
import CollisionSystem from './systems/collision';
const { THREE } = window;

// GAME
class Game {
  private renderer = new THREE.WebGLRenderer();
  public scene = new THREE.Scene();
  public camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  public helper = new (THREE as any).OrbitControls(this.camera, this.renderer.domElement );
  public world = new Entity('GameWorld');
  public app = Ecs();

  constructor () {
    this.world.addComponent(new Sprite(this.scene));
    this.bindEvents();
    this.load();
  }

  bindEvents () {
    window.onload = () => {
      document.querySelector('.canvas')!.appendChild(this.renderer.domElement);
      this.setSize();
      window.requestAnimationFrame(animate);
    };

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
    this.app.addSystem(MovementSystem);
    this.app.addSystem(CollisionSystem);
    // Adjust Camera Position.
    this.camera.position.set(0, 0, GAME_DATA.CAMERA_DISTANCE);
    this.helper.update();
  }

  start () {
    this.app.start();
    scriptManager.emit(GAME_WORLD_STATUS.START);
  }

  render () {
    this.helper.update();
    this.renderer.render(this.scene, this.camera);
  }
}

const game = new Game();

// GAME_OPTIONS
const FPS = 1000 / GAME_DATA.FPS;

// VARS
let lastTime = performance.now();
let deltaTime = 0;

// FUNCTIONS
function animate (currentTime: number) {
  window.requestAnimationFrame(animate);
  deltaTime = currentTime - lastTime;
  if (deltaTime > FPS) {
    game.app.update(deltaTime / FPS);
    lastTime = currentTime;
  }
}

export default game;
