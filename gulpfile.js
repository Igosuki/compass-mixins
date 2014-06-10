var gulp      = require('gulp');
var gutil     = require('gulp-util');
var sass      = require('gulp-ruby-sass');

var bases = {
  sassPaths: 'lib/',
  dist: 'dist/',
  src: 'test/'
};

var paths = {
  styles: ['**/*.scss', '**/*.css']
}

gulp.task('appCSS', function() {
  gulp
    .src(paths.styles, {cwd: bases.src})
    .pipe(sass({loadPath: bases.sassPaths}))
    .pipe(
      gulp.dest(bases.dist)
    )
});

gulp.task('default', ['appCSS']);
