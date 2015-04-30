'use strict';

/*************************************************
 *                CONFIGURATION
 *************************************************/

//- Configuration variables.
var config = {
	port: 8888,
	host: 'localhost',
  paths: {
    source: './app',
    public: './public',
    sass: "./app/**/*.{sass,scss}",
    html: "./app/**/*.html",
    images: './app/images',
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
var browserSync = require('browser-sync').create();


/*************************************************
 *                    TASKS
 *************************************************/

gulp.task('default', ['build:development']);

gulp.task('build:development', function() {
  runSequence('clean', 'build', 'server');
});

gulp.task('clean', function (cb) {
  del([
    config.paths.public,
  ], cb);
});

gulp.task('build', ['html', 'sass']);

gulp.task('deploy', function() {
  return gulp.src(config.paths.public + '/**/*')
    .pipe(ghPages());
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

gulp.task('server', function() {
  browserSync.init({
    server: {
      baseDir: config.paths.public
    }
  });
});
