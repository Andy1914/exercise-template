// Karma configuration, see link for more information:
// http://karma-runner.github.io/0.13/config/configuration-file.html
const webpackConfig = require('./webpack.test.config');
process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      {pattern: './src/test.ts', watched: false},
    ],
    exclude: [
    ],
    plugins: [
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-coverage-istanbul-reporter',
      'karma-junit-reporter',
      'karma-webpack',
    ],
    preprocessors: {
      './src/test.ts': ['webpack'],
    },
    webpack: webpackConfig,
    mime: {
      'text/x-typescript': ['ts', 'tsx'],
    },
    coverageIstanbulReporter: {
      dir: './coverage',
      reports: ['lcov', 'cobertura'],
      fixWebpackSourcePaths: true,
      skipFilesWithNoCoverage: false,
      thresholds: {
        global: {
          statements: 90,
          lines: 90,
          branches: 90,
          functions: 90,
        },
        each: {
          statements: 85,
          lines: 85,
          branches: 65,
          functions: 80,
        },
      },
    },
    junitReporter: {
      outputDir: './reports',
    },
    browsers: ['ChromeHeadlessNoSandbox'],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox'],
      },
    },
    reporters: ['progress', 'coverage-istanbul', 'junit'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    browserDisconnectTolerance: 2,
    browserNoActivityTimeout: 30000,
    browserDisconnectTimeout: 30000,
    autoWatch: true,
    singleRun: false,
  });
};
