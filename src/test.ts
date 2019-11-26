// This file is required by karma.conf.js and loads recursively all the .spec and framework files

// Unfortunately there's no typing for the `__karma__` variable. Just declare it as any.
declare var __karma__: any;

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

// Prevent Karma from running prematurely.
__karma__.loaded = function () {};

// Then we find all the tests.
const context = require.context("./", true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);
// Finally, start Karma to run the tests.
__karma__.start();
