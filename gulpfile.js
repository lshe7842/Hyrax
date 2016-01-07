var gulp = require('gulp'),
	template = require('gulp-template'),
	rename = require('gulp-rename'),
	del = require('del');

// Basic workflow for creating a valid casper test file.
gulp.task('workflow-basic', function(){
	return gulp.src('src/casper-test.tpl')
				.pipe(template({
					testCaseName: 'Test case 1',
					url: 'http://localhost/GTConnect/UnifiedAcceptor/Sandbox.WebTest',
					assert: 'test.assertEquals(1, 1)'
				}))
				.pipe(rename('casper-test.js'))
				.pipe(gulp.dest('targets/'));
});

gulp.task('clean-temp', function(){
	del(['temp/**', 'targets/**']);
});

gulp.task('default', ['clean-temp'], function(){
	gulp.start('workflow-basic');
});