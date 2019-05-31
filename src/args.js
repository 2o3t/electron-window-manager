'use strict';

const assert = require('assert');
const path = require('path');
const url = require('url');

function encode(args) {
    args = args || null;
    assert.strictEqual(typeof args, 'object', 'args must be an object');
    // stringify the args
    args = args ? encodeURIComponent(JSON.stringify(args)) : '';
    return args;
}

function urlWithArgs(urlOrFile, args) {
    args = encode(args);

    let u;
    if (urlOrFile.indexOf('http') === 0 || urlOrFile.indexOf('data') === 0) {
        const urlData = url.parse(urlOrFile);
        const query = {
            __ARGS__: urlData.query || args ? args : undefined,
        };
        u = url.format(Object.assign(urlData, { query }));
    } else { // presumably a file url
        u = url.format({
            protocol: 'file',
            pathname: path.resolve(urlOrFile),
            slashes: true,
            query: {
                __ARGS__: args || undefined,
            },
        });
    }

    return u;
}

module.exports = {
    encode,
    urlWithArgs,
};
