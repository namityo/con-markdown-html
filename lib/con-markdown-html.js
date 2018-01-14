var path = require("path");
var helper = require('./helper');

/*
 * class ConMarkdownHtml
 */
class ConMarkdownHtml {
    constructor() {
        this.outputExtname = "html"
        this.highlightStyle = "github.css";
        this.break = false;

        this._stylePaths = [];
    }

    _getHighlightStylePath() {
        // require.resolve('highlight.js') is "/node_modules/highlight.js/lib/index.js"
        return path.join(require.resolve('highlight.js'), '../../styles', this.highlightStyle);
    }

    addStylePath(path) {
        this._stylePaths.push(path);
        return this;
    }

    convert(inputPath) {
        var outputPath = path.join(
            path.dirname(inputPath),
            path.basename(inputPath).replace(
                                path.extname(inputPath),
                                '.' + this.outputExtname));

        // read markdown file
        var markdown = helper.readFile(inputPath);
        if (markdown.length > 0) {
            // make css and html-body
            var data = helper.convertMarkdownToHtml(markdown, this.break);
            var styles = helper.readStyles.apply(this, this._stylePaths.concat([this._getHighlightStylePath()]));
            // fusion html
            var html = helper.makeHtml(styles, data);
            // output
            helper.writeFile(outputPath, html, function(e) {
                if (e) {
                    console.error('ERROR: writeFile()');
                    console.error(e.message);
                } else {
                    console.info('CONVERT: ' + inputPath + ' -> ' + outputPath);
                }
            });
        }
    }
}

module.exports = ConMarkdownHtml;