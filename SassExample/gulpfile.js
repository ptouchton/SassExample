// <vs SolutionOpened='watch' />
// Include gulp
var gulp = require('gulp');

// Include Our Plugins
//var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minifyCss = require("gulp-minify-css");
var sourceMaps = require("gulp-sourcemaps");

// Lint Task
//gulp.task('lint', function () {
//    return gulp.src('js/*.js')
//        .pipe(jshint())
//        .pipe(jshint.reporter('default'));
//});

// Compile Our Sass
gulp.task('sass', function () {
    return gulp.src('css/*.scss')
        .pipe(sourceMaps.init())
        .pipe(sass({ sourcemap: true }))
         // Load existing internal sourcemap
        .pipe(minifyCss())
        // Write final .map file
        .pipe(sourceMaps.write('.'))
        .pipe(gulp.dest('css'));
   
});

// Concatenate & Minify CSS
// task
gulp.task('minify-css', ['sass'], function () {
    return gulp.src('css/*.css') // path to your file
    // Load existing internal sourcemap
    .pipe(sourceMaps.init())
    .pipe(minifyCss())
        // Write final .map file
        .pipe(sourceMaps.write('.'))
    .pipe(gulp.dest('css'));
});

// Watch Files For Changes
gulp.task('watch', function () {
    gulp.watch('js/*.js', ['lint', 'scripts']);
    gulp.watch('css/*.scss', ['sass']);
    //gulp.watch('Style.css', ['minify-css']);
});

// Concatenate & Minify JS
gulp.task('scripts', function () {
    return gulp.src('js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});
// Default Task
gulp.task('default', ['sass', 'scripts', 'watch', 'minify-css']);