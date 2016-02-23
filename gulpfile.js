var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var htmlmin = require('gulp-htmlmin');
var inject = require('gulp-inject');

//gulp.task('compress', function() {
//    return gulp.src('./sources/assets/js/*.js')
//        .pipe(uglify())
//        .pipe(gulp.dest('./.tmp/assets/js'));
//});

gulp.task('compress', function() {
    return gulp.src('./sources/assets/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist/assets/js'));
});

gulp.task('compress-html', function() {
    return gulp.src('./sources/*.html')
        .pipe(htmlmin({collapseWhitespace: true, removeComments: true}))
        .pipe(gulp.dest('./dist'))
});

gulp.task('compress-css', function() {
    return gulp.src('./sources/assets/css/*.css')
        .pipe(htmlmin({collapseWhitespace: true, removeComments: true}))
        .pipe(gulp.dest('./dist/assets/css'))
});

gulp.task('copy', function(){
    gulp
        .src([
            './sources/assets/content/**/*'
        ])
        .pipe(gulp.dest('./dist/assets/content'));
    gulp.src([
            './sources/assets/font/**/*'
        ])
        .pipe(gulp.dest('./dist/assets/font'));
    gulp.src([
            './sources/assets/images/**/*'
        ])
        .pipe(gulp.dest('./dist/assets/images'));
});

gulp.task('scripts', ['compress'], function() {
    //return gulp
    //    .src([
    //        //'./.tmp/assets/js/jquery.js',
    //        './.tmp/assets/js/*.js'
    //    ])
    //    .pipe(concat('dist.min.js'))
    //    .pipe(gulp.dest('./dist/assets/js'));
});


gulp.task('zbla', ['scripts', 'compress-html', 'compress-css', 'copy'], function(){

});