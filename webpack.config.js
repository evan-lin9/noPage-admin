/*
* 本文件为配置 WebStorm Webpack resolve alias
* 非实际 Webpack 配置文件
* */

const path = require('path');

function resolve(dir) {
  return path.join(__dirname, '.', dir);
}

module.exports = {
  resolve: {
    alias: {
      assets: resolve('src/assets'),
      components: resolve('src/components'),
      services: resolve('src/services'),
      utils: resolve('src/utils'),
    },
  },
};
