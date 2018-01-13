'use strict';

var path = require("path");
var mustache = require('mustache');

module.exports = function makeHtml(styles, data) {
    // read template
    var template = require('./read_file')(path.join(__dirname, '../../template', 'template.html'));

    // convert template
    var view = {
      style: styles,
      content: data
    };
    return mustache.render(template, view);
}
