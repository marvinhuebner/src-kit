var gulp = require('gulp');
var fs = require('fs');
var ghandyman = require('gulp-handyman');
var config = require('./gulp.config.json');

ghandyman.checkEqualVersion({
	devDependencies: true,
	module: 'gulp-util'
});

gulp.task('sass', function(){
	ghandyman.handymanSass({
		srcPath: 'test.scss',
		destPath: 'css'
	});
});

gulp.task('js', function(){
	ghandyman.handymanJS({
		srcPath: 'test.js',
		fileName: 'app',
		destPath: 'css/js'
	})
});
