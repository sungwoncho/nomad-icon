var gulp = require('gulp')
  , sass = require('gulp-sass')
  , neat = require('node-neat');

gulp.task('sass', function () {
  gulp.src('src/stylesheets/*.scss')
      .pipe(sass({
        outputStyle: 'compressed',
        includePaths: ['src/stylesheets/'].concat(neat.includePaths)
      }).on('error', sass.logError))
      .pipe(gulp.dest('public/stylesheets'));
});

gulp.task('sass:watch', function () {
  gulp.watch('src/stylesheets/*.scss', ['sass']);
});

gulp.task('default', ['sass:watch']);
