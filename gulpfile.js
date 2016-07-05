var gulp = require('gulp'),
	template = require('gulp-template'),
	rename = require('gulp-rename'),
	del = require('del'),
	data = require('gulp-data'),
	swig = require('gulp-swig'),
	minimist = require('minimist'),
	casperjs = require('gulp-casperjs'),
	specProcessor = require('./src/testSpecProcessor');

// var specJSON = require('./specs/test-spec.json');

var knownOptions = {
    string: 'spec',
    default: {spec: 'test-spec-swig'}
};
var option = minimist(process.argv.slice(2), knownOptions);

var specJSON = require('./specs/' + option.spec + '.json'),
	spec = specProcessor(specJSON);

// Basic workflow for creating a valid casper test file - using Swig to support multiple asserts.
gulp.task('workflow-prepare-run', ['clean-temp'], function(){
	gulp.src('src/casper-test-swig.tpl')
		.pipe(data(spec))
		.pipe(swig())
		.pipe(rename('casper-test.js'))
		.pipe(gulp.dest('targets/'))
		.pipe(casperjs());
});

gulp.task('workflow-prepare', ['clean-temp'], function(){
	gulp.src('src/casper-test-swig.tpl')
		.pipe(data(spec))
		.pipe(swig())
		.pipe(rename('casper-test.js'))
		.pipe(gulp.dest('targets/'));
});

gulp.task('clean-temp', function(){
	del(['temp/**', 'targets/**']);
});

gulp.task('default', ['clean-temp', 'workflow-prepare-run']);
gulp.task('partial', ['clean-temp', 'workflow-prepare']);