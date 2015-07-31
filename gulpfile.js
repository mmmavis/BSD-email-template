var gulp = require('gulp');
var path = require('path');
var fs = require('fs');
var less = require('gulp-less');
var gutil = require('gulp-util');
var fileinclude = require('gulp-file-include');

var premailer = require('gulp-premailer');

gutil.log(gutil.colors.blue(" __dirname:", __dirname));

gulp.task('compile-and-copy-files', ['less'], function() {
  gulp.src('./src/**/index-no-premailer.html')
      .pipe(fileinclude({
        prefix: '@@',
        basepath: '@file'
      }))
      .pipe(gulp.dest('./compiled'));

  gulp.src('./src/**/index-premailered.html')
      .pipe(gulp.dest('./compiled'));

  gulp.src('./src/**/img/**')
      .pipe(gulp.dest('./compiled'));
});

gulp.task('premailer', function() {
  fs.exists('./compiled', function(exists) {
    if (exists) {
      gulp.src('./compiled/**/index-no-premailer.html')
        .pipe(premailer())
        .pipe(gulp.dest('./premailer-formatted'));
    } else {
      gutil.log(gutil.colors.red("[Error] Make sure your source files are compiled first."));
    }
  })
});

gulp.task('less', function () {
  gutil.log(gutil.colors.blue("compiling less..."));
  return gulp.src('./src/**/style.less')
    .pipe(less())
    .pipe(gulp.dest('./src'));
});

gulp.task('watch', function() {
  gutil.log(gutil.colors.blue("watching..."));
  gulp.watch(['./src/**/*.html', './src/**/style.less'], ['compile-and-copy-files']);
});

gulp.task('build', ['premailer'], function() {
  gutil.log(gutil.colors.blue("running premailer..."));
});
