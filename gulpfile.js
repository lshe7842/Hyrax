var gulp = require('gulp'),
	template = require('gulp-template'),
	rename = require('gulp-rename'),
	del = require('del');

var specJSON = require('./specs/test-spec.json');

// Basic workflow for creating a valid casper test file.
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

gulp.task('clean-temp', function(){
	del(['temp/**', 'targets/**']);
});

gulp.task('default', ['clean-temp', 'workflow-basic']);