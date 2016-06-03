var gulp = require('gulp');
var pug = require('gulp-pug');
var plumber = require('gulp-plumber');

gulp.task('pug', pugTask);


function pugTask() {
    var compilePug = function (basePath, destPath) {
        gulp.src(sourcePath + 'html/' + basePath + '/*.pug')
            .pipe(plumber())
            .pipe(pug({
                pretty: true
            }))
            .pipe(gulp.dest(destPath));
    };

    compilePug('pages', 'public');
}
