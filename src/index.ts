// @ts-ignore
import HL from 'my-code-viewer/dist/hl.web';
import CodeViewer from 'my-code-viewer';
import 'my-code-viewer/dist/hl.web.css?raw';
import 'my-code-viewer/dist/main.css?raw';
import game from './game';
import './scripts/init';

// init code viewer.
const viewer = new CodeViewer();
viewer.useRenderer(HL.highlightBlock);
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
