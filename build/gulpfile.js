var gulp = require('gulp-param')(require('gulp'), process.argv);
var fs = require('fs');
var watch = require('gulp-watch');
var ghandyman = require('gulp-handyman');
var browserSync = require('browser-sync');
var merge = require('merge-stream');

var config = [
	srcPath = '../.modman/BERGWERK_CottonTemplate/src/',
	destPath = '../.modman/BERGWERK_CottonTemplate/skin/frontend/foundation/',

	jsFilesLibUtility = [
		'../js/prototype/prototype.js',
		'../js/lib/ccard.js',
		'../js/prototype/validation.js',
		'../js/varien/js.js',
		'../js/varien/form.js',
		'../js/varien/menu.js',
		'../js/mage/translate.js',
		'../js/mage/cookies.js',
		'../js/mage/captcha.js',
		'../js/varien/product.js',
		'../js/varien/accordion.js',
		'../js/mage/opcheckout.js',
		'../js/mage/centinel.js',
		'../js/mage/directpost.js',

		'bower_components/jquery/dist/jquery.min.js',
		srcPath + 'lib/js/jquery.noConflict.js'
	],

	jsFilesLibBabel = [
		'bower_components/foundation-sites/js/foundation.core.js',
		//'bower_components/foundation-sites/js/foundation.util.box.js',
		//'bower_components/foundation-sites/js/foundation.util.keyboard.js',
		'bower_components/foundation-sites/js/foundation.util.mediaQuery.js',
		//'bower_components/foundation-sites/js/foundation.util.motion.js',
		//'bower_components/foundation-sites/js/foundation.util.nest.js',
		//'bower_components/foundation-sites/js/foundation.util.timerAndImageLoader.js',
		//'bower_components/foundation-sites/js/foundation.util.touch.js',
		//'bower_components/foundation-sites/js/foundation.util.triggers.js',
		//'bower_components/foundation-sites/js/foundation.abide.js',
		//'bower_components/foundation-sites/js/foundation.accordion.js',
		//'bower_components/foundation-sites/js/foundation.accordionMenu.js',
		//'bower_components/foundation-sites/js/foundation.drilldown.js',
		//'bower_components/foundation-sites/js/foundation.dropdown.js',
		//'bower_components/foundation-sites/js/foundation.dropdownMenu.js',
		//'bower_components/foundation-sites/js/foundation.equalizer.js',
		//'bower_components/foundation-sites/js/foundation.interchange.js',
		//'bower_components/foundation-sites/js/foundation.magellan.js',
		//'bower_components/foundation-sites/js/foundation.offcanvas.js',
		//'bower_components/foundation-sites/js/foundation.orbit.js',
		//'bower_components/foundation-sites/js/foundation.responsiveMenu.js',
		//'bower_components/foundation-sites/js/foundation.responsiveToggle.js',
		//'bower_components/foundation-sites/js/foundation.reveal.js',
		//'bower_components/foundation-sites/js/foundation.slider.js',
		//'bower_components/foundation-sites/js/foundation.sticky.js',
		'bower_components/foundation-sites/js/foundation.tabs.js',
		//'bower_components/foundation-sites/js/foundation.toggler.js',
		//'bower_components/foundation-sites/js/foundation.tooltip.js'
	],

	jsFilesLibNormal = [
		'bower_components/fastclick/lib/fastclick.js',
		'bower_components/slick-carousel/slick/slick.min.js',
		'bower_components/modernizr/modernizr.js',
		'bower_components/shufflejs/dist/jquery.shuffle.js'
	],

	jsFilesLibMerge = [
		'temp/lib-utility.js',
		'temp/lib-babel.js',
		'temp/lib-normal.js'
	]
];

/**
 * -------------------------------------------------------------------
 * Be careful. Only touch this if you know what you do
 */

gulp.task('scripts:temp', function () {
	var libUtility = ghandyman.gulpJs({
		fileName: 'lib-utility',
		srcPath: jsFilesLibUtility,
		destPath: 'temp'
	});

	var libBabel = ghandyman.gulpJs({
		fileName: 'lib-babel',
		srcPath: jsFilesLibBabel,
		destPath: 'temp',
		babel: true
	});

	var libNormal = ghandyman.gulpJs({
		fileName: 'lib-normal',
		srcPath: jsFilesLibNormal,
		destPath: 'temp'
	});

	return merge(libUtility, libBabel, libNormal);
});

