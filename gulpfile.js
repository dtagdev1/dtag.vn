var fs = require('fs');
var path = require('path');
var merge = require('merge-stream');
var gulp = require('gulp');
var addsrc = require('gulp-add-src');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');

gulp.task('default', function(cb){
  var css = gulp.src('./css/**/*.css')
      .pipe(concat('main.min.css'))
      .pipe(uglifycss({
        'max-line-len': 80
      }))
      .pipe(gulp.dest('./dist'));

    var libCore = gulp.src('./js/lib/core/bootstrap.min.js')
      .pipe(addsrc.prepend('./js/lib/core/jquery.js'))
      .pipe(concat('lib.core.js'))
      .pipe(gulp.dest('./dist'));

    var libVendor = gulp.src('./js/lib/vendor/jquery.inview.min.js')
      .pipe(addsrc.prepend('./js/lib/vendor/jquery.isotope.min.js'))
      .pipe(addsrc.prepend('./js/lib/vendor/jquery.prettyPhoto.js'))
      .pipe(addsrc.prepend('./js/lib/vendor/smoothscroll.js'))
      .pipe(addsrc.prepend('./js/lib/vendor/mousescroll.js'))
      .pipe(addsrc.prepend('./js/lib/vendor/owl.carousel.min.js'))
      .pipe(concat('lib.vendor.js'))
      .pipe(gulp.dest('./dist'));

    var libCompatible = gulp.src('./js/lib/compatible/*.js')
      .pipe(concat('lib.compatible.js'))
      .pipe(gulp.dest('./dist'));

    var main = gulp.src(['./js/main.js', './js/slideshow.js'])
        .pipe(concat('main.min.js'))
        .pipe(gulp.dest('./dist'));

  return merge(css, libCore, libVendor, libCompatible, main);
});
