'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var gulpMocha = require('gulp-mocha');
var jscs = require('gulp-jscs');
var sass = require('gulp-sass');
var webpack = require('webpack-stream');
var webPackServer = require('webpack-dev-server');

var filesToWatch = ['server.js', 'routes/*.js', 'models/*.js', 'lib/*.js', 'test/**/*.js', 'gulpfile.js', 'app/**/*.js'];
var appFiles = ['app/**/*.html', 'app/**/*.js']; //dont want to jshint html files

gulp.task('jshint', function() {
  return gulp.src(filesToWatch)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('jscs:warn', function() {
  return gulp.src(filesToWatch)
    .pipe(jscs())
    .pipe(jscs.reporter());
});

// works
gulp.task('staticFiles', function() {
  return gulp.src('./app/**/*.html')
    .pipe(gulp.dest('build/'));
});

// dunno
gulp.task('sass', function() {
  gulp.src('./app/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./build/css'));
});

gulp.task('webpack', function() {
  return gulp.src('./app/js/client.js')
    .pipe(webpack({
      output: {
        filename: 'bundle.js',
      }
    }))
    .pipe(gulp.dest('build/'));
});

// doesn't work yet
gulp.task('servertests', function() {
  return gulp.src('./test/**/*tests.js')
    .pipe(gulpMocha({reporter: 'nyan'}))
    .once('error', function(err) {
      console.log(err);
      process.exit(1);
    })
    .once('end', function() {
      if (this.seq.length === 1 && this.seq[0] === 'servertests')
        process.exit();
    }.bind(this));
});

// Angular FE Tests
// gulp.task('webpack:test', function() {
//   return gulp.src('./test/client/entry.js')
//     .pipe(webpack({
//       output: {
//         filename: 'test_bundle.js'
//       }
//     }))
//     .pipe(gulp.dest('test/client'));
// });

gulp.task('watch', function() {
  gulp.watch('./app/sass/**/*.scss', ['sass']);
  gulp.watch('./app/**/*.js', ['webpack']);
  gulp.watch(filesToWatch, ['staticFiles']);
});

gulp.task('build:dev', ['jshint', 'jscs:warn', 'staticFiles', 'sass', 'webpack']);
gulp.task('build:pro', ['staticFiles', 'sass', 'webpack']);

gulp.task('test', ['servertests']);
gulp.task('default', ['build:dev', 'tests']);
