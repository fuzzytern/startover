'use strict';

/*************************************************
 *                CONFIGURATION
 *************************************************/

//- Configuration variables.
var config = {
	port: 8888,
	host: 'localhost',
  paths: {
    source: '/app',
    public: '/public',
    css: '',
    sass: '',
    js: '',
    images: '/images',
  },
};

var site = require('./package.json'); // store package.json data in site variable

/*************************************************
 *               INITIALISATION
 *************************************************/
//- Load Node modules
var gulp = require('gulp');
var del = require('del');
var runSequence = require('run-sequence');
var ghPages = require('gulp-gh-pages');


/*************************************************
 *                    TASKS
 *************************************************/

gulp.task('default', ['build:development']);

gulp.task('build:development', function(cb) {
  runSequence('clean', 'build');
});

gulp.task('clean', function (cb) {
  del([
    config.paths.public,
  ], cb);
});

gulp.task('build', function (cb) {
  del([
    // TODO Fix
  ], cb);
});

gulp.task('deploy', function() {
  return gulp.src('./' + config.paths.public + '/**/*')
    .pipe(ghPages());
});
