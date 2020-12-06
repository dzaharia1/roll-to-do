const gulp = require('gulp') ,
sass = require('gulp-sass') ,
// scsslint = require('gulp-scss-lint') ,
browserSync = require('browser-sync') ,
plumber = require('gulp-plumber') ,
reload = browserSync.reload;

const { series, parallel } = require('gulp');

const SOURCE = {
	scss: 'scss/**/*.scss',
	css: 'public/css',
	ejs: 'views/**/*.ejs',
	js: 'public/scripts/*.js',
	images: 'public/img/**/*'
};

// const AUTOPREFIXER_BROWSERS = [
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

// gulp.task('browser-sync', () => {
// 	browserSync({
// 		proxy: 'localhost:3333',
// 		notify: false
// 	});
// });
function bsSync () {
	return browserSync({
		proxy: 'localhost:3333',
		notify: true,
		files: [SOURCE.js, SOURCE.ejs],
		open: false
	});
};

// gulp.task('bs-reload', () => {
// 	browserSync.reload();
// });

function bsReload () {
	return browserSync.reload();
}

// gulp.task('scss-lint', () => {
// 	gulp.src('/' + SOURCE.js)
// 	.pipe(scsslint());
// });

// function sassLint () {
// 	return gulp.src(`/${SOURCE.scss}`)
// 	.pipe(scsslint());
// }

// gulp.task('sass', ['scss-lint'], () => {
// 	gulp.src(SOURCE.scss)
// 	.pipe(plumber())
// 	.pipe(sass())
// 	.pipe(autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
// 	.pipe(gulp.dest(SOURCE.css))
// 	.pipe(reload({stream:true}));
// });

function sassCompile () {
	return gulp.src(SOURCE.scss)
	.pipe(plumber())
	.pipe(sass())
	.pipe(gulp.dest(SOURCE.css))
	.pipe(reload({stream:true}));


	// .pipe(autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
}

// gulp.task('default', ['sass', 'browser-sync'], () => {
// 	gulp.watch(SOURCE.scss, ['sass']);
// 	gulp.watch([SOURCE.ejs, SOURCE.js], ['bs-reload']);
// });

function watcher () {
	gulp.watch(SOURCE.scss, { ignoreInitial: false, queue: false }, sassCompile);
}

exports.default = parallel(bsSync, watcher);
