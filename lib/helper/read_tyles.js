'use strict';

module.exports = function readStyles() {
    var style = '';

    for(var i = 0;i < arguments.length; i++){
        style += makeCss(arguments[i]);
    }

    return style;
}

function makeCss(filename) {
    var css = require('./read_file')(filename);
    if (css) {
      return '\n<style>\n' + css + '\n</style>\n';
    } else {
      return '';
    }
}
