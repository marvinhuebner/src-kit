var gulp = require('gulp');
var jade = require('gulp-jade');

gulp.task('jade', jadeTask);

function jadeTask() {
    gulp.src(sourcePath + 'templates/pages/*.jade')
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest(jadeDestinationPath));
}