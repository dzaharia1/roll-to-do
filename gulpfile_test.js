// const gulp = require('gulp') ,
// sass = require('gulp-sass') ,
// scsslint = require('gulp-scss-lint') ,
// autoprefixer = require('gulp-autoprefixer') ,
// browserSync = require('browser-sync') ,
// plumber = require('gulp-plumber') ,
// reload = browserSync.reload;

// let sources = {
// 	scss: 'scss/**/*.scss',
// 	css: 'public/css',
// 	ejs: 'views/**/*.ejs',
// 	js: ['/*.js', 'public/scripts/*.js'],
// 	images: 'public/img/*'
// };

// var AUTOPREFIXER_BROWSERS = [
// 'ie >= 10',
// 'ie_mob >= 10',
// 'ff >= 30',
// 'chrome >= 34',
// 'safari >= 7',
// 'opera >= 23',
// 'ios >= 7',
// 'android >= 4.4',
// 'bb >= 10'
// ];

const { series } = require('gulp');

function clean (cb) {
	cb();
}

function build (cb) {
	cb();
}

exports.default = series (clean, build);
