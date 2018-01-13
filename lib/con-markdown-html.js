var path = require("path");
var helper = require('./helper');

/*
 * class ConMarkdownHtml
 */
class ConMarkdownHtml {
    constructor() {
        this.outputExtname = "html"
        this.stylePaths = [
            path.join(__dirname, '../css', 'main.css'),
            path.join(__dirname, '../css', 'markdown.css'),
            path.join(__dirname, '../css', 'tomorrow.css')
        ];
        this.highlightStyle = "vs2015.css";
        this.break = false;
    }

    _getHighlightStylePath() {
        return path.join(__dirname, '../node_modules', 'highlight.js', 'styles', this.highlightStyle);
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
            var styles = helper.readStyles.apply(this, this.stylePaths.concat([this._getHighlightStylePath()]));
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