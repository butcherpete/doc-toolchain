'use strict';

// Plugins
const {src, dest, files, series} = require('gulp'),
	//asciidoctor = require('gulp-asciidoctor'),
	asciidoctor = require('@asciidoctor/core')(),
	//dbConverter = require('@asciidoctor/docbook-converter')(),
  //	pandoc = require('gulp-pandoc'),
  nodePandoc = require('node-pandoc'),
	convert = require('xml-js'),
	fs = require('fs'),
	gxml = require('gulp-xml2js'),
	xml2js = require('xml2js'),
	del = require('del'),
	watch = require('gulp-watch'),
	print = require('gulp-print').default;

// Dir aliases 
const PATH_IN = './';
//Root input for documentation
const ADOC_IN = PATH_IN + 'input/';
//Root documentation start page
const ADOC_TEST = ADOC_IN + '*.adoc';
//Filter for documentation CSS source files
const PATH_IN_DOC_CSS = PATH_IN + '**/*.css';

// OUTPUT
//Root output folder (configured in .gitignore)
const PATH_OUT = 'output/';
// HTML output
const HTML_OUT = PATH_OUT + 'html/';
// XML output
const XML_OUT = PATH_OUT + 'xml/';
// PDF output
const PDF_OUT = PATH_OUT + 'pdf/';
//Output folder for documentation
var PATH_OUT_DOC = PATH_OUT + '/docs';

// CLEAN assets WORKS
function clean() {
  return del(["./output/html/"]);
}

// Transform ADOC to HTML WORKS
function createHtml() {
	return src(ADOC_TEST)
		.pipe(print())
  	.pipe(asciidoctor(
    ))
    .pipe(dest(HTML_OUT))
		.pipe(print());
}

// Transform ADOC to PDF 
function createPdf(cb) {

	let src = 'ADOC_TEST';
	let args = '-f docbook --pdf-engine=xelatex -s ./output/xml/quickstart.xml -o ./output/pdf/howto.pdf';
	const callback = (err, result) => {
		if (err) console.error('Oh Noes: ',err)
		return console.log(result), result	
	}
	nodePandoc(src, args, callback)
	cb();
};


// Transform ADOC to Docbook 
function createDocbook(cb) {

const asciidoctor = require('@asciidoctor/core')() 
require('@asciidoctor/docbook-converter')()

const options = {
	backend: 'docbook5', 
	doctype: 'article',
  standalone: true,
	safe: 'safe',
	to_file: './output/xml/julian.xml'
}

asciidoctor.convertFile('./input/adoc/quickstart.adoc', options);
cb();
};


/*
// Transform XML to JSON
function createJson(cb) {
	let xml = fs.readFileSync('./input/xml/howtoxml', 'utf8');
	let options = {ignoreComment: true, alwaysChildren: true, spaces: 4
	};
	let result = convert.xml2js(xml, options);
	console.log(result);
	cb();
};
*/

// Transform XML to JSON
function createJson(cb) {

	let xml = fs.readFileSync('./input/xml/howto.xml', 'utf8'); 
	let parser = new xml2js.Parser();
	let options = {trim: true, strict: false};

	const callback = (err, result) => {
		if (err) console.error('Oh Noes: ',err)
		return console.log(result), result	
	};

  console.log(xml);	
	let json = parser.parseString(xml, options, callback);
	console.log(json);
	cb();
};

/*
	return src(ADOC_TEST)
		.pipe(print())
  	.pipe(nodePandoc({
			from: 'asciidoc',
			to: 'pdf',
			ext: '.pdf',
			args: ['--smart']
		}))
    .pipe(dest(PDF_OUT))
		.pipe(print());
*/


// DOCBOOK Transform ADOC to XML 
function createXml() {
	return src('input/quickstart.adoc')
		.pipe(print())
  	.pipe(asciidoctor({
			backend: 'docbook5', 
			doctype: 'article',
  		standalone: true,
    	safe: 'safe'
    }))
    .pipe(dest(XML_OUT));
}

// Transform XML to JSON

/*
function createJson() {
	return src('input/howto.xml')
		.pipe(print())
    .pipe(gxml())
    .pipe(dest(XML_OUT))
		.pipe(print());
}

 * Every change to ADOC or CSS generates new build 

gulp.task('dev', function () {
	return gulp.src(PATH_IN_DOC_START)
		.pipe(watch([PATH_IN_DOC_START, PATH_IN_DOC_CSS]))
		.pipe(asciidoctor({
			safe: 'unsafe',
      attributes: ['showtitle', 'linkcss!']
        }))
    .pipe(gulp.dest(PATH_OUT_DOC));
});

*/


/*
function defaultTask(cb) {
	// Default task
	cb();
}
*/

exports.clean = clean;
exports.createHtml = createHtml;
exports.createXml = createXml;
exports.createJson = createJson;
exports.createPdf = createPdf;
exports.createDocbook = createDocbook;
exports.default = series(clean, createHtml);



