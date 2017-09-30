/* Needed gulp config */

var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');

/* Scripts task */
gulp.task('scripts', function() {
  return gulp.src([
      /* Add your JS files here, they will be combined in this order */
      'js/vendor/jquery-1.11.1.js',
      'js/app.js'
    ])
    .pipe(concat('main.js'))
    .pipe(gulp.dest('js'))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(uglify())
    .pipe(gulp.dest('js'));
});

/* Sass task */
gulp.task('sass', function() {
  gulp.src('scss/style.scss')
    .pipe(plumber())
    .pipe(sass({
      includePaths: ['scss'].concat(neat)
    }))
    .pipe(gulp.dest('css'))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(minifycss())
    .pipe(gulp.dest('css'))
    /* Reload the browser CSS after every change */
    .pipe(reload({
      stream: true
    }));
});

/* Watch scss, js and html files, doing different things with each. */
gulp.task('default', ['sass', 'browser-sync'], function() {
  /* Watch scss, run the sass task on change. */
  gulp.watch(['scss/*.scss', 'scss/**/*.scss'], ['sass'])
  /* Watch app.js file, run the scripts task on change. */
  gulp.watch(['js/app.js'], ['scripts'])
  /* Watch .html files, run the bs-reload task on change. */
  gulp.watch(['*.html'], ['bs-reload']);
});

