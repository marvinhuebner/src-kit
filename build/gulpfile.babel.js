const gulp = require('gulp-param')(require('gulp'), process.argv);

import del from 'del';
import watch from 'gulp-watch';
import ghandyman from 'gulp-handyman';
import browserSync from 'browser-sync';
import merge from 'merge-stream';

import * as importConfig from './gulp.config.js';

const config = importConfig.config;
const files = importConfig.files;

ghandyman.checkEqualVersion({
	devDependencies: true,
	module: 'gulp-handyman'
});

gulp.task('default', ['scss', 'js', 'pug', 'watch', 'browser-sync']);
gulp.task('build', ['scss', 'js', 'pug']);


gulp.task('js:temp', () => {
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
gulp.task('js:temp:concat', ['js:temp'], () => {
	return ghandyman.gulpJs({
		fileName: 'appLibs',
		srcPath: [
			'temp/libUtility.js',
			'temp/libBabel.js',
			'temp/libNormal.js'
		],
		minify: config.minify,
		destPath: config.pathToDist + 'js'
	});
});
gulp.task('js:libs', ['js:temp:concat'], () => {
	return del([
		'temp/**/*'
	]);
});

gulp.task('js', () => {
	return ghandyman.gulpJs({
		fileName: 'app',
		srcPath: files.jsFilesOwn,
		destPath: config.pathToDist + 'js',
		babel: true,
		minify: config.minify
	});
});

gulp.task('pug',() => {
	return ghandyman.gulpPug({
		srcPath: config.pathToSrc + 'html/pages',
		destPath: config.pathToDist
	})
});

gulp.task('scss', () => {
	return ghandyman.gulpSass({
		srcPath: config.pathToSrc + 'scss/app.scss',
		destPath: config.pathToDist + 'css',
		fileName: 'app'
	});
});

gulp.task('watch', () => {
	gulp.watch(config.pathToSrc + 'scss/**/*.scss', ['scss']);
	gulp.watch(config.pathToSrc + 'js/**/*.js', ['js']);
	gulp.watch(config.pathToSrc + 'html/**/*.pug', ['pug']);

	gulp.watch([
		config.pathToDist + '**/*.css',
		config.pathToDist + '**/*.js',
		config.pathToDist + '**/*.html'
	]).on('change', browserSync.reload)
});

gulp.task('browser-sync', (proxy) => {
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
			server: '../public'
		}
	}

	browserSync.init(browserSyncConfig);
});
