const gulp = require('gulp-param')(require('gulp'), process.argv);
const gutil = require('gulp-util');
const del = require('del');
const fs = require('fs');
const watch = require('gulp-watch');
const ghandyman = require('gulp-handyman');
const browserSync = require('browser-sync');
const merge = require('merge-stream');

const importConfig = require('./gulp.config.js');

const config = importConfig.config;
const files = importConfig.files;

gulp.task('default', ['scss', 'js', 'pug', 'watch']);
gulp.task('frontend', ['scss', 'js', 'pug', 'watch', 'browser-sync']);
gulp.task('build', ['scss', 'js', 'pug']);


gulp.task('js:temp', function () {
	var libUtility = ghandyman.gulpJs({
		fileName: 'libUtility',
		srcPath: files.jsFilesLibUtility,
		destPath: 'temp'
	});

	var libBabel = ghandyman.gulpJs({
		fileName: 'libBabel',
		srcPath: files.jsFilesLibBabel,
		destPath: 'temp',
		babel: true
	});

	var libNormal = ghandyman.gulpJs({
		fileName: 'libNormal',
		srcPath: files.jsFilesLibNormal,
		destPath: 'temp'
	});

	return merge(libUtility, libBabel, libNormal);
});
gulp.task('js:temp:concat', ['js:temp'], function () {
	return ghandyman.gulpJs({
		fileName: 'appLibs',
		srcPath: [
			'temp/libUtility.js',
			'temp/libBabel.js',
			'temp/libNormal.js'
		],
		minify: config.minify,
		destPath: config.pathToDist + '/js'
	});
});
gulp.task('js:libs', ['js:temp:concat'], function () {
	return del([
		'temp/**/*'
	]);
});

gulp.task('js', function(){
	return ghandyman.gulpJs({
		fileName: 'app',
		srcPath: files.jsFilesOwn,
		destPath: config.pathToDist + '/js',
		babel: true
	});
});

gulp.task('pug', function(){
	return ghandyman.gulpPug({
		srcPath: config.pathToSrc + 'html/pages',
		destPath: config.pathToDist
	})
});

gulp.task('scss', function(){
	return ghandyman.gulpSass({
		srcPath: config.pathToSrc + 'scss/app.scss',
		destPath: config.pathToDist + '/css',
		fileName: 'app'
	});
});

gulp.task('watch', function(){
	gulp.watch(config.pathToSrc + 'scss/**/*.scss', ['scss']);
	gulp.watch(config.pathToSrc + 'js/**/*.js', ['js']);
	gulp.watch(config.pathToSrc + 'html/**/*.pug', ['pug']);
});

gulp.task('browser-sync', function (proxy) {
	var browserSyncConfig;

	if (proxy === true) {
		if (config.localhost) {
			browserSyncConfig = {
				proxy: config.localhost
			}
		} else {
			throw new Error('Open \'gulp.config.js\' and set your local proxy in \'config.localhost\'');
		}
	} else {
		browserSyncConfig = {
			server: {
				baseDir: config.pathToDest
			}
		}
	}

	browserSync.init(browserSyncConfig);
});
