'use strict';

/*************************************************
 *                CONFIGURATION
 *************************************************/

//- Configuration variables.
var config = {
  paths: {
    source: './app',
    public: './public',
    sass: './app/**/*.{sass,scss}',
    html: './app/**/*.html',
    images: './app/images/**/*.{png,jpg,gif,svg}',
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
var sass = require('gulp-sass');
var ghPages = require('gulp-gh-pages');
var watch = require('gulp-watch');
var browserSync = require('browser-sync').create();


/*************************************************
 *                    TASKS
 *************************************************/


gulp.task('build:development', function(callback) {
  runSequence('clean', 'build', ['watch', 'server'], callback);
});

gulp.task('build', ['html', 'sass']);

gulp.task('clean', function (callback) {
  del([
    config.paths.public,
  ], callback);
});

gulp.task('html', function(){

  return gulp.src(config.paths.html)
    .pipe(gulp.dest(config.paths.public))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('sass', function(){
	return gulp.src(config.paths.sass)
		.pipe(sass())
		.pipe(gulp.dest(config.paths.public + '/css'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('watch', ['browserSync'], function() {
  watch(config.paths.sass, function() { gulp.start('sass'); });
  watch(config.paths.html, function() { gulp.start('html'); });
});

gulp.task('deploy', function() {
  return gulp.src(config.paths.public + '/**/*')
    .pipe(ghPages());
});

gulp.task('server', function() {
  browserSync.init({
    server: {
      baseDir: config.paths.public
    }
  });
});

gulp.task('default', ['build:development']);
