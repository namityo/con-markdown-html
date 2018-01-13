var program = require('commander');
var ConMarkdownHtml = require('../lib/con-markdown-html');

program
  .version(require('../package.json').version)
  .usage('[options] <markdown-file ...>')
  .option('-c, --css <path>', 'add markdown style file')
  .option('-l, --hljs <name>', 'change highlight.js style file. (default vs2015.css')
  .option('-b, --break', 'new line to <br> ')
  .option('-e, --ext <extname>', 'output file ext (html format)')
  .parse(process.argv);

if (program.args.length === 0) program.help()

var obj = new ConMarkdownHtml();
if (program.ext) obj.outputExtname = program.ext;
if (program.hljs) obj.highlightStyle = program.hljs;
if (program.break) obj.break = program.break;
if (program.css) obj.stylePaths.push(program.css);

for(var i = 0;i < program.args.length; i++){
    obj.convert(program.args[i]);
}
