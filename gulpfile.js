var gulp = require('gulp'),
	template = require('gulp-template'),
	rename = require('gulp-rename'),
	del = require('del'),
	data = require('gulp-data'),
	swig = require('gulp-swig'),
	casperjs = require('gulp-casperjs'),
	specProcessor = require('./src/testSpecProcessor');

// var specJSON = require('./specs/test-spec.json');

var specJSON = require('./specs/test-spec-swig.json'),
	spec = specProcessor(specJSON);

// INACTIVE - Basic workflow for creating a valid casper test file.
gulp.task('workflow-basic', function(){
	gulp.src('src/casper-test.tpl')
		.pipe(template({
			testCaseName: 'Test case 1',
			url: 'https://sysa.insuranceonline.nrma.auiag.corp/oss/GTConnect/UnifiedAcceptor/SelfServiceCentre.Main/brandId/nrma',
			assert: 'test.assertExists("#username")'
		}))
		.pipe(rename('casper-test.js'))
		.pipe(gulp.dest('targets/'));
});

// Basic workflow for creating a valid casper test file - using Swig to support multiple asserts.
gulp.task('workflow-swig', function(){
	gulp.src('src/casper-test-swig.tpl')
		.pipe(data(spec))
		.pipe(swig())
		.pipe(rename('casper-test.js'))
		.pipe(gulp.dest('targets/'))
		.pipe(casperjs());
});

gulp.task('clean-temp', function(){
	del(['temp/**', 'targets/**']);
});

gulp.task('default', ['clean-temp', 'workflow-swig']);