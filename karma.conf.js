process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function (config) {
    config.set({
        basePath: '.',
        frameworks: [
            'jasmine'
        ],
        files: [
            './karma-tests.js'
        ],
        plugins: [
            require('karma-jasmine'),
            require('karma-webpack'),
            require('karma-chrome-launcher'),
            require('karma-mocha-reporter'),
        ],
        preprocessors: {
            './karma-tests.js': ['webpack']
        },
        reporters: [
            'mocha'
        ],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: [
            'ChromeHeadless'
        ],

        mime: {'application/javascript': ['ts', 'tsx']},
        singleRun: false,
        webpack: require('./webpack.config.test.js'),
        webpackMiddleware: {stats: 'errors-only'}
    });
};
