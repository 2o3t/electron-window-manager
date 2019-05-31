'use strict';

const isRenderer = require('is-electron-renderer');

let outModule = null;
if (isRenderer) {
    outModule = require('./src/renderer');
} else {
    outModule = require('./src/main');
}

module.exports = outModule;
