'use strict';

const PromiseIpc = require('@2o3t/electron-ipc-promise');

module.exports = win => {
    const webContents = win.webContents;

    win.on('enter-full-screen', () => {
        if (webContents !== null) {
            PromiseIpc.send(PromiseIpc.ACTIONS.APP.FULL_SCREEN, webContents, true);
        }
    });
    win.on('leave-full-screen', () => {
        if (webContents !== null) {
            PromiseIpc.send(PromiseIpc.ACTIONS.APP.FULL_SCREEN, webContents, false);
        }
    });
};
