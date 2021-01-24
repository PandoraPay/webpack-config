const base = require('./webpack-base');
const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');


module.exports = (env, argv, pathResolve) =>
    merge(base(env, argv, pathResolve), {
        target: 'node',
        externals: [nodeExternals()],

        //entry point
        entry: {
            app: './build-node.js',
        },

        output: {
            filename: 'build-node.js',
            auxiliaryComment: 'Node.js build'
        },

        resolve: {
            alias: {}
        },

        plugins: [
            new webpack.DefinePlugin({
                BROWSER: false,
            })
        ]


    });
