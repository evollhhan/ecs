const fs = require('fs');
const path = require('path');
const fileSearcher = require('my-code-viewer/tools/file-searcher');

const resolve = url => path.resolve(__dirname, '../', url);
const baseURL = resolve('');
const src = resolve('src');
const static = resolve('static');

fs.readdir(src, (err, files) => {
  fileSearcher.makeList(files, src).toFile(static, 'files.json');
});