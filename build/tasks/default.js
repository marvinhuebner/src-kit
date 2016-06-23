var gulp = require('gulp');

var defaultTasks = [
	'styles',
	'scripts',
	'jade',
	'watch'
];

gulp.task('default', defaultTasks);


gulp.task('hallo', function(){
	consone.log('hallo');
});
