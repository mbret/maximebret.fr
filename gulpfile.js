var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var htmlmin = require('gulp-htmlmin');

gulp.task('compress', function() {
    return gulp.src('./sources/assets/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./.tmp/assets/js'));
});

gulp.task('compress-html', function() {
    return gulp.src('./sources/*.html')
        .pipe(htmlmin({collapseWhitespace: true, removeComments: true}))
        .pipe(gulp.dest('./dist'))
});

gulp.task('scripts', ['compress'], function() {
    return gulp.src('./.tmp/assets/js/*.js')
        .pipe(concat('dist.min.js'))
        .pipe(gulp.dest('./dist/assets/js'));
});

gulp.task('zbla', ['scripts', 'compress-html'], function(){

});