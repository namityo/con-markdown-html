'use strict';

var mkdirp = require("mkdirp");
var fs = require('fs');
var getDirName = require("path").dirname

module.exports = function writeFile(path, data, callback) {
    mkdirp(getDirName(path), function (err) {
        if (err) return callback(err)
        fs.writeFile(path, data, callback)
    });
}
