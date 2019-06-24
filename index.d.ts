
interface Renderer {
    parseArgs: (key:string) => string,
    expandArgs: (params: any, key:string) => any,
}

interface WindowManager {
    createMainWindow: (options:object) => any,
    createWindow: (options:object) => any,
    createSubWindow: (options:object) => any,
    hasMain: () => boolean,
    getMain: () => any,
    add: (win: any) => void,
    remove: (win: any) => void,
    destroy: () => void,
    centerSize: () => object,
    screenBounds: () => object,
    screenWorkAreas: () => object,
    findWin: (winID: string) => any,
    all: () => any[],
    allWithoutMain: () => any[],
    WindowManager?:WindowManager,
}

declare module '@2o3t/electron-window-manager' {
    const content: Renderer & WindowManager;
    export = content;
}
