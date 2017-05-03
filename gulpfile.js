var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var babel = require('gulp-babel');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();

gulp.task('css', function () {
    return gulp.src('./css/*.scss')
                .pipe(sass().on('error', sass.logError))
                .pipe(autoprefixer({
                    browsers: ['last 2 versions'],
                    cascade: false
                }))
                .pipe(gulp.dest('./css/')) 
                .pipe(browserSync.stream());
});

gulp.task('js', function() {
    return gulp.src('./js/*.js')
        .pipe(plumber({
            errorHandler: function(error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('./js/dist/'))
        .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    gulp.watch('./css/*.scss', ['css']);
    gulp.watch('./js/*.js', ['js']);
});

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    gulp.watch('*.html').on('change', browserSync.reload);
});

gulp.task('default', ['css','watch','serve','js']);