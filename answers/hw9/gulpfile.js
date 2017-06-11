var gulp = require("gulp"),
  minifyCSS = require("gulp-minify-css"),
  uglify = require("gulp-uglify"),
  replace = require("gulp-replace"),
  fs = require("fs"),
  gulpSequence = require("gulp-sequence");

gulp.task("minifyCss", function() {
  return gulp.src("./assets/css/style.css")
  .pipe(minifyCSS({
	 keepBreaks: true,
  }))
  .pipe(gulp.dest('./'));
});

gulp.task("uglify", function() {
  return gulp.src("./dist/bundle.js")
	.pipe(uglify())
	.pipe(gulp.dest('./'));
});

gulp.task("inlineCssAndJs", function() {
  return gulp.src("./index.html")
	.pipe(replace('<link rel="stylesheet" href="assets/css/style.css">', function(s) {
	  var style = fs.readFileSync('./assets/css/style.css', 'utf8');
	  return '<style>\n' + style + '\n</style>';
	}))
	.pipe(replace('<script src="dist/bundle.js"></script>', function(s){
	  var js = fs.readFileSync('./dist/bundle.js', 'utf8');
	  return '<script>\n' + js + '\n</script>';
	}))
	.pipe(gulp.dest('./'));
});

gulp.task("runGulpSequence", gulpSequence("minifyCss", "inlineCssAndJs", "uglify"));

gulp.task("deploy",["runGulpSequence"]);