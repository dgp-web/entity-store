const webpack = require('webpack');
const path = require('path');
const clone = require('js.clone');

module.exports = setTypeScriptAlias(require('./tsconfig.json'), {
    mode: 'development',
    devtool: 'inline-source-map',

    resolve: {
        extensions: ['.js', '.ts']
    },
    entry: {
        main: ['./karma-tests.js']
    },
    output: {
        path: path.join(__dirname, 'wwwroot'),
        filename: '[name].js',
        publicPath: '/dist/'
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: [/\.e2e\.ts$/],
                loaders: [
                    'awesome-typescript-loader?{ configFileName: "./tsconfig.spec.json", useTranspileModule: true, transpileOnly: true, useCache: true, cacheDirectory: ".awcache-test" }',
                ]
            },
            {
                enforce: 'post',
                test: /\.(js|ts)$/,
                loader: 'istanbul-instrumenter-loader',
                include: [
                    path.resolve(__dirname, 'src'),
                ],
                exclude: [
                    /\.(e2e|spec)\.ts$/,
                    /node_modules/
                ]
            }
        ]
    },

    node: {
        global: true,
        crypto: 'empty',
        process: true,
        module: false,
        clearImmediate: false,
        setImmediate: false
    }
});

function setTypeScriptAlias(tsConfig, config) {
    var newConfig = clone(config);
    newConfig = newConfig || {};
    newConfig.resolve = newConfig.resolve || {};
    newConfig.resolve.alias = newConfig.resolve.alias || {};
    var tsPaths = tsConfig.compilerOptions.paths;
    for (var prop in tsPaths) {
        newConfig.resolve.alias[prop] = root(tsPaths[prop][0]);
    }
    return newConfig;
}

function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [__dirname].concat(args));
}
