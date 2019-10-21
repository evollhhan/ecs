import * as THREE_DEF from 'three';

declare global {
  interface Window {
    THREE: typeof THREE_DEF;
  }
}
