import game from './game';
import CodeViewer from 'my-code-viewer';
import 'my-code-viewer/dist/style.css?raw';
import './scripts/init';

// init code viewer.
const viewer = new CodeViewer();
document.getElementById('app')!.appendChild(viewer.rootNode);

// get files.
const xhr = new XMLHttpRequest();
xhr.open('get', 'files.json');
xhr.responseType = 'json';
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
    viewer.loadFiles(xhr.response);
  }
}
xhr.send();

// start Game.
game.start();
