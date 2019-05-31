'use strict';

function GetQueryString(name) {
    const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    const r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

// executed in context of window renderer
function parseArgs() {
    const queryArgs = GetQueryString('__ARGS__');
    if (!queryArgs) {
        global.__ARGS__ = {};
    } else {
        global.__ARGS__ = Object.freeze(JSON.parse(decodeURIComponent(queryArgs)));
    }
}

module.exports = {
    parseArgs,
};