gulp.task('scripts:lib:concat', ['scripts:temp'], function(){
	return ghandyman.gulpJs({
		fileName: 'app-lib',
		srcPath: jsFilesLibMerge,
		destPath: destPath + 'default/js'
	})
});

gulp.task('scripts:lib', ['scripts:lib:concat'], function(){
	return gulp.src([destPath + 'default/js/app-lib.js', destPath + 'default/js/app-lib.js.map'])
		.pipe(gulp.dest(destPath + 'b2b/js'))
		.pipe(gulp.dest(destPath + 'b2c/js'))
});

gulp.task('scripts:compiler', function () {
	return ghandyman.gulpJs({
		fileName: 'app',
		srcPath: srcPath + 'js/**/*.js',
		destPath: destPath + 'default/js',
		babel: true
	})
});

gulp.task('scripts', ['scripts:compiler'], function () {
	return gulp.src([destPath + 'default/js/app.js', destPath + 'default/js/app.js.map'])
		.pipe(gulp.dest(destPath + 'b2b/js'))
		.pipe(gulp.dest(destPath + 'b2c/js'))
});

gulp.task('sass:b2b', function () {
	return ghandyman.gulpSass({
		srcPath: srcPath + 'scss/b2b-cotton/b2b.scss',
		destPath: destPath + 'b2b/css',
		fileName: 'app'
	});
});

gulp.task('sass:b2c', function () {
	return ghandyman.gulpSass({
		srcPath: srcPath + 'scss/b2c-cotton/b2c.scss',
		destPath: destPath + 'b2c/css',
		fileName: 'app'
	});
});

gulp.task('sass', ['sass:b2b', 'sass:b2c']);

gulp.task('pug:compiler', function () {
	return ghandyman.gulpPug({
		srcPath: srcPath + 'html/pages',
		destPath: destPath + 'default'
	})
});

gulp.task('pug', ['pug:compiler'], function () {
	return gulp.src(destPath + 'default/*.html')
		.pipe(gulp.dest(destPath + 'b2b'))
		.pipe(gulp.dest(destPath + 'b2c'))
});

gulp.task('pug:watch', function () {
	gulp.watch(srcPath + 'html/**/*', ['pug'])
});

gulp.task('watch', function () {
	gulp.watch(srcPath + 'scss/**/*.scss', ['sass']);
	gulp.watch(srcPath + 'js/**/*.js', ['scripts']);
});

gulp.task('watch:frontend', function () {
	gulp.watch(srcPath + 'scss/**/*.scss', ['sass']);
	gulp.watch(srcPath + 'js/**/*.js', ['scripts']);

	gulp.watch(destPath + '**/*').on('change', browserSync.reload)
});

gulp.task('default', ['sass', 'scripts', 'watch']);

gulp.task('frontend', ['sass', 'scripts', 'watch:frontend', 'pug:watch', 'browser-sync']);

gulp.task('production', ['sass', 'scripts', 'scripts:lib']);

gulp.task('iconFont:compiler', function(){
	return ghandyman.gulpIconFont({
		srcPath: srcPath + 'assets/svg',
		cssFontPath: '../fonts/iconfont',
		destPathIconFont: destPath + 'default/fonts/iconfont',
		destPathIconFontSass: srcPath + 'scss/_generated'
	})
});

gulp.task('iconFont', ['iconFont:compiler'], function(){
	return gulp.src(destPath + 'default/fonts/iconfont/*')
		.pipe(gulp.dest(destPath + 'b2b/fonts/iconfont'))
		.pipe(gulp.dest(destPath + 'b2c/fonts/iconfont'))
});

gulp.task('browser-sync', function(shop, b2b, b2c) {
	var browserSyncConfig;

	if (shop === true) {
		browserSyncConfig = {
			proxy: "wot-cotton.local"
		}
	} else if (b2b === true) {
		browserSyncConfig = {
			server: {
				baseDir: destPath + 'b2b/'
			}
		}
	} else if (b2c === true) {
		browserSyncConfig = {
			server: {
				baseDir: destPath + 'b2c/'
			}
		}
	} else {
		browserSyncConfig = {
			proxy: "wot-cotton.local"
		}
	}

	browserSync.init(browserSyncConfig);
});
