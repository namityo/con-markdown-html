'use strict';

var fs = require('fs');

module.exports = function readFile(filename, encode) {
    if (filename.length === 0) {
        return '';
    }
    if (!encode && encode !== null) {
        encode = 'utf-8';
    }
    if (filename.indexOf('file://') === 0) {
        if (process.platform === 'win32') {
            filename = filename.replace(/^file:\/\/\//, '').replace(/^file:\/\//, '');
        } else {
            filename = filename.replace(/^file:\/\//, '');
        }
    }
    if (isExistsFile(filename)) {
        return fs.readFileSync(filename, encode);
    } else {
        return '';
    }
}

function isExistsFile(filename) {
    try {
        if (fs.statSync(filename).isFile()) {
            return true;
        }
    } catch (e) {
        console.warn(e.message);
        return false;
    }
}
