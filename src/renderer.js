'use strict';

function GetQueryString(name) {
    const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    const r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

// executed in context of window renderer
function parseArgs(key = '__ARGS__') {
    const queryArgs = GetQueryString(key);
    if (!queryArgs) {
        global[key] = {};
    } else {
        global[key] = Object.freeze(JSON.parse(decodeURIComponent(queryArgs)));
    }
    return key;
}

function expandArgs(params = {}, key) {
    key = parseArgs(key);
    global[key] = Object.freeze(Object.assign({}, params, global[key]));
    return global[key];
}

module.exports = {
    parseArgs,
    expandArgs,
};
