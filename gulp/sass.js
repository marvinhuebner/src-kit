var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var rename = require('gulp-rename');

gulp.task('styles', stylesTask);

/**
 * change the output style from the compiled css and js
 * normal output: normal
 * minified output: minified
 */

var output = 'normal';

function stylesTask() {
    var compileStyles = function (baseName) {
        switch (output) {
            case 'normal':
                gulp.src([sourcePath + 'scss/' + baseName + '.scss'])
                    .pipe(plumber())
                    .pipe(sourcemaps.init())
                    .pipe(sass({outputStyle: 'expanded'}))
                    .pipe(sourcemaps.write('./'))
                    .pipe(gulp.dest(destinationPath + 'css'));
                break;
            case 'minified':
                gulp.src([sourcePath + 'scss/' + baseName + '.scss'])
                    .pipe(plumber())
                    .pipe(sourcemaps.init())
                    .pipe(sass({outputStyle: 'compressed'}))
                    .pipe(rename({suffix: '.min'}))
                    .pipe(sourcemaps.write('./'))
                    .pipe(gulp.dest(destinationPath + 'css'));
                break;
        }
    };

    compileStyles('app');
    compileStyles('rte');
    compileStyles('print');
}
