'use strict';

var MarkdownIt = require('markdown-it');
var hljs = require('highlight.js');

module.exports = function convertMarkdownToHtml(markdown, breaks) {
    var md = new MarkdownIt({
        html: true,
        breaks: breaks || false,
        highlight: function (str, lang) {
            if (lang && hljs.getLanguage(lang)) {
                try {
                    return '<pre class="hljs"><code>' + hljs.highlight(lang, str, true).value + '</code></pre>';
                } catch (e) {
                    console.error('ERROR: markdown-it:highlight.js');
                    console.error(e.message);
                }
            }
            return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';;
        }
    })
    .use(require('markdown-it-checkbox'))
    .use(require('markdown-it-footnote'))
    .use(require('markdown-it-sup'))
    .use(require('markdown-it-sub'));

    var defaultImageRender = md.renderer.rules.image;
    var defaultLinkRender = md.renderer.rules.link_open || function(tokens, idx, options, env, self) {
        return self.renderToken(tokens, idx, options);
    };

    md.renderer.rules.image = function (tokens, idx, options, env, self) {
        var token = tokens[idx];
        var href = token.attrs[token.attrIndex('src')][1];
        // uri decode image path
        href = decodeURIComponent(href).replace(/("|')/g, '');
        token.attrs[token.attrIndex('src')][1] = href;

        // pass token to default renderer.
        return defaultImageRender(tokens, idx, options, env, self);
    };

    md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
        var token = tokens[idx];
        var href = token.attrs[token.attrIndex('href')][1];
        // uri decode link path & .md to .html
        href = decodeURIComponent(href).replace(/("|')/g, '').replace(/.md$/g, '.html');
        token.attrs[token.attrIndex('href')][1] = href;

        // pass token to default renderer.
        return defaultLinkRender(tokens, idx, options, env, self);
    };

    return md.render(markdown);
}
