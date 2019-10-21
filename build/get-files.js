const fs = require('fs');
const path = require('path');

const list = [];

function ReadDir(dir, parent) {
  try {
    const files = fs.readdirSync(dir);
    if (!files || !files.length) return;
    files.map(filename => {
      const conf = { filename };
      const filePath = path.resolve(dir, filename);
      const stats = fs.lstatSync(filePath)
      if (parent) {
        parent.children = parent.children || [];
        parent.children.push(conf);
      } else {
        list.push(conf);
      }

      if (stats.isDirectory()) {
        conf.dir = true;
        ReadDir(filePath, conf);
      } else {
        ReadFile(filePath, conf);
      }
    })
  } catch (err) {
    console.error('Read Dir Error:', dir);
    throw err;
  }
}

function ReadFile(filePath, conf) {
  try {
    const data = fs.readFileSync(filePath)
    const typeCheck = filePath.split('.');
    if (typeCheck.length === 1) {
      conf.lang = 'text';
    }
    switch (typeCheck[typeCheck.length - 1]) {
      case 'ts': conf.lang = 'typescript'; break;
      case 'js': conf.lang = 'javascript'; break;
      case 'scss': conf.lang = 'scss'; break;
      case 'less': conf.lang = 'less'; break;
      case 'stylus': conf.lang = 'stylus'; break;
    }
    conf.data = data.toString();
  } catch (err) {
    console.error('Read File Error:', err);
    throw err;
  }
}

ReadDir(path.resolve(__dirname, '../src'));

list.sort((a, b) => {
  if (a.dir && !b.dir) {
    return -1;
  }
  if (!a.dir && b.dir) {
    return 1;
  }
  return a > b;
});

fs.writeFileSync(
  path.resolve(__dirname, '../static/files.json'),
  JSON.stringify(list, null, 2)
);
