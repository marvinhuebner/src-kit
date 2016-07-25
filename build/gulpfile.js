const gulp = require('gulp-param')(require('gulp'), process.argv);

const del = require('del');
const watch = require('gulp-watch');
const ghandyman = require('gulp-handyman');
const browserSync = require('browser-sync');
const merge = require('merge-stream');

const importPaths = require('./gulp.paths.js');
const importConfig = require('./gulp.config.js');

const config = importConfig.config;
const files = importConfig.files;
const path = importPaths.path;

ghandyman.checkEqualVersion({
	devDependencies: true,
	module: 'gulp-handyman'
});

gulp.task('default', ['scss', 'js', 'pug', 'watch', 'browser-sync']);
gulp.task('build', ['scss', 'js', 'pug']);

gulp.task('js:temp', function() {
	var libUtility = ghandyman.gulpJs({
		fileName: 'libUtility',
		pathToSrc: files.jsFilesLibUtility,
		pathToDest: 'temp'
	});

	var libBabel = ghandyman.gulpJs({
		fileName: 'libBabel',
		pathToSrc: files.jsFilesLibBabel,
		pathToDest: 'temp',
		babel: true
	});

	var libNormal = ghandyman.gulpJs({
		fileName: 'libNormal',
		pathToSrc: files.jsFilesLibNormal,
		pathToDest: 'temp'
	});

	return merge(libUtility, libBabel, libNormal);
});
gulp.task('js:temp:concat', ['js:temp'], function() {
	return ghandyman.gulpJs({
		fileName: 'appLibs',
		pathToSrc: [
			'temp/libUtility.js',
			'temp/libBabel.js',
			'temp/libNormal.js'
		],
		minify: config.minify,
		pathToDest: path.toDist + 'js'
	});
});
gulp.task('js:libs', ['js:temp:concat'], function() {
	return del([
		'temp/**/*'
	]);
});

gulp.task('js', function() {
	return ghandyman.gulpJs({
		fileName: 'app',
		pathToSrc: files.jsFilesOwn,
		pathToDest: path.toDist + 'js',
		babel: true,
		minify: config.minify
	});
});

gulp.task('pug',function() {
	return ghandyman.gulpPug({
		pathToSrc: path.toSrc + 'html/pages',
		pathToDest: path.toDist
	})
});

gulp.task('scss', function() {
	return ghandyman.gulpSass({
		pathToSrc: path.toSrc + 'scss/app.scss',
		pathToDest: path.toDist + 'css',
		fileName: 'app'
	});
});

gulp.task('watch', function() {
	gulp.watch(path.toSrc + 'scss/**/*.scss', ['scss']);
	gulp.watch(path.toSrc + 'js/**/*.js', ['js']);
	gulp.watch(path.toSrc + 'html/**/*.pug', ['pug']);

	gulp.watch([
		path.toDist + '**/*.css',
		path.toDist + '**/*.js',
		path.toDist + '**/*.html'
	]).on('change', browserSync.reload)
});

gulp.task('browser-sync', function() {
	var browserSyncConfig;

	if (config.localhost) {
		browserSyncConfig = {
			proxy: config.localhost
		}
	}  else {
		browserSyncConfig = {
			server: '../public'
		}
	}

	browserSync.init(browserSyncConfig);
});
