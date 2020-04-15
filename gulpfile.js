'use strict';

// Plugins
const gulp = require('gulp'),
	asciidoctor = require('gulp-asciidoctor'),
	del = require('del'),
	watch = require('gulp-watch');

// Dir aliases 
const PATH_IN = './';
//Root input for documentation
const PATH_IN_DOC = PATH_IN + 'docs/';
//Root documentation start page
const PATH_IN_DOC_START = PATH_IN_DOC + 'index.adoc';
//Filter for documentation CSS source files
const PATH_IN_DOC_CSS = PATH_IN_DOC + '**/*.css';
//Root output folder (configured in gitignore)
const PATH_OUT = 'dist/';
//Output folder for documentation
var PATH_OUT_DOC = PATH_OUT + '/docs';

// const asciidoctor = require('@asciidoctor/core')()
// require('@asciidoctor/docbook-converter')()

/* Pipeline for converting 
 * 1) ADOC to XML, XML to JSON
 * 2) ADOC to XML, XML to PDF
 * 3) XML to JSON
 * 4) XML to PDF
 * 5) JSON to JSON
 *
*/

// Clean assets
function clean() {
  return del(["./_site/assets/"]);
}

// Transform ADOC to HTML
function createHtml() {
	return gulp
		.src(PATH_IN_DOC_START)
  	.pipe(asciidoctor({
    	safe: 'safe',
      attributes: ['showtitle', 'linkcss!']
    }))
    .pipe(gulp.dest(PATH_OUT_DOC));
}

// Transform ADOC to XML 
function createXml() {
	return gulp
		.src(PATH_IN_DOC_START)
  	.pipe(asciidoctor({
			backend: 'docbook5', 
			doctype: 'article',
  		standalone: true,
    	safe: 'safe'
    }))
    .pipe(gulp.dest(PATH_OUT_DOC));
}


/*
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



function defaultTask(cb) {
	// Default task
	cb();
}

exports.clean = clean;
exports.createHtml = createHtml;
exports.createXml = createXml;
exports.default = defaultTask;



