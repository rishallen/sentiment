var gulp        = require('gulp');
var sass        = require('gulp-sass'); // gulp sass plugin
var browserSync = require('browser-sync').create();
var useref      = require('gulp-useref'); //Gulp-useref concatenates any number of CSS and JavaScript files into a single file by looking for a comment that starts with "<!--build:" and ends with "<!--endbuild-->"
var uglify      = require('gulp-uglify'); //minify JavaScript files
var gulpIf      = require('gulp-if'); // ensure that we only attempt to minify JavaScript files.
var imagemin    = require('gulp-imagemin');
var cache       = require('gulp-cache');
var del         = require('del');
var runSequence = require('run-sequence');


gulp.task('sass', function(){
  return gulp.src('scss/**/*.scss') // Gets all files ending with .scss in scss
    .pipe(sass()) // Using gulp-sass
    .pipe(gulp.dest('public/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// Gulp browserSync syntax
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'public'
    },
  })
})

gulp.task('useref', function(){
  return gulp.src('views/*.ejs')
    .pipe(useref())
    .pipe(gulp.dest('dist'))
});

gulp.task('useref', function(){
  return gulp.src('views/*.ejs')
    .pipe(useref())
    // Minifies only if it's a JavaScript file
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulp.dest('dist'))
});

gulp.task('img', function(){
  return gulp.src('public/img/**/*.+(png|jpg|gif|svg)')
  .pipe(imagemin())
  .pipe(gulp.dest('dist/img'))
});

gulp.task('img', function(){
  return gulp.src('public/img/**/*.+(png|jpg|jpeg|gif|svg)')
  .pipe(cache(imagemin({
      interlaced: true
    })))
  .pipe(gulp.dest('dist/img'))
});

gulp.task('clean:dist', function() {
  return del.sync('dist');
})

gulp.task('build', function (callback) {
  runSequence(['sass', 'useref', 'images', 'fonts'],
    callback
  )
})

// gulp.watch('files-to-watch', ['tasks', 'to', 'run']);
gulp.task('watch', ['browserSync', 'sass'], function (){
  gulp.watch('scss/**/*.scss', ['sass']);
  gulp.watch('views/*.ejs', browserSync.reload);
  gulp.watch('js/**/*.js', browserSync.reload);
})
