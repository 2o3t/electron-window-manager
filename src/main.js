'use strict';

// const is = require('electron-is');
const electron = require('electron');
const { app, BrowserWindow } = electron;

const MAIN_WIN = Symbol('WindowManager#MAIN_WIN');
const WIN_SET = Symbol('WindowManager#WIN_SET');

const INIT_WIN = Symbol('WindowManager#INIT_WIN');

const UUID = require('uuid').v4;

const optsFactory = require('./factory');
const loadURLWithArgs = require('./loadURL').loadURLWithArgs;
const regiestListener = require('./listener');

class WindowManager {

    constructor() {
        if (!this instanceof WindowManager) {
            return new WindowManager();
        }
        this[MAIN_WIN] = null;
        this[WIN_SET] = new Set();

        // 程序退出时
        app.on('will-quit', () => {
            this.destroy();
        });

        // 当全部窗口关闭时退出。
        app.on('window-all-closed', () => {
            // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
            // 否则绝大部分应用及其菜单栏会保持激活。
            if (process.platform !== 'darwin') {
                app.quit();
            }
        });
    }

    [INIT_WIN](options) {
        const opts = optsFactory(options);
        const win = new BrowserWindow(opts);
        if (options) {
            // 处理 custom 的参数
            if (options.url) {
                const args = options.args || {};
                loadURLWithArgs(win, options.url, args);
            }
        }
        win.name = options.name || `window#${new UUID()}`;

        win.on('closed', () => {
            this.remove(win);
        });

        // 优化
        win.once('ready-to-show', () => {
            if (win !== null) {
                win.show();
            }
        });

        regiestListener(win);

        this.add(win);
        return win;
    }

    createMainWindow(options) {
        if (!this.hasMain()) {
            this[MAIN_WIN] = this[INIT_WIN](options);
        } else {
            console.warn('already has a main window!');
        }
        return this[MAIN_WIN];
    }

    createWindow(options) {
        const win = this[INIT_WIN](options);
        return win;
    }

    createSubWindow(options) {
        options = Object.assign(options, { parent: this[MAIN_WIN]/* , modal: true */ });
        return this.createWindow(options);
    }

    hasMain() {
        return this[MAIN_WIN] !== null;
    }

    getMain() {
        return this[MAIN_WIN] || null;
    }

    add(win) {
        if (this[WIN_SET].has(win)) {
            return;
        }
        this[WIN_SET].add(win);
    }

    remove(win) {
        if (!win) {
            return;
        }
        this[WIN_SET].delete(win);
        win.destroy();

        if (this[MAIN_WIN] === win) {
            this[MAIN_WIN] = null;
        }
    }

    destroy() {
        this[WIN_SET].forEach(win => {
            this.remove(win);
        });
        this[WIN_SET].clear();
    }

    centerSize() {
        const electronScreen = electron.screen;
        const point = electronScreen.getCursorScreenPoint();
        const display = electronScreen.getDisplayNearestPoint(point);
        const { x, y, width, height } = display.bounds;
        return {
            x: x + width * 0.2,
            y: y + height * 0.2,
            width: width * 0.6,
            height: height * 0.6,
            screenWidth: width,
            screenHeight: height,
            screenX: x,
            screenY: y,
        };
    }

    screenBounds() {
        const electronScreen = electron.screen;
        const point = electronScreen.getCursorScreenPoint();
        const display = electronScreen.getDisplayNearestPoint(point);
        return display.bounds;
    }

    screenWorkAreas() {
        const electronScreen = electron.screen;
        const point = electronScreen.getCursorScreenPoint();
        const display = electronScreen.getDisplayNearestPoint(point);
        return display.workArea;
    }

    findWin(winID) {
        if (winID == null) {
            return null;
        }
        return BrowserWindow.fromId(winID);
    }

    all() {
        return [ ...this[WIN_SET] ];
    }

    allWithoutMain() {
        return [ ...this[WIN_SET] ].filter(win => { return win !== this[MAIN_WIN]; });
    }
}

const WM = new WindowManager();
WM.WindowManager = WindowManager;

module.exports = WM;
