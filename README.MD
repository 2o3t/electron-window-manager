# @2o3t/electron-window-manager

## Installation

```sh
yarn add @2o3t/electron-window-manager
```

## Usage

in main process

```js
// in main process
const { app } = require('electron')
const path = require('path')
const wm = require('@2o3t/electron-window-manager')

app.on('ready', () => {
    const mainWindow = wm.createMainWindow({
        width: 1000, height: 400,
        url: path.resolve(__dirname, 'index.html'),
        args: {
            data: 'hi',
        },
        webPreferences: {
            preload: './preload.js',
        },
    });

    // or
    // const win = wm.createWindow({
    //     width: 1000, height: 400,
    //     url: path.resolve(__dirname, 'index.html'),
    //     args: {
    //         data: 'hi',
    //     },
    // });
});

```

you must create preload.js

```js
// preload.js
require('@2o3t/electron-window-manager').parseArgs();
```

in renderer process

```js
// in renderer process
console.log(__ARGS__);
```

## API

```js
const wm = require('@2o3t/electron-window-manager')

// return boolean
wm.hasMain();

// return main window
wm.getMain();

// add new window
wm.add(win);

// remove a window
wm.remove(win);

// destroy all
wm.destroy();


// return center size
wm.centerSize();

wm.screenBounds();

wm.screenWorkAreas();

wm.findWin(winID);

wm.all();

wm.allWithoutMain();

```
