'use strict';

const wargs = require('./args');

function loadURLWithArgs(win, httpOrFileUrl, args) {
    win.webContents.once('did-finish-load', function() {
        // 加载完成
        console.info('load finish...');
    });

    const url = wargs.urlWithArgs(httpOrFileUrl, args);

    win.loadURL(url);
}

module.exports = {
    loadURLWithArgs,
};
