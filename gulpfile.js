var gulp = require('gulp'),
    plumber = require('gulp-plumber');
var babel = require('gulp-babel');
var browserSync = require('browser-sync');

gulp.task('browser-sync', function() {
  browserSync({
    server: {
       baseDir: "./"
    }
  });
});

gulp.task('bs-reload', function () {
  browserSync.reload();
});

gulp.task('default', ['browser-sync'], function(){
  gulp.watch("*.html", ['bs-reload']);
});