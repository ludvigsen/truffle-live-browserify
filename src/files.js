const fs = require('fs');

function writeRaw(path, content) {
  return new Promise((f, r) => {
    fs.writeFile(path, content, 'utf8', (err) => {
      if (err) {
        r(err);
        return;
      }
      f();
    });
  });
}


module.exports = {
  readFile: (path) => {
    return new Promise((f, r) => {
      fs.readFile(path, 'utf8', (err, res) => {
        if (err) {
          r(err);
          return;
        }
        f(res);
      });
    });
  },
  writeRaw,
  writeFile: (file) => {
    console.log('WRITE FILE: ', file.path);
    return writeRaw(file.path, file.content);
  }
};
