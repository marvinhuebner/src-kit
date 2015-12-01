// Gulp Modules
var gulp = require('gulp'),
    iconfont = require('gulp-iconfont'),
    consolidate = require('gulp-consolidate'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    path = require('path'),
    watch = require('gulp-watch'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    favicons = require('gulp-favicons');

var config = {
    sourePath = 'src/',
    destinationPath = 'dist/'
}

var jsFilesApp = [

    // Basic Libarys
    config.sourePath + 'js/lib/jquery.min.js',
    config.sourePath + 'js/lib/fastclick.js',
    //config.sourePath + 'js/lib/picturefill.js',
    //config.sourePath + 'js/lib/singlePageNav.js',
    //config.sourePath + 'js/lib/ssm.js',
    //config.sourePath + 'js/lib/slick.js',

    // Foundation
    //config.sourePath + 'js/lib/foundation/foundation.core.js',
    //config.sourePath + 'js/lib/foundation/foundation.abide.js',
    //config.sourePath + 'js/lib/foundation/foundation.accordionMenu.js',
    //config.sourePath + 'js/lib/foundation/foundation.drilldown.js',
    //config.sourePath + 'js/lib/foundation/foundation.dropdown.js',
    //config.sourePath + 'js/lib/foundation/foundation.dropdownMenu.js',
    //config.sourePath + 'js/lib/foundation/foundation.equalizer.js',
    //config.sourePath + 'js/lib/foundation/foundation.interchange.js',
    //config.sourePath + 'js/lib/foundation/foundation.joyride.js',
    //config.sourePath + 'js/lib/foundation/foundation.magellan.js',
    //config.sourePath + 'js/lib/foundation/foundation.offcanvas.js',
    //config.sourePath + 'js/lib/foundation/foundation.orbit.js',
    //config.sourePath + 'js/lib/foundation/foundation.responsiveMenu.js',
    //config.sourePath + 'js/lib/foundation/foundation.responsiveToggle.js',
    //config.sourePath + 'js/lib/foundation/foundation.reveal.js',
    //config.sourePath + 'js/lib/foundation/foundation.slider.js',
    //config.sourePath + 'js/lib/foundation/foundation.sticky.js',
    //config.sourePath + 'js/lib/foundation/foundation.tabs.js',
    //config.sourePath + 'js/lib/foundation/foundation.toggler.js',
    //config.sourePath + 'js/lib/foundation/foundation.util.animationFrame.js',
    //config.sourePath + 'js/lib/foundation/foundation.util.box.js',
    //config.sourePath + 'js/lib/foundation/foundation.util.keyboard.js',
    //config.sourePath + 'js/lib/foundation/foundation.util.mediaQuery.js',
    //config.sourePath + 'js/lib/foundation/foundation.util.motion.js',
    //config.sourePath + 'js/lib/foundation/foundation.util.onImagesLoaded.js',
    //config.sourePath + 'js/lib/foundation/foundation.util.swipe.js',
    //config.sourePath + 'js/lib/foundation/foundation.util.triggers.js',
    //config.sourePath + 'js/lib/foundation/foundation.util.time.js',
    //config.sourePath + 'js/lib/foundation/motion-ui.js',

    // Own stuff
    config.sourePath + 'js/custom/*.js'
];

var defaultTasks = [
    'styles',
    'scripts',
    'watch'
];

gulp.task('styles', stylesTask);
gulp.task('scripts', scriptsTask);
gulp.task('icons', iconsTask);
gulp.task('watch', watchTask);
gulp.task('favicon', faviconTask);

gulp.task('default', defaultTasks);

function watchTask() {
    gulp.watch(config.sourePath + 'scss/**/*.scss', ['styles']);
    gulp.watch(jsFilesApp, ['scripts']);
}

function stylesTask() {
    var compileStyles = function (baseName) {
        gulp.src([config.sourePath + 'scss/' + baseName + '.scss'])
            .pipe(plumber())
            .pipe(sourcemaps.init())
            .pipe(sass({outputStyle: 'compressed'}))
            .pipe(rename({suffix: '.min'}))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(config.destinationPath + 'css'))
    };

    compileStyles('app');
}

function scriptsTask() {
    var compileScripts = function (files, targetFile) {
        gulp.src(files)
            .pipe(plumber())
            .pipe(sourcemaps.init())
            .pipe(concat(targetFile + '.js'))
            .pipe(uglify())
            .pipe(rename({suffix: '.min'}))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(config.destinationPath + 'js'));
    };

    compileScripts(jsFilesApp, 'app');
}

function iconsTask() {
    gulp.src([config.sourePath + 'assets/svg/use/*.svg'])
        .pipe(iconfont({
            fontName: 'icon',
            appendCodepoints: true
        }))
        .on('codepoints', function (codepoints, options) {
            gulp.src(config.sourePath + 'scss/template/_icons.scss')
                .pipe(consolidate('lodash', {
                    glyphs: codepoints,
                    fontName: 'icon',
                    fontPath: config.destinationPath + 'fonts/generated/',
                    className: 'icon'
                }))
                .pipe(gulp.dest(config.sourePath + 'scss/generated'));
        })
        .pipe(gulp.dest(config.destinationPath + 'fonts/generated'));
}


function faviconTask() {
    gulp.src([config.sourePath + 'assets/favicon/favicon.png'])
        .pipe(favicons({
            files: {
                src: config.sourePath + 'assets/favicon/favicon.png',
                dest: config.destinationPath + 'assets/favicon',
                iconsPath: '/Icons/',
                html: '/dev/null'
            },
            icons: {
                android: true,
                appleIcon: true,
                appleStartup: false,
                coast: true,
                favicons: true,
                firefox: true,
                opengraph: true,
                windows: false,
                yandex: false
            },
            settings: {
                logging: false,
                vinylMode: true,
                background: false
            }
        }))
        .pipe(gulp.dest(config.destinationPath + 'assets/favicon'));
}