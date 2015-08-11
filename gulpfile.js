var gulp = require('gulp');
var path = require('path');
var fs = require('fs');
var less = require('gulp-less');
var gutil = require('gulp-util');
var fileinclude = require('gulp-file-include');

gutil.log(gutil.colors.blue(" __dirname:", __dirname));

gulp.task('compile-and-copy-files', ['less'], function() {
  gulp.src('./src/**/index.html')
      .pipe(fileinclude({
        prefix: '@@',
        basepath: '@file'
      }))
      .pipe(gulp.dest('./compiled'));

  gulp.src('./src/**/img/**')
      .pipe(gulp.dest('./compiled'));
});

gulp.task('less', function () {
  gutil.log(gutil.colors.blue("compiling less..."));
  return gulp.src('./src/**/style.less')
    .pipe(less())
    .pipe(gulp.dest('./src'));
});

gulp.task('watch', ['compile-and-copy-files'], function() {
  gutil.log(gutil.colors.blue("watching..."));
  gulp.watch(['./src/**/*.html', './src/**/style.less', './src/**/img/**'], ['compile-and-copy-files']);
});
