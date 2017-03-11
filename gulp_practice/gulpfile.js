var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var less = require('gulp-less');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var sourcemaps = require("gulp-sourcemaps");

gulp.task('sass', function(){
  return gulp.src("app/scss/**/*.scss")
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
})

gulp.task('less', function(){
  return gulp.src("app/less/*.less")
    .pipe(less())
    .pipe(concat('less-combine.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('app/css'))
})


gulp.task('watch', ['browserSync', 'sass'],function(){
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
})

gulp.task('browserSync', function(){
  browserSync.init({
    server: {
      baseDir: 'app'
    }
  })
})

gulp.task('scripts', function(){
  return gulp.src([
    'app/js/bar.js',
    'app/js/foo.js'
  ])
  .pipe(sourcemaps.init())
  .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('./dist/'))
    .pipe(gulp.dest('./dist/'));
});



