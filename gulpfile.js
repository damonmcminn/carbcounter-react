var gulp = require('gulp');
var connect = require('gulp-connect');
var livereload = require('gulp-livereload');
var minifyCSS = require('gulp-minify-css');

var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('webserver', function() {
  connect.server({
    root: 'dist',
    livereload: true,
  });
});

gulp.task('html', function() {
  return gulp.src('src/*.html')
    .pipe(gulp.dest('dist'))
    .pipe(livereload());
});

gulp.task('css', function() {
  return gulp.src('src/css/*.css')
    .pipe(minifyCSS())
    .pipe(gulp.dest('dist'))
    .pipe(livereload());
});

gulp.task('js', function() {
  var root = './src/js/';
  var config = {
    entries: root + 'index.js',
    debug: true
  };
  
  return browserify(config)
    .bundle()
    .pipe(source('nutrition.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    // transform tasks follow
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist'))
    .pipe(livereload());
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('src/*.html', ['html']);
  gulp.watch('src/js/*.js', ['js']);
  gulp.watch('src/css/*.css', ['css']).on('changed', livereload.changed);
});

gulp.task('default', ['webserver', 'js', 'html', 'css', 'watch']);
