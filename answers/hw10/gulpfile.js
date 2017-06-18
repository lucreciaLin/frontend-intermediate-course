var gulp = require('gulp');
var minifyCSS = require('gulp-csso');
var minifyJs = require('gulp-minify');
var rename = require('gulp-rename');
var gulpSequence = require('gulp-sequence');
var gulpWebpack = require('gulp-webpack');
var gulpStylus = require('gulp-stylus');
var inlineAllSrc = require('gulp-inline');

gulp.task('compileStylusAndMinifyCss', function () {
  return gulp.src('./assets/css/*.styl')
    .pipe(gulpStylus())
    .pipe(gulp.dest('dist/css'))
    .pipe(minifyCSS())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('runWebpack', function () {
  return gulp.src('/assets/js/app.js')
    .pipe(gulpWebpack(require('./webpack.config.js')))
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('uglifyJs', function () {
  return gulp.src('./dist/js/bundle.js')
    .pipe(minifyJs({
      ext: {
        src: '-debug.js',
        min: '.min.js'
      }
    }))
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('inlineAllSrc', function () {
  return gulp.src('./index.html')
    .pipe(inlineAllSrc({
      base: './'
    }))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('runGulpSequence', gulpSequence('compileStylusAndMinifyCss', 'runWebpack', 'uglifyJs', 'inlineAllSrc'));

gulp.task('deploy', [ 'runGulpSequence' ]);
