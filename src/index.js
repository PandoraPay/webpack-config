const webpackBase = require('./webpack/webpack-base');
const webpackConfigBrowser = require('./webpack/webpack-config-browser');
const webpackConfigNode = require('./webpack/webpack-config-node');

console.info("Webpack Config Init");

module.exports = {
    webpackBase : webpackBase,
    webpackConfigBrowser : webpackConfigBrowser,
    webpackConfigNode : webpackConfigNode,
};
