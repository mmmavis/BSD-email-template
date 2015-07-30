var gulp = require('gulp');
var path = require('path');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var fileinclude = require('gulp-file-include');

gutil.log(gutil.colors.blue(" __dirname:", __dirname));

gulp.task('fileinclude', ['less'], function() {
  gulp.src('./src/**/index-no-premailer.html')
      .pipe(fileinclude({
        prefix: '@@',
        basepath: '@file'
      }))
      .pipe(gulp.dest('./compiled'));

  gulp.src('./src/**/index-premailered.html')
      .pipe(gulp.dest('./compiled'));
});

gulp.task('less', function () {
  gutil.log(gutil.colors.blue("compiling less..."));
  return gulp.src('./src/**/style.less')
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(gulp.dest('./src'));
});

gulp.task('watch', function() {
  gutil.log(gutil.colors.blue("watching..."));
  gulp.watch(['./src/**/*.html', './src/**/style.less'], ['fileinclude']);
});

gulp.task("start", [ "watch" ]);
