const path = require('path');
const webpack = require('webpack');

const webpackDashboard = require('webpack-dashboard/plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const friendlyErrors = require('friendly-errors-webpack-plugin');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const isProduction = process.argv.includes('--production');
const isES5 = process.argv.includes('--es5');
const isUglify = process.argv.includes('--uglify');
const isBundleAnalyzer = process.argv.includes('--analyzer');

const isTests = process.argv.includes("--tests");
const isDebug = process.argv.includes("--debug");

console.log("");
console.info("--tests", isTests);
console.info("--debug", isDebug);
console.info("isProduction", isProduction);
console.log("");

const plugins = [

    new webpack.DefinePlugin({
        "process.env.debug": isDebug,
        "process.env.tests": isTests,
    }),

];

if (isBundleAnalyzer)
    plugins.push( new BundleAnalyzerPlugin() );

var optimization = {
    minimizer: [],
};

if (isUglify && isES5)
    optimization.minimizer.push(
        new UglifyJsPlugin({
            cache: true,
            parallel: true,
            uglifyOptions: {
                compress: false,
                ecma: 6,
                mangle: true
            },
            sourceMap: true
        })
    );



module.exports = ( env, argv, pathResolve )=>{

    console.info("Webpack Config Started");

    if (!pathResolve )
        pathResolve = p => path.resolve( __dirname + p)

    return {

        devtool: isProduction
            ? false
            : "source-map", // 'inline-source-map',

        //entry point
        entry: [
            'babel-polyfill',
            './index.js',
        ],

        //  output
        output: {
            path: pathResolve( './../../build/output'),
            publicPath: '/build/output/',
            filename: 'output.js',

            library: '',
            libraryTarget: 'commonjs'
        },

        //source folders
        resolve: {
            alias: {
            },
            extensions: ['.js']
        },


        optimization: optimization,

        plugins:

            isProduction
                ? Array.prototype.concat(
                    plugins,
                    []
                )
                : Array.prototype.concat( [
                        new webpackDashboard(),
                        new friendlyErrors(),
                    ],
                    plugins
                ),



        //webpack parameters & rules
        module:

            isES5
                ? {

                    noParse: /es6-promise\.js$/,

                    rules: [

                        {
                            test: /\.js$/,
                            exclude: [
                                pathResolve( "/../../node_modules"),
                                pathResolve( isTests ? "/../../node_modules" : "/../../tests" ),
                            ],
                            loader: 'babel-loader',
                            options: {
                                presets: [
                                    '@babel/preset-env',
                                    {
                                        plugins: [
                                            ["@babel/plugin-transform-instanceof"],
                                        ]
                                    }
                                ]
                            }
                        },

                        { test: /\.go$/, loader: 'raw-loader' },

                    ]

                }
                : {
                    rules:[

                        {
                            test: /\.js$/,
                            exclude: [
                                pathResolve( "/../../node_modules"),
                                pathResolve( isTests ? "/../../node_modules" : "/../../tests" ),
                            ],
                            loader: 'babel-loader',
                            options: {
                                presets: [
                                    [
                                        '@babel/preset-env',
                                        {
                                            "targets": {
                                                "node": "current"
                                            }
                                        }
                                    ],
                                ],
                                plugins: [
                                    ["@babel/plugin-transform-instanceof"],
                                ]
                            }
                        },

                        { test: /\.go$/, loader: 'raw-loader' },
                    ]
                },



    };

}


