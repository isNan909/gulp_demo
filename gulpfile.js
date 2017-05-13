// require gulp
var gulp = require('gulp');

// require other packages
var concat = require('gulp-concat'),
    cssmin = require('gulp-minify-css'),
    rename = require("gulp-rename"),
    sass = require('gulp-sass'),
    // browserSync = require('browser-sync'),
    uglify = require('gulp-uglify'),
    changed = require('gulp-changed'),
    changed = require('gulp-changed'),
    imagemin = require('gulp-imagemin');
   // autoprefix = require('gulp-autoprefixer'); -- comment line

// scripts task
gulp.task('scripts', function() {
  return gulp.src('./src/js/*.js')
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./dist/js/'))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./dist/js/'));
});

// styles task
gulp.task('styles', function() {
  return gulp.src('./src/sass/*.scss')
  //  .pipe(autoprefix('last 2 versions')) -- comment this line
    .pipe(sass())
    .pipe(gulp.dest('./dist/css/'))
    .pipe(cssmin())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./dist/css/'));
});

// =========================================
// Start - Add packages / new configurations

require('es6-promise').polyfill();
var postcss      = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

gulp.task('autoprefixer', function () {

    return gulp.src(
          ['.dist/css/*.css', '!.dist/css/*.min.css']
      )
        .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
        .pipe(gulp.dest('.dist/css/'));
});

// =========================================
// End new lines

// browser sync
// gulp.task('browser-sync', ['styles'], function() {
//     browserSync({
//         server: {
//             baseDir: ''
//         },
//         notify: false
//     });
//     gulp.watch("./src/sass/*.scss", ['scss']);
//     gulp.watch("*.html").on('change', browserSync.reload);
// });

// watch task
gulp.task('watch', function() {
  gulp.watch('./src/js/*.js', ['scripts']);
  gulp.watch('./src/sass/*.scss', ['styles']);
});


// imagemin
gulp.task('imagemin', function() {
   var imgSrc = 'src/img/*.+(png|jpg|gif|svg)',
   imgDst = 'dist/img/';

   gulp.src(imgSrc)
   .pipe(changed(imgDst))
   .pipe(imagemin())
   .pipe(gulp.dest(imgDst));
});


gulp.task('default', ['scripts', 'autoprefixer', 'styles', 'imagemin', 'watch']);
