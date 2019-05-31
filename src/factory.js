'use strict';

// 窗口通用配置
module.exports = (opts = {}) => {
    const options = {
        useContentSize: true,
        show: false,
    };
    Object.assign(opts, options);

    if (!opts.webPreferences) {
        opts.webPreferences = {};
    }
    const webPreferences = {
        // 为了安全配置
        nodeIntegrationInWorker: false,
        webSecurity: true,
        nodeIntegration: false,
    };
    Object.assign(opts.webPreferences, webPreferences);

    return opts;
};
