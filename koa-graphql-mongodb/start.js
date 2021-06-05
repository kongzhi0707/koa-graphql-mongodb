
require('@babel/register')({
  presets: [
      '@babel/preset-env'
  ],
});

/**
 * 解决async报错：regeneratorRuntime is not defined
 * 需要安装：sudo npm install --save-dev  babel-core babel-polyfill babel-preset-es2015 babel-preset-stage-0 babel-loader
 */
require("babel-core/register");
require("babel-polyfill");

require('./server.js');
