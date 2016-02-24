var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var htmlmin = require('gulp-htmlmin');
var inject = require('gulp-inject');
var clean = require('gulp-clean');
var merge = require('merge-stream');

gulp.task('clean', function () {
    return gulp.src(['./tmp', './dist'], {read: false})
        .pipe(clean());
});

gulp.task('compress-js', ['clean'], function() {
    return gulp.src('./sources/assets/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist/assets/js'));
});

gulp.task('compress-html', ['inject-prod'], function() {
    return gulp.src('./dist/*.html')
        .pipe(htmlmin({collapseWhitespace: true, removeComments: true}))
        .pipe(gulp.dest('./dist'))
});

gulp.task('compress-css', ['clean'], function() {
    return gulp.src('./sources/assets/css/*.css')
        .pipe(htmlmin({collapseWhitespace: true, removeComments: true}))
        .pipe(gulp.dest('./dist/assets/css'))
});

gulp.task('copy', ['clean'], function(){
    return merge(
        gulp
            .src([
                './sources/*.html'
            ])
            .pipe(gulp.dest('./dist'))
        ,
        gulp
            .src([
                './sources/assets/content/**/*'
            ])
            .pipe(gulp.dest('./dist/assets/content'))
        ,
        gulp.src([
                './sources/assets/font/**/*'
            ])
            .pipe(gulp.dest('./dist/assets/font'))
        ,
        gulp.src([
                './sources/assets/images/**/*'
            ])
            .pipe(gulp.dest('./dist/assets/images'))
    );
});

gulp.task('scripts', ['compress-js'], function() {
    return gulp
        .src([
            './dist/assets/js/*.js'
        ])
        .pipe(concat('dist.min.js'))
        .pipe(gulp.dest('./dist/assets/js'));
});

gulp.task('inject-prod', ['compress-css', 'scripts', 'copy'], function () {
    var target = gulp.src('./dist/index.html');
    // It's not necessary to read the files (will speed up things), we're only after their paths:
    var sources = gulp.src([
        // js
        './dist/assets/js/dist.min.js',

        // css
        './dist/assets/font/fa/css/font-awesome.min.css',
        './dist/assets/font/tello/css/fontello.css',
        './dist/assets/css/magnific-popup.css',
        './dist/assets/css/animation.css',
        './dist/assets/css/style.css',
        './dist/assets/css/custom.css'
    ], {read: false});

    return target.pipe(inject(sources, {relative: true}))
        .pipe(gulp.dest('./dist'));
});

gulp.task('inject-dev', function () {
    var target = gulp.src('./sources/index.html');
    // It's not necessary to read the files (will speed up things), we're only after their paths:
    var sources = gulp.src([
        // js
        './sources/assets/js/pace.min.js',
        './sources/assets/js/jquery.mixitup.min.js',
        './sources/assets/js/jquery.magnific-popup.js',
        './sources/assets/js/*.js',
        './sources/assets/js/*.js',
        './sources/assets/js/*.js',

        // css
        './sources/assets/font/fa/css/font-awesome.min.css',
        './sources/assets/font/tello/css/fontello.css',
        './sources/assets/css/magnific-popup.css',
        './sources/assets/css/animation.css',
        './sources/assets/css/style.css',
        './sources/assets/css/custom.css'
    ], {read: false});

    return target.pipe(inject(sources, {relative: true}))
        .pipe(gulp.dest('./sources'));
});

gulp.task('prod', ['clean', 'copy', 'scripts', 'compress-css', 'inject-prod', 'compress-html'], function(){

});

gulp.task('dev', ['inject-dev'], function(){

});