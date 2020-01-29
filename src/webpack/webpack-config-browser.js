const base = require('./webpack-base');
const merge = require('webpack-merge');
const webpack = require('webpack');

module.exports = (env, argv, pathResolve) =>
    merge(base(env, argv, pathResolve), {
        target: 'web',

        node: {
            console: false,
            child_process: "empty",
            dgram: "empty",
            fs: 'empty',
            net: 'empty',
            tls: 'empty',
            uws: 'empty'
        },

        //entry point
        entry: {
            app: './build-browser.js'
        },

        output: {
            filename: 'build-browser.js',
            auxiliaryComment: 'Browser ES5 build',
            libraryTarget: 'umd' // Fix: "Uncaught ReferenceError: exports is not defined".
        },

        plugins: [
            new webpack.DefinePlugin({
                BROWSER: true,
            })
        ]


    });