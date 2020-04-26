'use strict';

// Plugins
const {gulp, src, dest, files, series} = require('gulp'),
	//gasciidoctor = require('gulp-asciidoctor'),
	asciidoctor = require('@asciidoctor/core')(),
  pandoc = require('gulp-pandoc'),
  nodePandoc = require('node-pandoc'),
	convert = require('xml-js'),
	path = require('path'),
	fs = require('fs'),
	rename = require('gulp-rename'),
	//gxml = require('gulp-xml'),
	xml2js = require('gulp-xml2js'),
	del = require('del'),
	watch = require('gulp-watch'),
	print = require('gulp-print').default;

// INPUTS and OUTPUTS 
const ADOC_IN = path.join(__dirname, '/input/adoc/');
const XML_IN = path.join(__dirname, '/input/xml/');
const DOCX_IN = path.join(__dirname, '/input/docx/');
const ADOC_OUT = path.join(__dirname, '/output/adoc/');
const XML_OUT = path.join(__dirname, '/output/xml/');
const HMTL_OUT = path.join(__dirname, '/output/html/');
const JSON_OUT = path.join(__dirname, '/output/json/');


// Clean output 
function clean() {
  return del(["./output/*"]);
}

// Create output directories

function output(cb) {
  let xml = './output/xml';
  let pdf = './output/pdf';
  let docx = './output/docx';
  let html = './output/html';
  let json = './output/json';
	if (!fs.existsSync(xml)){
		fs.mkdirSync(xml);
	}
	if (!fs.existsSync(pdf)){
		fs.mkdirSync(pdf);
	}
	if (!fs.existsSync(docx)){
		fs.mkdirSync(docx);
	}
	if (!fs.existsSync(html)){
		fs.mkdirSync(html);
	}
	if (!fs.existsSync(json)){
		fs.mkdirSync(json);
	}
	cb();
}

/*
// Transform ADOC to HTML WORKS
function adoc2Html() {
	return src(ADOC_TEST)
		.pipe(print())
  	.pipe(gasciidoctor(
    ))
    .pipe(dest(HTML_OUT))
		.pipe(print());
}
*/

// Transform ADOC to HTML Works!
function adoc2Html(cb) {

let asciidoctor = require('@asciidoctor/core')() 
require('@asciidoctor/docbook-converter')()

let options = {
	//backend: 'docbook5', 
	doctype: 'article',
  standalone: true,
	safe: 'safe',
	to_file: './output/html/quickstart.html'
}

  let dir = './output/html';
	if (!fs.existsSync(dir)){
		fs.mkdirSync(dir);
	}

asciidoctor.convertFile('./input/adoc/quickstart.adoc', options);
cb();
};

// Transform XML to PDF Works!
function xml2Pdf(cb) {

let input = XML_TEST;
//let input = './input/xml/quickstart.xml'; 
let output = './output/pdf/quickstart.pdf';

let args = '-f docbook --pdf-engine=xelatex -s ' + input + ' -o ' + output; 

	console.log(input);
	console.log(output);
	console.log(args);

	const callback = (err, result) => {
		if (err) console.error('Oh Noes: ',err)
		return console.log(result), result	
	}
  let dir = './output/xml';
	if (!fs.existsSync(dir)){
		fs.mkdirSync(dir);
	}
	nodePandoc(input, args, callback)

	cb();
};

// DOCX to XML 

function docx2Xml(cb) {

let input = './input/docx/test.docx'; 
let output = './output/xml/quickstart-docx.xml';
let dir = './output/docx';
if (!fs.existsSync(dir)){
	fs.mkdirSync(dir);
}

let args = '-f docx -t docbook -s ' + input + ' -o ' + output; 

	console.log(input);
	console.log(output);
	console.log(args);

	const callback = (err, result) => {
		if (err) console.error('Oh Noes: ',err)
		return console.log(result), result	
	}
	nodePandoc(input, args, callback)

	cb();
};

// Transform ADOC to Docbook  Works!
function adoc2Xml(cb) {

let asciidoctor = require('@asciidoctor/core')() 
require('@asciidoctor/docbook-converter')()

let options = {
	backend: 'docbook5', 
	doctype: 'article',
  standalone: true,
	safe: 'safe',
	to_file: './output/xml/julian.xml'
}

  let dir = './output/xml';
	if (!fs.existsSync(dir)){
		fs.mkdirSync(dir);
	}

asciidoctor.convertFile('./input/adoc/quickstart.adoc', options);
cb();
};

// Transform XML to JSON Doesn't Work
function xml2Json(cb) {
	src('./input/xml/quickstart.xml')
		.pipe(xml2js())
		.pipe(dest('./output/json'));
	cb();
};

exports.clean = clean;
exports.adoc2Html = adoc2Html;
exports.adoc2Xml = adoc2Xml;
exports.docx2Xml = docx2Xml;
exports.xml2Json = xml2Json;
exports.xml2Pdf = xml2Pdf;
exports.default = series(clean, output, adoc2Html, docx2Xml, adoc2Xml, xml2Pdf, xml2Json);
