var gulp = require('gulp');
var fs = require('fs');
var gutil = require('gulp-util');
var handyman = require('gulp-handyman');

require('require-dir')('./node_modules/gulp-handyman/gulp');

handyman.equalVersionModule({
    devDependencies: true,
    module: 'gulp-util'
});
