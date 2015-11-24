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

var sourcePath = 'src/';
var destinationPath = 'dist/';

var jsFilesApp = [

    // Basic Libarys
    sourcePath + 'js/lib/jquery.min.js',
    sourcePath + 'js/lib/fastclick.js',
    //sourcePath + 'js/lib/picturefill.js',
    //sourcePath + 'js/lib/singlePageNav.js',
    //sourcePath + 'js/lib/ssm.js',
    //sourcePath + 'js/lib/slick.js',

    // Foundation
    //sourcePath + 'js/lib/foundation/foundation.core.js',
    //sourcePath + 'js/lib/foundation/foundation.abide.js',
    //sourcePath + 'js/lib/foundation/foundation.accordionMenu.js',
    //sourcePath + 'js/lib/foundation/foundation.drilldown.js',
    //sourcePath + 'js/lib/foundation/foundation.dropdown.js',
    //sourcePath + 'js/lib/foundation/foundation.dropdownMenu.js',
    //sourcePath + 'js/lib/foundation/foundation.equalizer.js',
    //sourcePath + 'js/lib/foundation/foundation.interchange.js',
    //sourcePath + 'js/lib/foundation/foundation.joyride.js',
    //sourcePath + 'js/lib/foundation/foundation.magellan.js',
    //sourcePath + 'js/lib/foundation/foundation.offcanvas.js',
    //sourcePath + 'js/lib/foundation/foundation.orbit.js',
    //sourcePath + 'js/lib/foundation/foundation.responsiveMenu.js',
    //sourcePath + 'js/lib/foundation/foundation.responsiveToggle.js',
    //sourcePath + 'js/lib/foundation/foundation.reveal.js',
    //sourcePath + 'js/lib/foundation/foundation.slider.js',
    //sourcePath + 'js/lib/foundation/foundation.sticky.js',
    //sourcePath + 'js/lib/foundation/foundation.tabs.js',
    //sourcePath + 'js/lib/foundation/foundation.toggler.js',
    //sourcePath + 'js/lib/foundation/foundation.util.animationFrame.js',
    //sourcePath + 'js/lib/foundation/foundation.util.box.js',
    //sourcePath + 'js/lib/foundation/foundation.util.keyboard.js',
    //sourcePath + 'js/lib/foundation/foundation.util.mediaQuery.js',
    //sourcePath + 'js/lib/foundation/foundation.util.motion.js',
    //sourcePath + 'js/lib/foundation/foundation.util.onImagesLoaded.js',
    //sourcePath + 'js/lib/foundation/foundation.util.swipe.js',
    //sourcePath + 'js/lib/foundation/foundation.util.triggers.js',
    //sourcePath + 'js/lib/foundation/foundation.util.time.js',
    //sourcePath + 'js/lib/foundation/motion-ui.js',

    // Own stuff
    sourcePath + 'js/custom/*.js'
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
    gulp.watch(sourcePath + 'scss/**/*.scss', ['styles']);
    gulp.watch(jsFilesApp, ['scripts']);
}

function stylesTask() {
    var compileStyles = function (baseName) {
        gulp.src([sourcePath + 'scss/' + baseName + '.scss'])
            .pipe(plumber())
            .pipe(sourcemaps.init())
            .pipe(sass({outputStyle: 'compressed'}))
            .pipe(rename({suffix: '.min'}))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(destinationPath + 'css'))
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
            .pipe(gulp.dest(destinationPath + 'js'));
    };

    compileScripts(jsFilesApp, 'app');
}

function iconsTask() {
    gulp.src([sourcePath + 'assets/svg/use/*.svg'])
        .pipe(iconfont({
            fontName: 'icon',
            appendCodepoints: true
        }))
        .on('codepoints', function (codepoints, options) {
            gulp.src(sourcePath + 'scss/template/icons.scss')
                .pipe(consolidate('lodash', {
                    glyphs: codepoints,
                    fontName: 'icon',
                    fontPath: destinationPath + 'fonts/generated/',
                    className: 'icon'
                }))
                .pipe(gulp.dest(sourcePath + 'scss/generated'));
        })
        .pipe(gulp.dest(destinationPath + 'fonts/generated'));
}


function faviconTask() {
    gulp.src([sourcePath + 'assets/favicon/favicon.png'])
        .pipe(favicons({
            files: {
                src: sourcePath + 'assets/favicon/favicon.png',
                dest: destinationPath + 'assets/favicon',
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
        .pipe(gulp.dest(destinationPath + 'assets/favicon'));
}