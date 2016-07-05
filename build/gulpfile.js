var gulp = require('gulp');
var fs = require('fs');
var ghandyman = require('gulp-handyman');
var config = require('./gulp.config.json');

ghandyman.checkEqualVersion({
	devDependencies: true,
	module: 'gulp-util'
});

gulp.task('sass', function(){
	ghandyman.gulpSass({
		srcPath: 'ztest/test.scss',
		destPath: 'ztest/dist'
	});
});

gulp.task('js', function(){
	ghandyman.gulpJs({
		srcPath: 'ztest/test.js',
		fileName: 'app',
		destPath: 'ztest/dist'
	})
});

gulp.task('pug', function(){
	ghandyman.gulpPug({
		srcPath: 'ztest',
		destPath: 'ztest/dist'
	})
});

gulp.task('imgmin', function(){
	ghandyman.gulpImgMin({
		srcPath: 'ztest/img',
		destPath: 'ztest/dist/img'
	});
});

gulp.task('icons', function(){
	ghandyman.gulpIconFont({
		srcPath: 'ztest/icon',
		cssFontPath: 'test',
		destPathIconFont: 'ztest/iconfont',
		destPathIconFontSass: 'ztest/dist'
	})
});

gulp.task('favicon', function(){
	ghandyman.gulpFavicon({
		srcPath: 'ztest/favicon.png',
		destPath: 'ztest/dist/favicon'
	});
});


gulp.task('svg', function(){
	ghandyman.gulpSvgSprite({
		srcPath: 'ztest/icon',
		destPath: 'ztest/dist/sprite',
		destPathSymbolSprite: 'ztest/dist/sprite/test',
		destPathScss: 'ztest/dist/sprite/test.scss'
	});
});
